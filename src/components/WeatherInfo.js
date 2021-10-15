import axios from "axios";
import { useEffect, useState } from "react";
import { Weather_Api_Key } from "./ApiKey";
function WeatherInfo() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState("");
    const [weather_img, setWeather_img] = useState("");
    const [temperature, setTemperature] = useState(0);
    const [cityName, setCityName] = useState("");
  
    const savePositionToState = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };
    const fetchWeather = async () => {
      try {
        window.navigator.geolocation.getCurrentPosition(
              savePositionToState
          );
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Weather_Api_Key}&units=metric`
        ); 
        setTemperature(res.data.main.temp);
        setCityName(res.data.name);
        setWeather(res.data.weather[0].main);
        setWeather_img(
          'http://openweathermap.org/img/w/'+res.data.weather[0].icon+'.png'
         ) 
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      fetchWeather();
    }, [latitude, longitude]);
  
    return (
      <div>
      <div className="weather_info">
        <div className="weather_info__container"> 
          <div className="row-flex">
          <h2><img src={weather_img}  alt= {weather}/></h2> <h2> {temperature}ºC</h2>
          </div> 
          <h1>  {cityName}</h1>
        </div>
      </div>
      </div>
    );
  }
  export default WeatherInfo;  