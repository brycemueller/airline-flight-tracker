import { Suspense } from 'react';
import AirportPageClient from '../../../components/AirportPageClient';

interface AirportPageProps {
  params: {
    airportCode: string;
  };
}

export default function AirportPage({ params }: AirportPageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading airport data...</div>}>
      <AirportPageClient airportCode={params.airportCode} />
    </Suspense>
  );
} 