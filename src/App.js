// transform functional component to class component
// add componentDidMount
import './App.css';
import React, { Component } from 'react';
import { getWeatherByGeoLocation, getWeather } from './getWeather';
import { UpdateCurrentWeatherView } from './weatherComponents';
import { UpdateWeatherForecastView } from './weatherComponents';
import { Loader } from './weatherComponents';
import { baseURL } from './getWeather';

class App extends Component {
    state = { loading: true, type: 'C' };
    // по возвращению resolve promise запихиваем data в setState через async await
    async componentDidMount() {
        const result = await getWeatherByGeoLocation();
        console.log(result);
        this.setState({ ...result, loading: false });
    }
    weatherFormHandler = async event => {
        event.preventDefault();

        const city = this.state.city;
        if (city.trim() === '') return;
        const url = `${baseURL}/weather?q=${city}&APPID=0ea2e38e26ca69e9c79045f9402ff3a3`;
        // weatherView.clearInput();

        const result = await getWeather(url);
        this.setState({ ...result, city: '' });
    };
    onInputChange = e => {
        this.setState({ city: e.target.value });
    };
    //closure
    convertTempUnitHandler = clickedType => () => {
        if (clickedType === 'C') {
            this.setState({ type: 'F' });
        }
        if (clickedType === 'F') {
            this.setState({ type: 'C' });
        }
    };
    render() {
        return (
            <div className="container">
                <header className="heading">
                    <h1 className="heading-primary">Weather App</h1>
                    <h2 className="heading-secondary">Get Daily Weather Info</h2>
                </header>

                <form action="#" className="form" onSubmit={this.weatherFormHandler}>
                    <input
                        type="text"
                        className="form__input"
                        placeholder="Enter City Name"
                        required
                        onChange={this.onInputChange}
                    ></input>
                    <button type="submit" value="search" className="btn-search">
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            className="btn-search__icon"
                        >
                            <title>search</title>
                            <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
                        </svg>
                    </button>
                </form>

                {this.state.loading ? (
                    <Loader />
                ) : (
                    <div className="weather-container">
                        <UpdateCurrentWeatherView
                            {...this.state}
                            convertTempUnit={this.convertTempUnitHandler}
                            type={this.state.type}
                        />
                        <UpdateWeatherForecastView {...this.state} type={this.state.type} />
                    </div>
                )}
            </div>
        );
    }
}

export default App;
