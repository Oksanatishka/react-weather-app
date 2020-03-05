// import './../styles/app.css'; // added to webpack entry

// import '@babel/polyfill';
import axios from 'axios';

// import elements from './elements';
import geoLocation from './geoLocation';
// import * as weatherView from './weatherView';
import * as utils from './utils';

// base url for weather API
export const baseURL = 'https://api.openweathermap.org/data/2.5';

// Async function for getting current weather and weather forecast
export const getWeather = async url => {
    // weatherView.renderLoader();
    try {
        const currentWeather = await axios(url);
        const weatherForecast = await axios(url.replace('/weather', '/forecast'));

        const data = {
            currentWeather: {
                cityName: `${currentWeather.data.name}, ${currentWeather.data.sys.country}`,
                main: currentWeather.data.main,
                weather: currentWeather.data.weather[0],
                date: currentWeather.data.dt,
                wind: currentWeather.data.wind
            },
            forecast: {
                city: weatherForecast.data.city,
                list: weatherForecast.data.list.filter(item => {
                    const today = utils.getToday();
                    const day = utils.getDay(item.dt * 1000);
                    return day !== today && item.dt_txt.includes('12:00');
                })
            }
        };
        return data;
        // weatherView.clearLoader();
        // weatherView.updateCurrentWeatherView(data.currentWeather);
        // weatherView.updateWeatherForecastView(data.forecast);
    } catch (error) {
        // weatherView.clearLoader();
        // weatherView.showError(error.response.data.message);
    }
};

// Gets weather by GeoLocation
export const getWeatherByGeoLocation = event => {
    // debugger;
    if ('geolocation' in navigator) {
        // return promise (geoLocation(есть then), getWeather(используется axios))
        return geoLocation()
            .then(position => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                const url = `${baseURL}/weather?lat=${lat}&lon=${long}&appid=0ea2e38e26ca69e9c79045f9402ff3a3`;
                return getWeather(url);
            })
            .catch(error => {
                // weatherView.showError(error.message);
            });
    } else {
        console.log('Geolocation not available');
    }
};

// перенесли код в App.js
// Gets weather by city name
// export const weatherFormHandler = event => {
//     event.preventDefault();
// const city = weatherView.getInput();
// if (city.trim() === '') return;
// const url = `${baseURL}/weather?q=${city}&APPID=${process.env.WEATHER_API_KEY}`;
// weatherView.clearInput();
// getWeather(url);
// };

// Convert temperature unit between celsius and fahrenheit
// export const convertTempUnit = event => {
//     const btnCelsius = document.querySelector('.btn-celsius');
//     const btnFahrenheit = document.querySelector('.btn-fahrenheit');

//     const tempCelsius = document.querySelectorAll('.temp-in-c');
//     const tempFahrenheit = document.querySelectorAll('.temp-in-f');

//     if (event.target === btnCelsius) {
//         tempCelsius.forEach(element => element.classList.add('selected'));
//         tempFahrenheit.forEach(element => element.classList.remove('selected'));

//         btnCelsius.classList.add('active-unit');
//         btnFahrenheit.classList.remove('active-unit');
//     } else if (event.target === btnFahrenheit) {
//         tempCelsius.forEach(element => element.classList.remove('selected'));
//         tempFahrenheit.forEach(element => element.classList.add('selected'));

//         btnFahrenheit.classList.add('active-unit');
//         btnCelsius.classList.remove('active-unit');
//     }
// };

// Event Listeners
// window.addEventListener('load', getWeatherByGeoLocation);   // -> use componentDidMount
// elements.form.addEventListener('submit', weatherFormHandler);   // -> onsubmit в самой форме
// elements.weatherContainer.addEventListener('click', convertTempUnit);    // -> onclick
