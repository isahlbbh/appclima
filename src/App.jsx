import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import WeatherInfo from "./components/WeatherInfo";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import { getWeather } from "./services/weatherService";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";

const cities = [
  { name: "Brasília", latitude: -15.79, longitude: -47.88 },
  { name: "São Paulo", latitude: -23.55, longitude: -46.63 },
  { name: "Recife", latitude: -8.05, longitude: -34.88 },
];

function getSavedCity() {
  try {
    const savedCity = JSON.parse(localStorage.getItem("city"));

    if (
      savedCity &&
      savedCity.name &&
      typeof savedCity.latitude === "number" &&
      typeof savedCity.longitude === "number"
    ) {
      return savedCity;
    }
  } catch {
    // valor antigo ou inválido: usa a cidade padrão
  }

  return cities[0];
}

export default function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(getSavedCity);

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
    localStorage.setItem("city", JSON.stringify(city));
  }, [city]);

  useEffect(() => {
    localStorage.setItem("unit", unit);
  }, [unit]);

  return (
    <div>
      <Header
        city={city.name}
        onCityChange={(name) => setCity(cities.find((c) => c.name === name))}
        unit={unit}
        onUnitChange={setUnit}
      />
      <SearchBar onSelect={setCity} />
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
      <WeatherCard weather={weather} unit={unit} city={city.name} />
      <WeatherInfo weather={weather} />
      <HourlyForecast weather={weather} unit={unit} />
      <DailyForecast weather={weather} unit={unit} />
    </div>
  );
}
