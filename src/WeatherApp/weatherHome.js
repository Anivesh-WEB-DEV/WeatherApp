import React, {  useState } from 'react';
import axios from 'axios';
import './weatherHome.css';
// import search from '../IMG/search_Icon.png';
// import clouds from '../IMG/1clouds-.png';
// import humidity from '../IMG/Humidity.png';
// import wind from '../IMG/wind.png';
// import clear from '../IMG/clear.png';
// import mist from '../IMG/mist.png';
// import rain from '../IMG/rain.png';
// import drizzle from '../IMG/drizzle.png';




const WeatherHome = () => {
 const [data, setData] = useState({
  celcius:10,
  name: 'London',
  min: 5,
  max: 20,
  weather: 'Cloudy',
  country: "GB",
  humidity: 10,
  speed: 2,
  image: '/IMG/1clouds-.png'
 })

 const [name, setName] = useState('');
 const [error, setError] = useState('');


 const handleClick = () => {
  if(name !== ""){
 
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=16f1db8b9338a87d910f1a98966da8e5&&units=metric`
    const res = axios.get(apiUrl)
   .then(res => {
    let imagePath = '';
    if(res.data.weather[0].main == 'Clouds'){
     imagePath = '/IMG/1clouds-.png'
    } else if(res.data.weather[0].main == 'Clear'){
     imagePath = '/IMG/clear.png'
    } else if(res.data.weather[0].main == 'Rain'){
     imagePath = '/IMG/rain.png'
    } else if(res.data.weather[0].main == 'Drizzle'){
     imagePath = '/IMG/drizzle.png'
    } else if(res.data.weather[0].main == 'Mist'){
     imagePath = '/IMG/mist.png'
    } else {
     imagePath ='/IMG/1clouds-.png'
    }
    console.log(res.data)
    setData({...data , celcius : res.data.main.temp, name: res.data.name, 
    humidity : res.data.main.humidity, speed: res.data.wind.speed,
    image: imagePath, weather: res.data.weather[0].description, 
    min: res.data.main.temp_min, max: res.data.main.temp_max, country: res.data.sys.country
})
setError('');

   })
   .catch(err => {
    if(err.response.status == 404){
      setError("Invalid City Name")
    } else{
    setError('');
    }
     console.log(err)
   });
  //  console.log(res)
  }
 }

 

  return (
    <div className='container'>
      <div className="weather">
       <div className="search">
        <input type="text" spellcheck="false" placeholder='Enter City Name' onChange={e=> setName(e.target.value)}
          onKeyDown={e=>{
            if(e.key === 'Enter'){
              handleClick();
            }
          }}
        />
        <button><img src='/IMG/search_Icon.png' alt="" onClick={handleClick}/></button>
       </div>
       <div className="error">
        <p>{error}</p>
       </div>
       <div className="winfo">
        <img src={data.image} alt="" className='weatherimg' />
        <p>{data.weather}</p>
        <h1>{Math.round(data.celcius)}°c</h1>
        <p> Min↓ {Math.round(data.min)}°c &nbsp; &nbsp;  Max↑ {Math.round(data.max)}°c </p>
        <h2>{data.name} - {data.country}</h2>
        <div className="details">
         <div className="col">
          <img src='/IMG/Humidity1.png'alt="" />
          <div className='humidity'>
           <p>{Math.round(data.humidity)}%</p>
           <p>Humidity</p>
          </div>
         </div>
         <div className="col">
         <img src='/IMG/windy.png' alt="" />
          <div className='wind'>
           <p>{Math.round(data.speed)} km/h</p>
           <p>Wind</p>
          </div>
         </div>
        </div>
        {/* <div>{data.weather} {data.name}</div> */}

       </div>
      </div>
    </div>
  )
}

export default WeatherHome;
