// components/Weather.js
import React, { useState } from "react";
import "./css/weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const apiKey = "2bb5282f4c06461aacc135506252204"; // Weatherstack API key
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error.info || "Error fetching weather");
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather Forecast</h2>
      <div className="weather-form">
        <input
          type="text"
          placeholder="Enter city (e.g. Cape Town)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-result">
          <h3>{weather.location.name}, {weather.location.country}</h3>
          <p>🌡 Temp: {weather.current.temperature}°C</p>
          <p>☁️ Condition: {weather.current.weather_descriptions[0]}</p>
          <p>💨 Wind: {weather.current.wind_speed} km/h</p>
          <p>💧 Humidity: {weather.current.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
