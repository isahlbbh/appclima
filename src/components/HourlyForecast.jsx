import '../styles/hourly-forecast.css'
import { convertTemperature } from '../utils/temperature'
import { getCurrentHourIndex } from '../utils/weather'

function getWeatherIcon(code) {
  if (code === 0) return '☀️'
  if (code === 1) return '🌤️'
  if (code === 2) return '⛅'
  if (code === 3) return '☁️'
  if (code >= 51 && code <= 67) return '🌧️'
  if (code >= 71 && code <= 86) return '❄️'
  if (code >= 95) return '⛈️'

  return '🌤️'
}

export default function HourlyForecast({ weather, unit }) {
  const currentHourIndex = getCurrentHourIndex(weather)

  const hours = [0, 1, 2, 3, 4, 5]

  return (
    <section className="hourly-forecast">
      <h2>Próximas horas</h2>

      <div className="hourly-forecast__items">
        {weather
          ? hours.map((offset) => {
              const index = currentHourIndex + offset

              return (
                <div className="hourly-forecast__item" key={offset}>
                  <span>
                    {weather.hourly.time[index].slice(11, 16)}
                  </span>

                  <span>
                    {getWeatherIcon(weather.hourly.weather_code[index])}
                  </span>

                  <strong>
                    {convertTemperature(weather.hourly.temperature_2m[index], unit)}°
                  </strong>
                </div>
              )
            })
          : '...'}
      </div>
    </section>
  )
}