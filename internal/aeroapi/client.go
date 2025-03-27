package aeroapi

import (
	"encoding/json"
	"fmt"
	"github.com/brycebmueller/airline-flight-tracker/internal/models"
	"io/ioutil"
	"net/http"
	"time"
)

const (
	baseURL = "https://aeroapi.flightaware.com/aeroapi/v2"
)

// Client handles API requests to FlightAware
type Client struct {
	APIKey     string
	HTTPClient *http.Client
}

// NewClient creates a new client for AeroAPI
func NewClient(apiKey string) *Client {
	return &Client{
		APIKey: apiKey,
		HTTPClient: &http.Client{
			Timeout: time.Second * 30,
		},
	}
}

// GetAirports fetches a list of major airports
func (c *Client) GetAirports() ([]models.Airport, error) {
	url := fmt.Sprintf("%s/airports", baseURL)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("x-apikey", c.APIKey)

	// For demonstration, we're using sample data
	// In production, you would use the actual API response
	airports := []models.Airport{
		{Code: "KATL", Name: "Hartsfield-Jackson Atlanta International Airport"},
		{Code: "KORD", Name: "Chicago O'Hare International Airport"},
		{Code: "KDFW", Name: "Dallas/Fort Worth International Airport"},
		{Code: "KLAX", Name: "Los Angeles International Airport"},
		{Code: "KJFK", Name: "John F. Kennedy International Airport"},
		{Code: "KSFO", Name: "San Francisco International Airport"},
		{Code: "KDEN", Name: "Denver International Airport"},
		{Code: "KLAS", Name: "Harry Reid International Airport"},
		{Code: "KMIA", Name: "Miami International Airport"},
		{Code: "KPHX", Name: "Phoenix Sky Harbor International Airport"},
	}
	return airports, nil
}

// GetArrivals fetches arrivals for an airport
func (c *Client) GetArrivals(airportCode string) ([]models.Flight, error) {
	url := fmt.Sprintf("%s/airports/%s/arrivals", baseURL, airportCode)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("x-apikey", c.APIKey)

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API returned non-200 status: %d, body: %s", resp.StatusCode, string(body))
	}

	var response ArrivalResponse
	if err := json.Unmarshal(body, &response); err != nil {
		return nil, err
	}

	return response.Arrivals, nil
}

// GetDepartures fetches departures for an airport
func (c *Client) GetDepartures(airportCode string) ([]models.Flight, error) {
	url := fmt.Sprintf("%s/airports/%s/departures", baseURL, airportCode)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("x-apikey", c.APIKey)

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API returned non-200 status: %d, body: %s", resp.StatusCode, string(body))
	}

	var response DepartureResponse
	if err := json.Unmarshal(body, &response); err != nil {
		return nil, err
	}

	return response.Departures, nil
}
