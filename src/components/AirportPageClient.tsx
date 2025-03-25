'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FlightList, { Flight } from '@/components/FlightList';

type TabValue = 'departures' | 'arrivals';

interface AirportPageClientProps {
  airportCode: string;
}

export default function AirportPageClient({ airportCode }: AirportPageClientProps) {
  const [activeTab, setActiveTab] = useState<TabValue>('departures');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/flights/${airportCode}?type=${activeTab}`);
        
        // Store the response text/json so we don't try to read the body stream twice
        const responseText = await response.text();
        let responseData;
        
        try {
          // Try to parse the response as JSON
          responseData = JSON.parse(responseText);
        } catch (e) {
          // If parsing fails, use the raw text
          responseData = { error: responseText };
        }
        
        if (!response.ok) {
          // Extract error message from response if possible
          const errorMessage = responseData?.error || `Failed to fetch ${activeTab} flights (Status: ${response.status})`;
          setError(errorMessage);
          return; // Exit early instead of throwing
        }
        
        if (Array.isArray(responseData)) {
          setFlights(responseData);
        } else if (responseData.error) {
          setError(responseData.error);
        } else {
          setFlights([]);
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
        setError(error instanceof Error ? error.message : 'Failed to load flights. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [airportCode, activeTab]);

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-24">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{airportCode} Flights</h1>
          <Button variant="outline" onClick={() => router.push('/')}>
            Change Airport
          </Button>
        </div>

        <Card>
          <CardHeader>
            <Tabs 
              defaultValue="departures" 
              value={activeTab}
              onValueChange={(value: string) => setActiveTab(value as TabValue)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="departures">Departures</TabsTrigger>
                <TabsTrigger value="arrivals">Arrivals</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center">Loading flights...</div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">{error}</div>
            ) : flights.length === 0 ? (
              <div className="py-8 text-center">No flights found.</div>
            ) : (
              <FlightList flights={flights} type={activeTab} />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 