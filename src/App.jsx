import './App.css'
import { useEffect, useState } from 'react'
import { getCurrentTime, getWeatherData } from './utils/utils'
import {WiHumidity} from 'react-icons/wi'
import {TbTemperature} from 'react-icons/tb'
import {FiWind} from 'react-icons/fi'
function App() {


  const [temp, setTemp] = useState(0)

  const [feels, setFeels] = useState(0)

  const [weatherIcon, setWeatherIcon] = useState('')

  const [desc, setDesc] = useState('')

  const [city, setCity] = useState('')

  const [humidity, setHumidity] = useState(0)

  const [time, setTime] = useState(getCurrentTime(new Date()))

  const [speed, setSpeed] = useState(0)
  const [location, setLocation] = useState('')

  useEffect(function () {
    // Get the user's location
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      setLocation(lat, lon)
    // Get the weather data
    getWeatherData(lat, lon).then(function (data) {
      setTemp(data.main.temp)
      setFeels(data.main.feels_like)
      setWeatherIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`)
      setDesc(data.weather[0].description)
      setCity(data.name)
      setHumidity(data.main.humidity)
      setSpeed(data.wind.speed)
    })
  })

    
      

    setTimeout(() => {
      setTime(getCurrentTime(new Date()))
    }, 60000)

    // getWeatherData().then(res => {
    //   const { main, weather, name, wind } = res
    //   const { temp, feels_like, humidity } = main
    //   const { icon, description } = weather[0]
    //   const {speed} = wind
      
    //   setTemp(Math.round(temp))

    //   setFeels(Math.round(feels_like))

    //   setWeatherIcon(`http://openweathermap.org/img/wn/${icon}@4x.png`)

    //   setDesc(description.toUpperCase())

    //   setCity(name)

    //   setHumidity(humidity)
      
    //   setSpeed(speed)
    // })
  }, [])

  return (
    <div className="App">
      <div className="weather-wrapper">
        <img src={weatherIcon} alt="" />
        <h1>{time}</h1>
        <h1>{city}</h1>
        <h1>{desc}</h1>
        <h1 className='temp'><TbTemperature/> {temp} °C ({feels}°C)</h1>
        <div className="stats">
          
          <span>
            <WiHumidity/>{humidity} %
          </span>
          <span>
            <FiWind/> {speed} km/h
            </span>
        </div>
      </div>
    </div>
  )
}

export default App
