export interface Airline {
  icao: string;    // ICAO airline code (3-letter)
  iata: string;    // IATA airline code (2-letter)
  name: string;    // Full airline name
  country: string; // Country of registration
}

// Map of airline codes to airline info
export const AIRLINES: Record<string, Airline> = {
  // Major US Airlines
  'AAL': { icao: 'AAL', iata: 'AA', name: 'American Airlines', country: 'United States' },
  'DAL': { icao: 'DAL', iata: 'DL', name: 'Delta Air Lines', country: 'United States' },
  'UAL': { icao: 'UAL', iata: 'UA', name: 'United Airlines', country: 'United States' },
  'SWA': { icao: 'SWA', iata: 'WN', name: 'Southwest Airlines', country: 'United States' },
  'JBU': { icao: 'JBU', iata: 'B6', name: 'JetBlue Airways', country: 'United States' },
  'ASA': { icao: 'ASA', iata: 'AS', name: 'Alaska Airlines', country: 'United States' },
  'NKS': { icao: 'NKS', iata: 'NK', name: 'Spirit Airlines', country: 'United States' },
  'FFT': { icao: 'FFT', iata: 'F9', name: 'Frontier Airlines', country: 'United States' },
  'SKW': { icao: 'SKW', iata: 'OO', name: 'SkyWest Airlines', country: 'United States' },
  'HAL': { icao: 'HAL', iata: 'HA', name: 'Hawaiian Airlines', country: 'United States' },
  'AAY': { icao: 'AAY', iata: 'G4', name: 'Allegiant Air', country: 'United States' },
  
  // Major International Airlines
  'DLH': { icao: 'DLH', iata: 'LH', name: 'Lufthansa', country: 'Germany' },
  'AFR': { icao: 'AFR', iata: 'AF', name: 'Air France', country: 'France' },
  'BAW': { icao: 'BAW', iata: 'BA', name: 'British Airways', country: 'United Kingdom' },
  'KLM': { icao: 'KLM', iata: 'KL', name: 'KLM Royal Dutch Airlines', country: 'Netherlands' },
  'UAE': { icao: 'UAE', iata: 'EK', name: 'Emirates', country: 'United Arab Emirates' },
  'QTR': { icao: 'QTR', iata: 'QR', name: 'Qatar Airways', country: 'Qatar' },
  'ETH': { icao: 'ETH', iata: 'ET', name: 'Ethiopian Airlines', country: 'Ethiopia' },
  'CPA': { icao: 'CPA', iata: 'CX', name: 'Cathay Pacific', country: 'Hong Kong' },
  'ACA': { icao: 'ACA', iata: 'AC', name: 'Air Canada', country: 'Canada' },
  'ANZ': { icao: 'ANZ', iata: 'NZ', name: 'Air New Zealand', country: 'New Zealand' },
  'SIA': { icao: 'SIA', iata: 'SQ', name: 'Singapore Airlines', country: 'Singapore' },
  'JAL': { icao: 'JAL', iata: 'JL', name: 'Japan Airlines', country: 'Japan' },
  'ANA': { icao: 'ANA', iata: 'NH', name: 'All Nippon Airways', country: 'Japan' },
  'QFA': { icao: 'QFA', iata: 'QF', name: 'Qantas', country: 'Australia' },
  'TAM': { icao: 'TAM', iata: 'LA', name: 'LATAM Airlines', country: 'Chile' },
  'THY': { icao: 'THY', iata: 'TK', name: 'Turkish Airlines', country: 'Turkey' },
  'IBE': { icao: 'IBE', iata: 'IB', name: 'Iberia', country: 'Spain' },
  'VIR': { icao: 'VIR', iata: 'VS', name: 'Virgin Atlantic', country: 'United Kingdom' },
  'CSN': { icao: 'CSN', iata: 'CZ', name: 'China Southern Airlines', country: 'China' },
  'CCA': { icao: 'CCA', iata: 'CA', name: 'Air China', country: 'China' },
  'CES': { icao: 'CES', iata: 'MU', name: 'China Eastern Airlines', country: 'China' },
  'SVA': { icao: 'SVA', iata: 'SV', name: 'Saudia', country: 'Saudi Arabia' },
  'KAL': { icao: 'KAL', iata: 'KE', name: 'Korean Air', country: 'South Korea' }
};

// Helper functions
export function getAirlineByIcao(icao: string): Airline | undefined {
  return AIRLINES[icao];
}

export function getAirlineByIata(iata: string): Airline | undefined {
  return Object.values(AIRLINES).find(airline => airline.iata === iata);
}

export function getFullAirlineName(code: string): string {
  // Try ICAO first
  const byIcao = getAirlineByIcao(code);
  if (byIcao) return byIcao.name;
  
  // Try IATA second
  const byIata = getAirlineByIata(code);
  if (byIata) return byIata.name;
  
  // Return the original code if not found
  return code;
} 