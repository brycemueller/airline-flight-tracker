package main

import (
	"github.com/brycebmueller/airline-flight-tracker/internal/aeroapi"
	"github.com/brycebmueller/airline-flight-tracker/internal/api"
	"log"
	"net/http"
	"os"
)

func main() {
	// Get API key from environment variable
	apiKey := os.Getenv("AEROAPI_KEY")
	if apiKey == "" {
		log.Fatal("AEROAPI_KEY environment variable is required")
	}

	// Create API client
	apiClient := aeroapi.NewClient(apiKey)

	// Set up routes
	router := api.SetupRoutes(apiClient)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s...", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
