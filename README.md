# Weather Dashboard

A real-time weather dashboard built with HTML, CSS, and vanilla JavaScript.

## Features

- Search weather by city name
- Uses REST APIs and Fetch API
- Uses async/await
- Converts city names to coordinates using Open-Meteo Geocoding API
- Fetches current weather data
- Displays temperature
- Displays humidity
- Displays wind speed
- Displays feels-like temperature
- Displays weather condition
- Handles invalid cities
- Handles failed API requests
- Loading state
- Responsive design
- Dynamic DOM updates

## APIs

This project uses the public Open-Meteo APIs:

- Geocoding: https://geocoding-api.open-meteo.com/
- Weather: https://api.open-meteo.com/

No API key is required for the basic public API usage used by this project.

## How to run

Open `index.html` in a browser.

For best results, use VS Code with Live Server or another local development server.

## Test cases

1. Search for `Bengaluru`
2. Search for `Delhi`
3. Search for `Mumbai`
4. Search for an invalid city such as `xyzabcdef`
5. Submit an empty search
6. Check that loading and error states appear correctly
