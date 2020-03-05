// ../assets/ -> ./assets/
// renderLoader -> Loader
// "${..}" -> {..}
// change each markup to component's return ()

import React from 'react';
// import elements from './elements';
import * as utils from './utils';

// Weather Icons
import clearDay from './assets/weather-icons/day.svg';
import clearNight from './assets/weather-icons/night.svg';
import cloudyDay from './assets/weather-icons/cloudy-day.svg';
import cloudyNight from './assets/weather-icons/cloudy-night.svg';
import cloudy from './assets/weather-icons/cloudy.svg';
import rain from './assets/weather-icons/rain.svg';
import showerRain from './assets/weather-icons/shower-rain.svg';
import snow from './assets/weather-icons/snowy.svg';
import thunder from './assets/weather-icons/thunder.svg';
import mist from './assets/weather-icons/foggy.svg';

// Gets input from the form
// export const getInput = () => elements.input.value;

// Clears form input
export const clearInput = () => {
    // elements.input.value = '';
};

// Adds Loader to screen
export const Loader = () => {
    const loaderIcons = [
        clearDay,
        clearNight,
        cloudyDay,
        cloudyNight,
        cloudy,
        rain,
        showerRain,
        snow,
        thunder
    ];
    return (
        <div className="loader">
            <img
                src={loaderIcons[Math.round(Math.random() * (loaderIcons.length - 1))]}
                alt="weather icons"
                className="loader__icon"
            ></img>
        </div>
    );
};

// Clears the loader from screen
// export const clearLoader = () => {
//     elements.weatherContainer.innerHTML = '';
// };

// Gets appropiate weather icon depending on weather and iconID received from API response
const getWeatherIcon = iconID => {
    let weatherIcon = '';

    switch (iconID) {
        case '01d':
            weatherIcon = clearDay;
            break;
        case '01n':
            weatherIcon = clearNight;
            break;
        case '02d':
            weatherIcon = cloudyDay;
            break;
        case '02n':
            weatherIcon = cloudyNight;
            break;
        case '03d':
            weatherIcon = cloudy;
            break;
        case '03n':
            weatherIcon = cloudy;
            break;
        case '04d':
            weatherIcon = cloudy;
            break;
        case '04n':
            weatherIcon = cloudy;
            break;
        case '09d':
            weatherIcon = showerRain;
            break;
        case '09n':
            weatherIcon = showerRain;
            break;
        case '10d':
            weatherIcon = rain;
            break;
        case '10n':
            weatherIcon = rain;
            break;
        case '11d':
            weatherIcon = thunder;
            break;
        case '11n':
            weatherIcon = thunder;
            break;
        case '13d':
            weatherIcon = snow;
            break;
        case '13n':
            weatherIcon = snow;
            break;
        case '50d':
            weatherIcon = mist;
            break;
        case '50n':
            weatherIcon = mist;
            break;
        default:
            weatherIcon = clearDay;
    }

    return weatherIcon;
};

// Updates the current weather view
export const UpdateCurrentWeatherView = props => {
    return (
        <div className="current-weather">
            <h1 className="city-name">{props.currentWeather.cityName}</h1>
            <h3 className="date-time">{utils.getDayAndTime(props.currentWeather.date * 1000)}</h3>
            <h3 className="weather-description">{props.currentWeather.weather.main}</h3>
            <img
                src={getWeatherIcon(props.currentWeather.weather.icon)}
                alt="weather icon"
                className="weather-icon"
            ></img>
            <h1 className="current-temp">
                <span className={'temp-in-c ' + (props.type === 'C' ? 'selected' : '')}>
                    {utils.convertToCelsius(props.currentWeather.main.temp)}
                </span>
                <span className={'temp-in-f ' + (props.type === 'F' ? 'selected' : '')}>
                    {utils.convertToFahrenheit(props.currentWeather.main.temp)}
                </span>
                <sup>
                    <button
                        className={
                            'temp-unit btn-celsius ' + (props.type === 'C' ? 'active-unit' : '')
                        }
                        onClick={props.convertTempUnit('F')}
                    >
                        &deg;C
                    </button>
                    <span>|</span>
                    <button
                        className={
                            'temp-unit btn-fahrenheit ' + (props.type === 'F' ? 'active-unit' : '')
                        }
                        onClick={props.convertTempUnit('C')}
                    >
                        &deg;F
                    </button>
                </sup>
            </h1>
            <div className="extra-weather-details">
                <p>Humidity: {props.currentWeather.main.humidity}%</p>
                <p>Wind: {Math.trunc(props.currentWeather.wind.speed * 3.6)} km/h</p>
            </div>
        </div>
    );
};

// Updates the weather forecast view
export const UpdateWeatherForecastView = props => {
    return (
        <div className="weather-forecast">
            {props.forecast.list.map((weather, i) => {
                return (
                    <div className="weather" key={i}>
                        <img
                            src={getWeatherIcon(weather.weather[0].icon)}
                            alt="weather icon"
                            className="weather-forecast-icon"
                        ></img>
                        <div className="weather-detail">
                            <h2 className="forecast-day">{utils.getDay(weather.dt * 1000)}</h2>
                            <h3>Humidity: {weather.main.humidity}%</h3>
                            <h3>Wind: {Math.trunc(weather.wind.speed * 3.6)} km/h</h3>
                        </div>
                        <h3 className="temp">
                            <span className={'temp-in-c ' + (props.type === 'C' ? 'selected' : '')}>
                                {utils.convertToCelsius(weather.main.temp)}&deg;C
                            </span>
                            <span className={'temp-in-f ' + (props.type === 'F' ? 'selected' : '')}>
                                {utils.convertToFahrenheit(weather.main.temp)}&deg;F
                            </span>
                        </h3>
                    </div>
                );
            })}
        </div>
    );
};

// Shows error to the screen if something went wrong
export const showError = errorMessage => {
    return (
        <div className="error-message">
            <p>{errorMessage}</p>
        </div>
    );
};
