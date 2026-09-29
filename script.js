const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const weatherResult = document.getElementById("weatherResult");
const initialMessage = document.getElementById("initialMessage");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");
const weatherCondition = document.getElementById("weatherCondition");
const updatedTime = document.getElementById("updatedTime");

function getWeatherDescription(code) {
    const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };

    return weatherCodes[code] || "Unknown";
}

async function getCoordinates(city) {
    const url =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to search for the city.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`City "${city}" was not found.`);
    }

    return data.results[0];
}

async function getWeather(latitude, longitude) {
    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to fetch weather data.");
    }

    return await response.json();
}

function displayWeather(location, weather) {
    cityName.textContent = location.name;
    countryName.textContent =
        `${location.admin1 ? location.admin1 + ", " : ""}${location.country}`;

    temperature.textContent =
        Math.round(weather.current.temperature_2m);

    humidity.textContent =
        `${weather.current.relative_humidity_2m}%`;

    windSpeed.textContent =
        `${weather.current.wind_speed_10m} km/h`;

    feelsLike.textContent =
        `${Math.round(weather.current.apparent_temperature)}°C`;

    weatherCondition.textContent =
        getWeatherDescription(weather.current.weather_code);

    updatedTime.textContent =
        `Updated: ${weather.current.time}`;

    weatherResult.classList.remove("hidden");
    initialMessage.classList.add("hidden");
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    weatherResult.classList.add("hidden");
}

function showLoading() {
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    weatherResult.classList.add("hidden");
    initialMessage.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

async function searchWeather(city) {
    showLoading();

    try {
        const location = await getCoordinates(city);

        const weather = await getWeather(
            location.latitude,
            location.longitude
        );

        displayWeather(location, weather);
    } catch (error) {
        console.error(error);

        showError(
            error.message ||
            "Something went wrong. Please try again."
        );
    } finally {
        hideLoading();
    }
}

searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    searchWeather(city);
});
