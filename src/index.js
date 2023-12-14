// #region Imports
import './css/styles.scss';
import { validateForm, showPersonalizedError } from './js/formValidation';
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

const tempUnitBtn = document.getElementById('temp-unit');
const windUnitBtn = document.getElementById('wind-unit');
const tempLetter = document.getElementById('temp-letter');
const windLetter = document.getElementById('wind-letter');
let tempUnit = 'C';
let windUnit = 'k';

let currentWeather;

/**
 *
 */
function displayWeather() {
  city.textContent = currentWeather.location.name;
  country.textContent = currentWeather.location.country;
  localTime.textContent = currentWeather.location.localtime;

  if (tempUnit === 'C') {
    temp.textContent = `${currentWeather.current.temp_c}°C`;
  } else {
    temp.textContent = `${currentWeather.current.temp_f}°F`;
  }

  if (windUnit === 'k') {
    wind.textContent = `${currentWeather.current.wind_kph}kph`;
  } else {
    wind.textContent = `${currentWeather.current.wind_mph}mph`;
  }

  weatherIcon.src = currentWeather.current.condition.icon;
  weatherIcon.alt = `${currentWeather.current.condition.text} icon`;
}

/**
 *
 */
async function refreshWeather(pCity) {
  currentWeather = await getWeatherByCity(pCity);
  displayWeather(currentWeather);
}

/**
 * Handle submit form
 */
async function handleSubmitForm() {
  if (validateForm(form)) {
    try {
      await refreshWeather(cityInput.value);
      localStorage.setItem('city', cityInput.value);
      cityInput.value = '';
    } catch (error) {
      showPersonalizedError(
        document.getElementById('city-input'),
        error.message
      );
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if ('city' in localStorage) {
    refreshWeather(localStorage.getItem('city'));
  } else {
    refreshWeather('Quebec');
  }

  if ('tempUnit' in localStorage) {
    tempUnit = localStorage.getItem('tempUnit');
    tempLetter.textContent = tempUnit;
  }
  if ('windUnit' in localStorage) {
    windUnit = localStorage.getItem('windUnit');
    windLetter.textContent = windUnit;
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmitForm();
  });

  tempUnitBtn.addEventListener('click', () => {
    if (tempUnit === 'C') {
      tempUnit = 'F';
    } else {
      tempUnit = 'C';
    }

    localStorage.setItem('tempUnit', tempUnit);
    tempLetter.textContent = tempUnit;
    displayWeather();
  });

  windUnitBtn.addEventListener('click', () => {
    if (windUnit === 'k') {
      windUnit = 'm';
    } else {
      windUnit = 'k';
    }

    localStorage.setItem('windUnit', windUnit);
    windLetter.textContent = windUnit;
    displayWeather();
  });
});
