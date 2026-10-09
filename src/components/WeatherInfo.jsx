import '../styles/weather-info.css'
import { getCurrentHourIndex } from '../utils/weather'

export default function WeatherInfo({ weather }) {
  const currentHourIndex = getCurrentHourIndex(weather)

  return (
    <section className="weather-info">
      <div className="weather-info__card">
        <h3 className="weather-info__title">Umidade</h3>

        <p className="weather-info__value">
          {weather ? `${weather.current.relative_humidity_2m}%` : '...'}
        </p>
      </div>

      <div className="weather-info__card">
        <h3 className="weather-info__title">Vento</h3>

        <p className="weather-info__value">
          {weather ? `${weather.current.wind_speed_10m} km/h` : '...'}
        </p>
      </div>

      <div className="weather-info__card">
        <h3 className="weather-info__title">Índice UV</h3>

        <p className="weather-info__value">
          {weather ? weather.daily.uv_index_max[0] : '...'}
        </p>
      </div>

      <div className="weather-info__card">
        <h3 className="weather-info__title">Chance de chuva</h3>

        <p className="weather-info__value">
          {weather ? `${weather.hourly.precipitation_probability[currentHourIndex]}%` : '...'}
        </p>
      </div>
    </section>
  )
}