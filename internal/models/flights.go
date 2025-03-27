package models

import "time"

// Airport represents an airport with code and name
type Airport struct {
	Code string `json:"code"`
	Name string `json:"name"`
}

// Operator represents an airline operator
type Operator struct {
	ICAO string `json:"icao"`
	IATA string `json:"iata"`
	Name string `json:"name"`
}

// FlightStatus represents the status of a flight
type FlightStatus struct {
	Description string `json:"description"`
	Color       string `json:"color"`
}

// Flight represents flight information
type Flight struct {
	Ident         string       `json:"ident"`
	FaFlightID    string       `json:"fa_flight_id"`
	Operator      Operator     `json:"operator"`
	FlightNumber  string       `json:"flight_number"`
	Origin        Airport      `json:"origin"`
	Destination   Airport      `json:"destination"`
	DepartureTime time.Time    `json:"scheduled_out"`
	ArrivalTime   time.Time    `json:"scheduled_in"`
	Status        FlightStatus `json:"status"`
	Terminal      string       `json:"terminal"`
	Gate          string       `json:"gate"`
}
