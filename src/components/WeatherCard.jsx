import "../styles/weather-card.css";
import { convertTemperature } from "../utils/temperature";
import { getWeatherGroup } from "../utils/weatherGroup";
import sunnyImage from "../assets/weather/sunny.svg";
import cloudyImage from "../assets/weather/cloudy.svg";
import rainyImage from "../assets/weather/rainy.svg";
import snowyImage from "../assets/weather/snowy.svg";

const weatherImages = {
  sunny: sunnyImage,
  cloudy: cloudyImage,
  rainy: rainyImage,
  snowy: snowyImage,
};

export default function WeatherCard({ weather, unit, city }) {
  function getWeatherDescription(code) {
    if (code === 0) return "Ensolarado";
    if (code === 1) return "Predominantemente limpo";
    if (code === 2) return "Parcialmente nublado";
    if (code === 3) return "Nublado";

    if (code === 45) return "Neblina";
    if (code === 48) return "Neblina congelante";

    if (code === 51) return "Chuvisco leve";
    if (code === 53) return "Chuvisco moderado";
    if (code === 55) return "Chuvisco intenso";

    if (code === 56) return "Chuvisco congelante leve";
    if (code === 57) return "Chuvisco congelante intenso";

    if (code === 61) return "Chuva leve";
    if (code === 63) return "Chuva moderada";
    if (code === 65) return "Chuva intensa";

    if (code === 66) return "Chuva congelante leve";
    if (code === 67) return "Chuva congelante intensa";

    if (code === 71) return "Neve leve";
    if (code === 73) return "Neve moderada";
    if (code === 75) return "Neve intensa";

    if (code === 77) return "Grãos de neve";

    if (code === 80) return "Pancadas de chuva leves";
    if (code === 81) return "Pancadas de chuva moderadas";
    if (code === 82) return "Pancadas de chuva intensas";

    if (code === 85) return "Pancadas de neve leves";
    if (code === 86) return "Pancadas de neve intensas";

    if (code === 95) return "Tempestade";
    if (code === 96) return "Tempestade com granizo leve";
    if (code === 97) return "Tempestade intensa";
    if (code === 99) return "Tempestade com granizo intenso";

    return "Condição desconhecida";
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  const group = weather ? getWeatherGroup(weather.current.weather_code) : null;

  return (
    <section className="weather-card">
      <h2 className="weather-card__city">{city}</h2>

      <p className="weather-card__date">
        {weather ? formatDate(weather.current.time) : "..."}
      </p>

      {weather && (
        <img
          className="weather-card__image"
          src={weatherImages[group]}
          alt={getWeatherDescription(weather.current.weather_code)}
        />
      )}

      <p className="weather-card__temperature">
        {weather
          ? `${convertTemperature(weather.current.temperature_2m, unit)}°${unit}`
          : "..."}
      </p>

      <p className="weather-card__condition">
        {weather ? getWeatherDescription(weather.current.weather_code) : "..."}
      </p>

      <p className="weather-card__feels">
        Sensação de{" "}
        {weather
          ? `${convertTemperature(weather.current.apparent_temperature, unit)}°${unit}`
          : "..."}
      </p>

      <p className="weather-card__range">
        Máx.{" "}
        {weather
          ? `${convertTemperature(weather.daily.temperature_2m_max[0], unit)}°${unit}`
          : "..."}
        {" · "}
        Mín.{" "}
        {weather
          ? `${convertTemperature(weather.daily.temperature_2m_min[0], unit)}°${unit}`
          : "..."}
      </p>

      <div className="weather-card__sun">
        <div className="weather-card__sun-line"></div>

        <div className="weather-card__sun-times">
          <span>
            🌅 {weather ? weather.daily.sunrise[0].slice(11, 16) : "..."}
          </span>
          <span>
            🌇 {weather ? weather.daily.sunset[0].slice(11, 16) : "..."}
          </span>
        </div>
      </div>
    </section>
  );
}
