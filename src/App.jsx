import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import WeatherInfo from "./components/WeatherInfo";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import { getWeather } from "./services/weatherService";
import { useEffect, useState } from "react";

const cities = ["Brasília", "São Paulo", "Recife"];

export default function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem("city");
    return cities.includes(savedCity) ? savedCity : "Brasília";
  });

  const [unit, setUnit] = useState(() => {
    const savedUnit = localStorage.getItem("unit");
    return savedUnit === "F" ? "F" : "C";
  });

  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setError(false);
    setWeather(null);

    getWeather(city)
      .then((data) => {
        setWeather(data);
      })
      .catch(() => {
        setError(true);
      });
  }, [city, attempt]);

  useEffect(() => {
    localStorage.setItem("city", city);
  }, [city]);

  useEffect(() => {
    localStorage.setItem("unit", unit);
  }, [unit]);

  return (
    <div>
      <Header
        city={city}
        onCityChange={setCity}
        unit={unit}
        onUnitChange={setUnit}
      />
      {error && (
        <div className="error-message">
          <p>
            Não foi possível carregar o clima. Verifique sua internet e tente
            novamente.
          </p>

          <button
            className="error-message__button"
            onClick={() => setAttempt(attempt + 1)}
          >
            Tentar novamente
          </button>
        </div>
      )}
      <WeatherCard weather={weather} unit={unit} city={city} />
      <WeatherInfo weather={weather} />
      <HourlyForecast weather={weather} unit={unit} />
      <DailyForecast weather={weather} unit={unit} />
    </div>
  );
}
