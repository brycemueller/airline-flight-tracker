package main

import (
	"log"
	"net/http"
	"os"

	"airport-tracker/internal/aeroapi"
	"airport-tracker/internal/api"
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
