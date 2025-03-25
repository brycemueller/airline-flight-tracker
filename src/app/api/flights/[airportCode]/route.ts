import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getFullAirlineName } from '@/lib/constants/airlines';
import { iataToIcao, getAirportByCode } from '@/lib/constants/airports';

// Type definitions for FlightAware API responses
interface FlightAwareFlightResponse {
  scheduled_departures?: FlightAwareFlight[];
  scheduled_arrivals?: FlightAwareFlight[];
}

interface FlightAwareFlight {
  ident_iata: string;
  ident_icao: string;
  operator: string;
  operator_iata: string;
  operator_icao: string;
  flight_number: string;
  registration: string;
  aircraft_type: string;
  scheduled_out: string;
  estimated_out: string;
  scheduled_off: string;
  estimated_off: string;
  scheduled_in: string;
  estimated_in: string;
  scheduled_on: string;
  estimated_on: string;
  status: string;
  origin: {
    code: string;
    code_icao: string;
    code_iata: string;
    airport_name: string;
    city: string;
    timezone: string;
  };
  destination: {
    code: string;
    code_icao: string;
    code_iata: string;
    airport_name: string;
    city: string;
    timezone: string;
  };
}

// Transform FlightAware flights to our app's format
const transformFlights = (flights: FlightAwareFlight[]) => {
  return flights.map((flight, index) => {
    // Add null checks for all object properties that might be null
    const origin = flight.origin || {};
    const destination = flight.destination || {};
    
    return {
      id: flight.ident_iata || flight.ident_icao || `flight-${index}-${Date.now()}`,
      airline: getFullAirlineName(flight.operator_icao || flight.operator_iata) || flight.operator || 'Unknown Airline',
      flightNumber: flight.flight_number,
      origin: origin.code_iata || origin.code_icao || 'N/A',
      originCity: origin.city || 'Unknown',
      destination: destination.code_iata || destination.code_icao || 'N/A',
      destinationCity: destination.city || 'Unknown',
      scheduledTime: flight.scheduled_off || flight.scheduled_out 
        ? new Date(flight.scheduled_off || flight.scheduled_out).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
        : 'N/A',
      status: flight.status || 'Scheduled'
    };
  });
};

