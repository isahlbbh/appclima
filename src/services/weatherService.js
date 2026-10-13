export async function  getWeather(location) {
  const response = await fetch (
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,weather_code&hourly=precipitation_probability,temperature_2m,weather_code&timezone=America%2FSao_Paulo`
  )
  if (!response.ok) {
    throw new Error('Nao foi possivel buscar o clima')
  }

  const data = await response.json()

  return data
}

export async function searchCities(name) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=5&language=pt`
  )

  if (!response.ok) {
    throw new Error('Nao foi possivel buscar a cidade')
  }

  const data = await response.json()

  return data.results || []
}