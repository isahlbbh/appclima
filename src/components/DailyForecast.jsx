import '../styles/daily-forecast.css'
import { convertTemperature } from '../utils/temperature'

function getDayName(date) {
  return new Date(`${date}T12:00:00`)
    .toLocaleDateString('pt-BR', {
      weekday: 'short'
    })
    .replace('.', '')
    .replace(/^./, (letter) => letter.toUpperCase())
}

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

export default function DailyForecast({ weather, unit }) {
  return (
    <section className="daily-forecast">
      <h2>Próximos 7 dias</h2>

      {weather
        ? weather.daily.time.map((date, index) => {
            return (
              <div className="daily-forecast__item" key={date}>
                <span>
                  {getDayName(date)}
                </span>

                <span>
                  {getWeatherIcon(weather.daily.weather_code[index])}
                </span>

                <span>
                  {convertTemperature(weather.daily.temperature_2m_min[index], unit)}°
                  {' / '}
                  {convertTemperature(weather.daily.temperature_2m_max[index], unit)}°
                </span>
              </div>
            )
          })
        : '...'}
    </section>
  )
}