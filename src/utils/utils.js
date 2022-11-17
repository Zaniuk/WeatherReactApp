export function getCurrentTime(date) {

    const time = new Date(date)

    const hours = time.getHours()

    let minutes = time.getMinutes()

    if (minutes < 10) {
        const aux = minutes;
        minutes = `0${aux}`
    }
    return `${hours}:${minutes}`
}

export async function getWeatherData(lat, lon) {
    const key = '7931869ca227fbe4b9aca2ff4bb36cc0'
    const uri = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&lat=${lat}&lon=${lon}&appid=${key}`

    const data = await fetch(uri).then(res => res.json())
    return data
}