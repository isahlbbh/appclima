export async function getWeather(city) {
    
    const coordinates = {
  Brasília: { latitude: -15.79, longitude: -47.88 },
  'São Paulo': { latitude: -23.55, longitude: -46.63 },
  Recife: { latitude: -8.05, longitude: -34.88 },
}
  const selectedCoordinates = coordinates[city]

  const response = await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${selectedCoordinates.latitude}&longitude=${selectedCoordinates.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,weather_code&hourly=precipitation_probability,temperature_2m,weather_code&timezone=America%2FSao_Paulo`  )

  if (!response.ok){
    throw new Error('Nao foi possivel buscar o clima')
  }

  const data = await response.json()

  return data
}