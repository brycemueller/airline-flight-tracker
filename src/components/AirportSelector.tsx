'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface Airport {
  id: string;
  name: string;
}

export default function AirportSelector() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAirports = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/airports');
        if (!response.ok) {
          throw new Error('Failed to fetch airports');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setAirports(data);
        } else {
          console.error('Expected array of airports but got:', data);
          setAirports([]);
        }
      } catch (error) {
        console.error('Error fetching airports:', error);
        setAirports([]); // Ensure airports is an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchAirports();
  }, []);

  const handleSelect = (airportId: string) => {
    setValue(airportId);
    setOpen(false);
    router.push(`/airport/${airportId}`);
  };

  return (
    <div className="flex flex-col space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value && airports.length > 0
              ? airports.find((airport) => airport.id === value)?.name || "Select an airport..."
              : "Select an airport..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput 
              placeholder="Search airport..." 
              className="h-9"
            />
            <CommandEmpty>No airport found.</CommandEmpty>
            <CommandGroup>
              {loading ? (
                <div className="p-4 text-center">Loading airports...</div>
              ) : (
                <CommandList>
                  {airports && airports.length > 0 ? (
                    airports.map((airport) => (
                      <CommandItem
                        key={airport.id || `airport-${airport.name}`}
                        value={airport.id}
                        onSelect={handleSelect}
                      >
                        {airport.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === airport.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))
                  ) : (
                    <div className="p-4 text-center">No airports available</div>
                  )}
                </CommandList>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
} 