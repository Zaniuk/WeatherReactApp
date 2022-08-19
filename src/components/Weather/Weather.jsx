import React, { useEffect, useState } from 'react';

export default function Weather() {
  const [temp, setTemp] = useState(0);
  const [feels, setFeels] = useState(0);
  const [stateDesc, setStateDesc] = useState('');
  const [icon, setIcon] = useState('');
  useEffect(() => {
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
        const currentTemp = main.temp;
        const currentFeels = main.feels_like;
        const icon = weather[0].icon;
        setTemp(currentTemp);
        setFeels(currentFeels);
        setStateDesc(weather[0].description);
        setIcon(`http://openweathermap.org/img/wn/${icon}@2x.png`);
      })
  }, [])
  return (
    <div>
      <img src={icon} alt="Weather Icon" />
      <p>{stateDesc}</p>
      <p>Temperatura: <span>{Math.round(temp)}°C</span></p>
      <p>Sensacion termica: <span>{Math.round(feels)}°C</span></p>
    </div>
  );
}

