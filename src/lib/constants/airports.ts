export interface Airport {
  icao: string;    // ICAO airport code (4-letter)
  iata: string;    // IATA airport code (3-letter)
  name: string;    // Full airport name
  city: string;    // City
  country: string; // Country
}

// Common airports with their IATA and ICAO codes
export const AIRPORTS: Record<string, Airport> = {
  // US airports
  'KATL': { icao: 'KATL', iata: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'United States' },
  'KLAX': { icao: 'KLAX', iata: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States' },
  'KORD': { icao: 'KORD', iata: 'ORD', name: "O'Hare International Airport", city: 'Chicago', country: 'United States' },
  'KDFW': { icao: 'KDFW', iata: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'United States' },
  'KJFK': { icao: 'KJFK', iata: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States' },
  'KDEN': { icao: 'KDEN', iata: 'DEN', name: 'Denver International Airport', city: 'Denver', country: 'United States' },
  'KSFO': { icao: 'KSFO', iata: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'United States' },
  'KLAS': { icao: 'KLAS', iata: 'LAS', name: 'Harry Reid International Airport', city: 'Las Vegas', country: 'United States' },
  'KMCO': { icao: 'KMCO', iata: 'MCO', name: 'Orlando International Airport', city: 'Orlando', country: 'United States' },
  'KSEA': { icao: 'KSEA', iata: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'United States' },
  'KEWR': { icao: 'KEWR', iata: 'EWR', name: 'Newark Liberty International Airport', city: 'Newark', country: 'United States' },
  'KMIA': { icao: 'KMIA', iata: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States' },
  'KPHX': { icao: 'KPHX', iata: 'PHX', name: 'Phoenix Sky Harbor International Airport', city: 'Phoenix', country: 'United States' },
  'KBOS': { icao: 'KBOS', iata: 'BOS', name: 'Boston Logan International Airport', city: 'Boston', country: 'United States' },
  'KIAH': { icao: 'KIAH', iata: 'IAH', name: 'George Bush Intercontinental Airport', city: 'Houston', country: 'United States' },
  'KCLT': { icao: 'KCLT', iata: 'CLT', name: 'Charlotte Douglas International Airport', city: 'Charlotte', country: 'United States' },
  'KRSW': { icao: 'KRSW', iata: 'RSW', name: 'Southwest Florida International Airport', city: 'Fort Myers', country: 'United States' },
  
  // Additional US airports - especially Florida airports
  'KFLL': { icao: 'KFLL', iata: 'FLL', name: 'Fort Lauderdale-Hollywood International Airport', city: 'Fort Lauderdale', country: 'United States' },
  'KPBI': { icao: 'KPBI', iata: 'PBI', name: 'Palm Beach International Airport', city: 'West Palm Beach', country: 'United States' },
  'KTPA': { icao: 'KTPA', iata: 'TPA', name: 'Tampa International Airport', city: 'Tampa', country: 'United States' },
  'KJAX': { icao: 'KJAX', iata: 'JAX', name: 'Jacksonville International Airport', city: 'Jacksonville', country: 'United States' },
  'KPIE': { icao: 'KPIE', iata: 'PIE', name: 'St. Petersburg-Clearwater International Airport', city: 'St. Petersburg', country: 'United States' },
  'KSRQ': { icao: 'KSRQ', iata: 'SRQ', name: 'Sarasota Bradenton International Airport', city: 'Sarasota', country: 'United States' },
  'KPNS': { icao: 'KPNS', iata: 'PNS', name: 'Pensacola International Airport', city: 'Pensacola', country: 'United States' },
  'KECP': { icao: 'KECP', iata: 'ECP', name: 'Northwest Florida Beaches International Airport', city: 'Panama City', country: 'United States' },
  'KSMF': { icao: 'KSMF', iata: 'SMF', name: 'Sacramento International Airport', city: 'Sacramento', country: 'United States' },
  'KMDW': { icao: 'KMDW', iata: 'MDW', name: 'Chicago Midway International Airport', city: 'Chicago', country: 'United States' },
  'KBWI': { icao: 'KBWI', iata: 'BWI', name: 'Baltimore/Washington International Thurgood Marshall Airport', city: 'Baltimore', country: 'United States' },
  'KSAN': { icao: 'KSAN', iata: 'SAN', name: 'San Diego International Airport', city: 'San Diego', country: 'United States' },
  'KCVG': { icao: 'KCVG', iata: 'CVG', name: 'Cincinnati/Northern Kentucky International Airport', city: 'Cincinnati', country: 'United States' },
  'KSLC': { icao: 'KSLC', iata: 'SLC', name: 'Salt Lake City International Airport', city: 'Salt Lake City', country: 'United States' },
  'KSTL': { icao: 'KSTL', iata: 'STL', name: 'St. Louis Lambert International Airport', city: 'St. Louis', country: 'United States' },
  'KPDX': { icao: 'KPDX', iata: 'PDX', name: 'Portland International Airport', city: 'Portland', country: 'United States' },
  'KBNA': { icao: 'KBNA', iata: 'BNA', name: 'Nashville International Airport', city: 'Nashville', country: 'United States' },
  'KAUS': { icao: 'KAUS', iata: 'AUS', name: 'Austin-Bergstrom International Airport', city: 'Austin', country: 'United States' },
  'KMSY': { icao: 'KMSY', iata: 'MSY', name: 'Louis Armstrong New Orleans International Airport', city: 'New Orleans', country: 'United States' },
  'KRDU': { icao: 'KRDU', iata: 'RDU', name: 'Raleigh-Durham International Airport', city: 'Raleigh', country: 'United States' },
  'KSAT': { icao: 'KSAT', iata: 'SAT', name: 'San Antonio International Airport', city: 'San Antonio', country: 'United States' },
  'KOAK': { icao: 'KOAK', iata: 'OAK', name: 'Oakland International Airport', city: 'Oakland', country: 'United States' },
  'KHPN': { icao: 'KHPN', iata: 'HPN', name: 'Westchester County Airport', city: 'White Plains', country: 'United States' },
  'KPIT': { icao: 'KPIT', iata: 'PIT', name: 'Pittsburgh International Airport', city: 'Pittsburgh', country: 'United States' },
  'KCLE': { icao: 'KCLE', iata: 'CLE', name: 'Cleveland Hopkins International Airport', city: 'Cleveland', country: 'United States' },
  'KMEM': { icao: 'KMEM', iata: 'MEM', name: 'Memphis International Airport', city: 'Memphis', country: 'United States' },
  'KBHM': { icao: 'KBHM', iata: 'BHM', name: 'Birmingham-Shuttlesworth International Airport', city: 'Birmingham', country: 'United States' },

  // International airports
  'EGLL': { icao: 'EGLL', iata: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom' },
  'LFPG': { icao: 'LFPG', iata: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  'EDDF': { icao: 'EDDF', iata: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  'EHAM': { icao: 'EHAM', iata: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  'OMDB': { icao: 'OMDB', iata: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
  'VHHH': { icao: 'VHHH', iata: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'China' },
  'RJAA': { icao: 'RJAA', iata: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
  'YSSY': { icao: 'YSSY', iata: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia' },
  'CYYZ': { icao: 'CYYZ', iata: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada' },
  
  // Add more international airports
  'EGKK': { icao: 'EGKK', iata: 'LGW', name: 'London Gatwick Airport', city: 'London', country: 'United Kingdom' },
  'LEMD': { icao: 'LEMD', iata: 'MAD', name: 'Adolfo Suárez Madrid–Barajas Airport', city: 'Madrid', country: 'Spain' },
  'LEBL': { icao: 'LEBL', iata: 'BCN', name: 'Barcelona–El Prat Airport', city: 'Barcelona', country: 'Spain' },
  'LIRF': { icao: 'LIRF', iata: 'FCO', name: 'Leonardo da Vinci–Fiumicino Airport', city: 'Rome', country: 'Italy' },
  'LTBA': { icao: 'LTBA', iata: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
  'EDDM': { icao: 'EDDM', iata: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany' },
  'LSZH': { icao: 'LSZH', iata: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' },
  'LOWW': { icao: 'LOWW', iata: 'VIE', name: 'Vienna International Airport', city: 'Vienna', country: 'Austria' },
  'LFMN': { icao: 'LFMN', iata: 'NCE', name: 'Nice Côte d\'Azur Airport', city: 'Nice', country: 'France' },
  'EKCH': { icao: 'EKCH', iata: 'CPH', name: 'Copenhagen Airport', city: 'Copenhagen', country: 'Denmark' },
  'ENGM': { icao: 'ENGM', iata: 'OSL', name: 'Oslo Airport, Gardermoen', city: 'Oslo', country: 'Norway' },
  'ESSA': { icao: 'ESSA', iata: 'ARN', name: 'Stockholm Arlanda Airport', city: 'Stockholm', country: 'Sweden' },
  'EFHK': { icao: 'EFHK', iata: 'HEL', name: 'Helsinki Airport', city: 'Helsinki', country: 'Finland' },
  'UUEE': { icao: 'UUEE', iata: 'SVO', name: 'Sheremetyevo International Airport', city: 'Moscow', country: 'Russia' },
  'ZBAA': { icao: 'ZBAA', iata: 'PEK', name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China' },
  'ZSPD': { icao: 'ZSPD', iata: 'PVG', name: 'Shanghai Pudong International Airport', city: 'Shanghai', country: 'China' },
  'RJTT': { icao: 'RJTT', iata: 'HND', name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan' },
  'VIDP': { icao: 'VIDP', iata: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India' },
  'VABB': { icao: 'VABB', iata: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
  'YMML': { icao: 'YMML', iata: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia' },
  'YBBN': { icao: 'YBBN', iata: 'BNE', name: 'Brisbane Airport', city: 'Brisbane', country: 'Australia' },
  'NZAA': { icao: 'NZAA', iata: 'AKL', name: 'Auckland Airport', city: 'Auckland', country: 'New Zealand' },
  'TJSJ': { icao: 'TJSJ', iata: 'SJU', name: 'Luis Muñoz Marín International Airport', city: 'San Juan', country: 'Puerto Rico' },
  'SBGR': { icao: 'SBGR', iata: 'GRU', name: 'São Paulo/Guarulhos International Airport', city: 'São Paulo', country: 'Brazil' },
  'SCEL': { icao: 'SCEL', iata: 'SCL', name: 'Santiago International Airport', city: 'Santiago', country: 'Chile' },
  'MMMX': { icao: 'MMMX', iata: 'MEX', name: 'Mexico City International Airport', city: 'Mexico City', country: 'Mexico' }
};

// Lookup maps for quick conversion
const IATA_TO_ICAO: Record<string, string> = {};
const ICAO_TO_IATA: Record<string, string> = {};

// Initialize lookup maps
Object.values(AIRPORTS).forEach(airport => {
  IATA_TO_ICAO[airport.iata] = airport.icao;
  ICAO_TO_IATA[airport.icao] = airport.iata;
});

/**
 * Convert an IATA airport code to ICAO
 * @param iata The 3-letter IATA code
 * @returns The 4-letter ICAO code or null if not found
 */
export function iataToIcao(iata: string): string | null {
  return IATA_TO_ICAO[iata.toUpperCase()] || null;
}

/**
 * Convert an ICAO airport code to IATA
 * @param icao The 4-letter ICAO code
 * @returns The 3-letter IATA code or null if not found
 */
export function icaoToIata(icao: string): string | null {
  return ICAO_TO_IATA[icao.toUpperCase()] || null;
}

/**
 * Get airport details by code (either IATA or ICAO)
 * @param code The airport code (IATA or ICAO)
 * @returns The airport details or null if not found
 */
export function getAirportByCode(code: string): Airport | null {
  // Try as ICAO first
  if (AIRPORTS[code.toUpperCase()]) {
    return AIRPORTS[code.toUpperCase()];
  }
  
  // Try as IATA next
  const icao = iataToIcao(code);
  if (icao) {
    return AIRPORTS[icao];
  }
  
  return null;
} 