import { NextResponse } from 'next/server';
import { AIRPORTS } from '@/lib/constants/airports';

export async function GET() {
  // Convert our airport constants to a simpler format for the frontend
  const airportsList = Object.values(AIRPORTS).map(airport => ({
    id: airport.iata, // We use IATA on the frontend for user-friendliness
    name: `${airport.name} (${airport.iata})`,
    city: airport.city,
    country: airport.country
  }));
  
  // Sort alphabetically by airport name
  airportsList.sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json(airportsList);
} 