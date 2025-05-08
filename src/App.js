import React, { useState } from 'react';
import './App.css';
import { FiSearch } from 'react-icons/fi';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';

const API_KEY = '095a80e51cf9b0cd904c025c75cf6638'; // Replace this with your actual API key

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = () => {
    if (!city) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeather(data);
        } else {
          alert('City not found!');
        }
      });
  };

  return (
    <div className="main-container">
      <div className="heading">
        <h1>Welcome To Our Weather App</h1>
      </div>
      <div className="container">
        <div className="card">
          <div className="input-section">
            <input
              type="text"
              placeholder="Search city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input"
            />
            <button onClick={getWeather} className="button">
              <FiSearch size={20} />
            </button>
          </div>
          {weather && (
            <div className="info">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="weather-icon"
              />
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="city">{weather.name}</div>
              <div className="desc">{weather.weather[0].description}</div>
              <div className="details">
                <span className="icon-text">
                  <WiHumidity size={24} /> {weather.main.humidity}%
                </span>
                <span className="icon-text">
                  <WiStrongWind size={24} /> {weather.wind.speed} km/h
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
