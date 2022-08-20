import React, { useEffect, useState } from 'react';
import { parseTime } from '../../utils/utils';
import {TbTemperature} from 'react-icons/tb';
import {TiWeatherWindyCloudy} from 'react-icons/ti';
import {WiHumidity} from 'react-icons/wi'
export default function Weather() {
  const [temp, setTemp] = useState(0);
  const [feels, setFeels] = useState(0);
  const [stateDesc, setStateDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [windSpeed, setWindSpeed] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [city, setCity] = useState('');
  const [time, setTime] = useState(parseTime(new Date()));
  useEffect(() => {
    setTimeout(() => {
      setTime(parseTime(new Date()))
    }, 30000);
    const sucess = (position) => {
      const { latitude, longitude } = position.coords;
      uri = `https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${latitude}&lon=${longitude}&appid=${key}`;
    }
    const error = () => {
      console.log('Unable to get location')
    }
    navigator.geolocation.getCurrentPosition(sucess, error);
    const key = '7931869ca227fbe4b9aca2ff4bb36cc0';
    const lat = -34.6812637;
    const lon = -58.7535342;
    let uri = `https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${lat}&lon=${lon}&appid=${key}`;

    fetch(uri)
      .then(res => res.json())
      .then(res => {
        const { main, weather } = res;
        const {name} = res
        const currentTemp = main.temp;
        const {humidity} = main;
        const {speed} = res.wind
        const currentFeels = main.feels_like;
        const icon = weather[0].icon;
        setTemp(currentTemp);
        setFeels(currentFeels);
        setStateDesc(weather[0].description.toUpperCase());
        setIcon(`http://openweathermap.org/img/wn/${icon}@4x.png`);
        setWindSpeed(speed);
        setHumidity(humidity);
        setCity(name.toUpperCase())
      })
  }, [])
  return (
    <div className='weather-wrapper'>
      <img src={icon} alt="Weather Icon" />
      <p>{stateDesc}</p>
      <h1>{time}</h1>
      <h2 className='city'>{city}</h2>
      <div className='stats-wrapper'>
        <p className='stat'><span className="icon"><TbTemperature/></span> <span>{Math.round(temp)}°C </span><span>({Math.round(feels)}°C)</span></p>
        <p className='stat'><span className="icon"><TiWeatherWindyCloudy/></span> {windSpeed}km/h </p>
        <p className='stat'><span className="icon"><WiHumidity/></span> {humidity}%</p>
      </div>
    </div>
  );
}

