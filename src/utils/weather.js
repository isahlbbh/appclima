export function getCurrentHourIndex (weather) {
    if (!weather) return -1

    const currentHour = weather.current.time.slice(0, 13)

    return weather.hourly.time.findIndex((time) => {
        return time.slice(0, 13) === currentHour    })
}