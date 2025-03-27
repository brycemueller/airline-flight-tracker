// State management
const state = {
    currentPage: 'airports',
    currentAirport: null,
    flightType: 'arrivals',
    airports: [],
    flights: []
};

// DOM Elements
const app = document.getElementById('app');

// Initialize application
async function init() {
    try {
        // Fetch airports on load
        await fetchAirports();
        
        // Parse URL to see if we need to navigate to a specific view
        const path = window.location.pathname;
        if (path.startsWith('/airport/')) {
            const airportCode = path.split('/')[2];
            const airport = state.airports.find(a => a.code === airportCode);
            
            if (airport) {
                state.currentAirport = airport;
                state.currentPage = 'flights';
                
                // Check for flight type in URL
                if (path.includes('/arrivals')) {
                    state.flightType = 'arrivals';
                } else if (path.includes('/departures')) {
                    state.flightType = 'departures';
                }
                
                await fetchFlights();
            }
        }
        
        // Render the appropriate view
        renderPage();
    } catch (error) {
        console.error('Initialization error:', error);
        showError('Failed to initialize the application');
    }
}

// Fetch airports from API
async function fetchAirports() {
    try {
        const response = await fetch('/api/airports');
        if (!response.ok) throw new Error('Failed to fetch airports');
        
        state.airports = await response.json();
    } catch (error) {
        console.error('Error fetching airports:', error);
        throw error;
    }
}

// Fetch flights for the selected airport and type
async function fetchFlights() {
    if (!state.currentAirport) return;
    
    try {
        const url = `/api/flights/${state.currentAirport.code}/${state.flightType}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Failed to fetch flights');
        
        state.flights = await response.json();
    } catch (error) {
        console.error('Error fetching flights:', error);
        showError('Failed to fetch flight data');
        state.flights = [];
    }
}

// Render the current page based on state
function renderPage() {
    switch (state.currentPage) {
        case 'airports':
            renderAirportsPage();
            break;
        case 'flights':
            renderFlightsPage();
            break;
        default:
            renderAirportsPage();
    }
}

// Render the airports selection page
function renderAirportsPage() {
    // Update URL
    history.pushState(null, null, '/');
    
    // Create content
    const content = `
        <h1>Airport Flight Tracker</h1>
        <h2>Select an Airport</h2>
        <ul class="airport-list">
            ${state.airports.map(airport => `
                <li class="airport-item" data-code="${airport.code}">
                    <span>${airport.name}</span>
                    <span class="airport-code">${airport.code}</span>
                </li>
            `).join('')}
        </ul>
    `;
    
    // Update DOM
    app.innerHTML = content;
    
    // Add event listeners
    document.querySelectorAll('.airport-item').forEach(item => {
        item.addEventListener('click', () => {
            const code = item.getAttribute('data-code');
            const airport = state.airports.find(a => a.code === code);
            
            if (airport) {
                selectAirport(airport);
            }
        });
    });
}

// Render the flights page
function renderFlightsPage() {
    if (!state.currentAirport) {
        renderAirportsPage();
        return;
    }
    
    // Update URL
    history.pushState(null, null, `/airport/${state.currentAirport.code}/${state.flightType}`);
    
    // Format flight data
    const formattedFlights = state.flights.map(flight => {
        const time = state.flightType === 'arrivals' ? 
            new Date(flight.scheduled_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
            new Date(flight.scheduled_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const location = state.flightType === 'arrivals' ? 
            (flight.origin ? flight.origin.code : 'Unknown') : 
            (flight.destination ? flight.destination.code : 'Unknown');
            
        const locationName = state.flightType === 'arrivals' ? 
            (flight.origin ? flight.origin.name : 'Unknown') : 
            (flight.destination ? flight.destination.name : 'Unknown');
            
        const status = flight.status ? flight.status.description : 'Unknown';
        const statusColor = flight.status && flight.status.color ? flight.status.color : '#888';
        
        return {
            ident: flight.ident,
            flightNumber: flight.flight_number,
            operator: flight.operator ? flight.operator.name : '',
            location,
            locationName,
            formattedTime: time,
            status,
            statusColor,
            terminal: flight.terminal || '',
            gate: flight.gate || ''
        };
    });
    
    // Create content
    const content = `
        <button class="back-button">← Back to Airports</button>
        <h1>${state.currentAirport.name}</h1>
        <div class="flight-type-toggle">
            <button class="${state.flightType === 'arrivals' ? 'active' : ''}" data-type="arrivals">Arrivals</button>
            <button class="${state.flightType === 'departures' ? 'active' : ''}" data-type="departures">Departures</button>
        </div>
        ${formattedFlights.length > 0 ? `
            <ul class="flight-list">
                ${formattedFlights.map(flight => `
                    <li class="flight-item">
                        <div>
                            <div class="flight-ident">${flight.ident}</div>
                            ${flight.operator ? `<div class="flight-operator">${flight.operator}</div>` : ''}
                            <div class="flight-location">${state.flightType === 'arrivals' ? 'From' : 'To'}: ${flight.location}</div>
                            ${flight.terminal ? `<div class="flight-terminal">Terminal: ${flight.terminal}</div>` : ''}
                            ${flight.gate ? `<div class="flight-gate">Gate: ${flight.gate}</div>` : ''}
                        </div>
                        <div>
                            <div class="flight-time">${flight.formattedTime}</div>
                            <div class="flight-status" style="background-color: ${flight.statusColor}; color: white;">
                                ${flight.status}
                            </div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        ` : '<p>No flights found</p>'}
    `;
    
    // Update DOM
    app.innerHTML = content;
    
    // Add event listeners
    document.querySelector('.back-button').addEventListener('click', () => {
        state.currentAirport = null;
        state.currentPage = 'airports';
        renderPage();
    });
    
    document.querySelectorAll('.flight-type-toggle button').forEach(button => {
        button.addEventListener('click', async () => {
            const type = button.getAttribute('data-type');
            if (type !== state.flightType) {
                state.flightType = type;
                await fetchFlights();
                renderPage();
            }
        });
    });
}

// Handle airport selection
async function selectAirport(airport) {
    state.currentAirport = airport;
    state.currentPage = 'flights';
    await fetchFlights();
    renderPage();
}

// Show error message
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    app.prepend(errorElement);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

// Start the application
document.addEventListener('DOMContentLoaded', init);