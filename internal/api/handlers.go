package api

import (
	"encoding/json"
	"github.com/brycebmueller/airline-flight-tracker/internal/aeroapi"
	"net/http"
	"strings"
)

// Handlers encapsulates HTTP handlers
type Handlers struct {
	APIClient *aeroapi.Client
}

// NewHandlers creates a new Handlers instance
func NewHandlers(apiClient *aeroapi.Client) *Handlers {
	return &Handlers{
		APIClient: apiClient,
	}
}

// HandleAirports returns a list of airports
func (h *Handlers) HandleAirports(w http.ResponseWriter, r *http.Request) {
	airports, err := h.APIClient.GetAirports()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(airports)
}

// HandleFlights returns flights for a specific airport
func (h *Handlers) HandleFlights(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/api/flights/")
	parts := strings.Split(path, "/")

	if len(parts) != 2 {
		http.Error(w, "Invalid URL format. Expected /api/flights/{airport_code}/{type}", http.StatusBadRequest)
		return
	}

	airportCode := parts[0]
	flightType := parts[1] // "arrivals" or "departures"

	var flights interface{}
	var err error

	if flightType == "arrivals" {
		flights, err = h.APIClient.GetArrivals(airportCode)
	} else if flightType == "departures" {
		flights, err = h.APIClient.GetDepartures(airportCode)
	} else {
		http.Error(w, "Invalid flight type. Use 'arrivals' or 'departures'", http.StatusBadRequest)
		return
	}

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(flights)
}
