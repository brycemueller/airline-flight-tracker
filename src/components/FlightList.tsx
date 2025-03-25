'use client';

import { format } from 'date-fns';

export type Flight = {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  originCity?: string;
  destination: string;
  destinationCity?: string;
  scheduledTime: string;
  status: string;
};

export interface FlightListProps {
  flights: Flight[];
  type: 'departures' | 'arrivals';
}

export default function FlightList({ flights, type }: FlightListProps) {
  // Helper function to get the status color based on flight status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on time':
        return 'text-green-600';
      case 'delayed':
        return 'text-amber-600';
      case 'cancelled':
        return 'text-red-600';
      case 'boarding':
        return 'text-blue-600';
      case 'departed':
      case 'arrived':
        return 'text-green-700';
      case 'en route':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Airline
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Flight
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {type === 'departures' ? 'Destination' : 'Origin'}
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {flights.map((flight, index) => (
            <tr key={flight.id || `flight-${index}`} className="hover:bg-gray-50">
              <td className="px-3 py-4 whitespace-nowrap text-sm">
                {flight.airline}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                {flight.flightNumber}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm">
                {type === 'departures' 
                  ? `${flight.destination} ${flight.destinationCity ? `(${flight.destinationCity})` : ''}` 
                  : `${flight.origin} ${flight.originCity ? `(${flight.originCity})` : ''}`}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm">
                {flight.scheduledTime}
              </td>
              <td className={`px-3 py-4 whitespace-nowrap text-sm font-medium ${getStatusColor(flight.status)}`}>
                {flight.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 