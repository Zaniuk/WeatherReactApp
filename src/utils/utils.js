export const parseTime = (date) => {
    const time = new Date(date)
    const hours = time.getHours()
    let minutes = time.getMinutes()
    if(minutes < 10){
        let aux = minutes
        minutes = String('0'+aux)
    }
    return `${hours}:${minutes}`
}

