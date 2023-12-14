// #region Imports
import './css/styles.scss';
import {validateForm, showPersonalizedError} from './js/formValidation';
import getWeatherByCity from './js/weather';

// #endregion

const form = document.getElementsByTagName('form')[0];
const cityInput = document.getElementById('city-input');
const city = document.getElementById('city');
const country = document.getElementById('country');
const localTime = document.getElementById('local-time');
const temp = document.getElementById('temp');
const wind = document.getElementById('wind');
const weatherIcon = document.getElementById('weather-icon');

/**
 * 
 * @param {*} pWeather 
 */
function displayWeather(pWeather) {
    city.textContent = pWeather.location.name;
    country.textContent = pWeather.location.country;
    localTime.textContent = pWeather.location.localtime;
    temp.textContent = pWeather.current.temp_c;
    wind.textContent = pWeather.current.wind_kph;
    weatherIcon.src = pWeather.current.condition.icon;
    weatherIcon.alt = `${pWeather.current.condition.text} icon`;
}

/**
 * Handle submit form
 */
async function handleSubmitForm() {
    if (validateForm(form)) {
        try {
            const result = await getWeatherByCity(cityInput.value);
            displayWeather(result);
        } catch(error) {
            showPersonalizedError(document.getElementById('city-input'), error.message);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmitForm();
    });
});