// LN - Import Modules
import { updateFooter } from './footer.js';
import { fetchMembers } from './members.js';
import { fetchWeather, displayWeather } from './weather.js';
import { displaySpotlights } from './spotlights.js';

// LN - Initialize
async function initialize() {
    // LN - Update Footer
    updateFooter();

    // LN - Fetch and Display Weather
    try {
        const weatherData = await fetchWeather();
        displayWeather(weatherData.current, weatherData.forecast);
    } catch (error) {
        const weatherSection = document.getElementById('current-weather');
        if (weatherSection !== null) {
            weatherSection.innerHTML = '<p style="color: red; text-align: center;">Error loading weather data. Please try again later.</p>';
        }
    }

    // LN - Fetch and Display Spotlights
    try {
        const members = await fetchMembers();
        displaySpotlights(members);
    } catch (error) {
        const spotlightSection = document.getElementById('spotlight-cards');
        if (spotlightSection !== null) {
            spotlightSection.innerHTML = '<p style="color: red; text-align: center;">Error loading spotlights. Please try again later.</p>';
        }
    }
}

// LN - Run Initialization
initialize();