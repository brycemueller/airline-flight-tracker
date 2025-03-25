declare module '@/components/AirportPageClient' {
  interface AirportPageClientProps {
    airportCode: string;
  }
  
  const AirportPageClient: React.FC<AirportPageClientProps>;
  export default AirportPageClient;
} 