# Airline Flight Tracker

A mobile-friendly web application for tracking flights at airports. The application allows users to select an airport and view arrivals and departures in real-time.

## Features

- Mobile-responsive design optimized for both desktop and mobile use
- Airport selection with searchable dropdown
- View arrivals and departures for selected airports
- Real-time flight status updates
- Clean, modern UI using shadcn/ui components

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Data**: FlightAware AeroAPI (mock data for development)
- **API Integration**: Node.js backend API routes

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/airline-flight-tracker.git
   cd airline-flight-tracker
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   FLIGHTAWARE_API_KEY=your_api_key_here
   FLIGHTAWARE_API_URL=https://aeroapi.flightaware.com/aeroapi
   ```
   
   Replace `your_api_key_here` with your actual FlightAware AeroAPI key. 
   You can obtain an API key by signing up at [FlightAware AeroAPI Portal](https://www.flightaware.com/aeroapi/portal/documentation#overview).

4. Run the development server
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Production Deployment

To build the application for production:

```
npm run build
npm start
```

## API Integration

The application uses FlightAware's AeroAPI for real-time flight data. In development mode, the application uses mock data. To use real data, obtain an API key from FlightAware and configure it in your `.env.local` file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [FlightAware](https://www.flightaware.com/) for the AeroAPI
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Next.js](https://nextjs.org/) for the React framework
