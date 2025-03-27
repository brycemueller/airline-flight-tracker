package api

import (
	"github.com/brycebmueller/airline-flight-tracker/internal/aeroapi"
	"net/http"
)

// SetupRoutes configures all the routes for the application
func SetupRoutes(apiClient *aeroapi.Client) http.Handler {
	// Create a new ServeMux
	mux := http.NewServeMux()

	// Create handlers
	handlers := NewHandlers(apiClient)

	// Set up API routes
	mux.HandleFunc("/api/airports", handlers.HandleAirports)
	mux.HandleFunc("/api/flights/", handlers.HandleFlights)

	// Serve static files
	fs := http.FileServer(http.Dir("./static"))
	mux.Handle("/", fs)

	return mux
}
