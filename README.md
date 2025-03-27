# Airport Flight Tracker

A mobile-optimized web application for tracking flight arrivals and departures at various airports.

## Features

- Mobile-friendly interface
- View flights by airport
- Toggle between arrivals and departures
- Real-time flight data via FlightAware's AeroAPI

## Prerequisites

- Go 1.16 or higher
- FlightAware AeroAPI key (https://flightaware.com/aeroapi/)

## Project Structure

```
airport-tracker/
├── cmd/
│   └── server/
│       └── main.go           # Application entry point
├── internal/
│   ├── api/
│   │   ├── handlers.go       # HTTP handlers
│   │   └── routes.go         # Route definitions
│   ├── aeroapi/
│   │   ├── client.go         # FlightAware API client
│   │   └── models.go         # API response models
│   └── models/
│       └── flight.go         # Domain models
├── static/
│   ├── css/
│   │   └── style.css         # Stylesheet
│   ├── js/
│   │   └── app.js            # Frontend JavaScript
│   └── index.html            # Main HTML file
├── go.mod                    # Go module file
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/airport-tracker.git
   cd airport-tracker
   ```

2. Install dependencies
   ```bash
   go mod tidy
   ```

3. Set up your AeroAPI key
   ```bash
   export AEROAPI_KEY=your_aeroapi_key_here
   ```

## Running the Application

1. Start the server
   ```bash
   go run cmd/server/main.go
   ```

2. Open your browser to http://localhost:8080

## Usage

1. Select an airport from the list on the homepage
2. View the arrivals or departures for the selected airport
3. Toggle between arrivals and departures using the buttons at the top

## License

MIT

## Acknowledgments

- FlightAware for providing the AeroAPI