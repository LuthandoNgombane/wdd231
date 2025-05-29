// LN - Weather API Configuration
const weatherApiKey = '0a9bad9d2042b18b0c1de648321b628a'; 
const lat = -31.59; 
const lon = 28.78; 
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + weatherApiKey;
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + weatherApiKey;

// LN - Fetch Weather Data
export async function fetchWeather() {
    try {
        const currentResponse = await fetch(currentWeatherUrl);
        if (currentResponse.ok === false) {
            throw new Error('Failed to fetch current weather');
        }
        const currentData = await currentResponse.json();

        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok === false) {
            throw new Error('Failed to fetch forecast');
        }
        const forecastData = await forecastResponse.json();

        return { current: currentData, forecast: forecastData };
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
}

// LN - Display Weather Data
export function displayWeather(currentData, forecastData) {
    const currentTempElement = document.getElementById('current-temp');
    const weatherIconElement = document.getElementById('weather-icon');
    const weatherDescElement = document.getElementById('weather-desc');
    const forecastCardsElement = document.getElementById('forecast-cards');

    if (currentTempElement === null || weatherIconElement === null || weatherDescElement === null || forecastCardsElement === null) {
        return;
    }

    // LN - Current Weather
    const temp = currentData.main.temp;
    const description = currentData.weather[0].description;
    const icon = currentData.weather[0].icon;
    const iconSrc = 'https://openweathermap.org/img/w/' + icon + '.png';

    currentTempElement.textContent = temp + '°C';
    weatherIconElement.setAttribute('src', iconSrc);
    weatherIconElement.setAttribute('alt', 'Weather: ' + description);
    weatherDescElement.textContent = description;

    // LN - 3-Day Forecast
    forecastCardsElement.innerHTML = '';
    const dailyData = [];
    for (let i = 0; i < forecastData.list.length; i++) {
        const forecast = forecastData.list[i];
        const date = new Date(forecast.dt * 1000);
        const isMidday = date.getHours() >= 12 && date.getHours() <= 15;
        if (isMidday && dailyData.length < 3) {
            dailyData.push(forecast);
        }
    }

    for (let i = 0; i < dailyData.length; i++) {
        const forecast = dailyData[i];
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = forecast.main.temp;
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `
            <h4>${dayName}</h4>
            <p>${temp}°C</p>
        `;
        forecastCardsElement.appendChild(card);
    }
}