export async function GET(request: NextRequest, context: { params: Promise<{ airportCode: string }> }) {
  // Await the params Promise before using its properties
  const { airportCode } = await context.params;
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'departures';

  // Log the initial request
  console.log(`Flight data request received for airport: ${airportCode}, type: ${type}`);

  // ICAO airport codes are preferred for FlightAware AeroAPI
  // Convert IATA to ICAO if needed
  let icaoAirportCode = airportCode;

  // Use FlightAware AeroAPI
  try {
    // Check if this is a known airport in our system
    const airportInfo = getAirportByCode(airportCode);
    if (airportInfo) {
      console.log(`Found airport in our database: ${airportInfo.name} (IATA: ${airportInfo.iata}, ICAO: ${airportInfo.icao})`);
    } else {
      console.log(`Airport ${airportCode} not found in our database. Will try direct API call.`);
    }
    
    // If it's a 3-letter code (likely IATA), try to convert to ICAO
    if (airportCode.length === 3) {
      // First check our local database
      const convertedCode = iataToIcao(airportCode);
      if (convertedCode) {
        console.log(`Converting IATA code ${airportCode} to ICAO code ${convertedCode} using our database`);
        icaoAirportCode = convertedCode;
      } else {
        // If not in our database, try a K prefix for US airports as a fallback
        // This is just a heuristic - many US airports use K + IATA code
        const possibleUSCode = `K${airportCode}`;
        console.log(`Could not find ICAO equivalent for IATA code ${airportCode} in our database. Trying US format: ${possibleUSCode}`);
        icaoAirportCode = possibleUSCode;
      }
    }
    
    const apiKey = process.env.FLIGHTAWARE_API_KEY;
    const apiUrl = process.env.FLIGHTAWARE_API_URL || 'https://aeroapi.flightaware.com/aeroapi';
    
    if (!apiKey) {
      console.error('FLIGHTAWARE_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'API key is required. Please set the FLIGHTAWARE_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    // Generate the current time and end time (12 hours later) in ISO8601 format
    const now = new Date();
    const endTime = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 hours later
    // Format dates correctly for AeroAPI - no milliseconds needed (2025-03-25T08:46:08Z format)
    const startTimeISO = now.toISOString().split('.')[0] + 'Z';
    const endTimeISO = endTime.toISOString().split('.')[0] + 'Z';
    console.log(`Using time window: ${startTimeISO} to ${endTimeISO}`);

    // Set up the API endpoint and parameters
    let endpoint;
    let params: Record<string, any> = {
      max_pages: 1 // Only get first page (15 records) by default
    };

    if (type === 'departures') {
      endpoint = `/airports/${icaoAirportCode}/flights/scheduled_departures`;
      params = {
        ...params,
        type: 'Airline',
        start: startTimeISO,
        end: endTimeISO
      };
    } else {
      endpoint = `/airports/${icaoAirportCode}/flights/scheduled_arrivals`;
      params = {
        ...params,
        type: 'Airline',
        start: startTimeISO,
        end: endTimeISO
      };
    }
    
    // Log the full request details for debugging
    console.log(`Making request to: ${apiUrl}${endpoint}`);
    console.log('Request params:', JSON.stringify(params));
    console.log(`Using airport code: ${icaoAirportCode} (original: ${airportCode})`);
    
    const requestConfig = {
      headers: {
        'x-apikey': apiKey
      },
      params: params
    };
    
    console.log('Request config (without full API key):', {
      ...requestConfig,
      headers: { 'x-apikey': `${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)}` }
    });
      
    const response = await axios.get(`${apiUrl}${endpoint}`, requestConfig);

    console.log(`API request successful, status: ${response.status}`);
    
    const flightData = response.data as FlightAwareFlightResponse;
    const flights = type === 'departures' 
      ? flightData.scheduled_departures || []
      : flightData.scheduled_arrivals || [];

    console.log(`Retrieved ${flights.length} flights`);
    
    const transformedFlights = transformFlights(flights);
    return NextResponse.json(transformedFlights);
  } 
  catch (error: any) {
    console.error(`Error fetching from FlightAware AeroAPI:`, error);
    
    // Enhanced error handling
    if (axios.isAxiosError(error)) {
      console.error('AeroAPI request failed:');
      console.error(`Status: ${error.response?.status}`);
      console.error(`Status Text: ${error.response?.statusText}`);
      console.error('Response data:', error.response?.data);
      
      // Common 400 error troubleshooting
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        
        // Check if it's an airport code issue
        if (errorData?.error?.includes('Unknown airport') || 
            errorData?.error?.includes('airport code') || 
            errorData?.error?.includes('invalid id')) {
          
          // Provide a helpful error message
          if (airportCode.length === 3) {
            return NextResponse.json(
              { 
                error: `The provided airport code (${airportCode}) is an IATA code. FlightAware AeroAPI requires ICAO codes (4 letters). We attempted conversion to ${icaoAirportCode}, but the API reported: "${errorData?.error}". You may need to manually provide the correct ICAO code.`,
                suggestedAction: "Please check if the ICAO code in our database is correct, or try with the correct ICAO code directly. For US airports, ICAO codes typically start with 'K' followed by the IATA code."
              },
              { status: 400 }
            );
          } else {
            return NextResponse.json(
              { 
                error: `Invalid airport code: ${airportCode}. The API reported: "${errorData?.error}"`,
                suggestedAction: "Please check if the ICAO code is correct."
              },
              { status: 400 }
            );
          }
        }
        
        // If we have specific error details from the API
        if (error.response?.data?.error) {
          return NextResponse.json(
            { 
              error: `AeroAPI Error: ${error.response.data.error}`,
              details: error.response.data
            },
            { status: 400 }
          );
        }
      }

      const status = error.response?.status || 500;
      const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Unknown error fetching flight data';
      
      return NextResponse.json(
        { 
          error: message,
          details: error.response?.data || {},
          endpoint: `${error.config?.url || ''}`,
          method: error.config?.method || 'GET'
        },
        { status }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch flight data', message: error.message },
      { status: 500 }
    );
  }
} 