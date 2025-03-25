'use client';

import AirportSelector from '@/components/AirportSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-md mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Airport Flight Tracker</CardTitle>
            <CardDescription className="text-center">
              Select an airport to view flight information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <AirportSelector />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
