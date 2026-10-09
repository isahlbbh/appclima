export function getCurrentHourIndex (weather) {
    if (!weather) return -1

    const currentHour = new Date().getHours().toString().padStart(2, '0')

    return weather.hourly.time.findIndex((time) => {
        return time.slice(11, 13) === currentHour
    })
}