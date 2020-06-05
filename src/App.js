import React, { useState } from "react";
import axios from 'axios'
import "./App.css";

const api = {
  key: "db5fdcfaee3d85e07e4f03feecc2a9b2",
  base: "http://api.weatherstack.com/current",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState('');
  // const [city,setCity]=useState('')
  const search = (e) => {
    if (e.key === "Enter") {
      axios
        .get(`${api.base}?access_key=${api.key}&query=${query}`)
        .then((res) => {
          setQuery('');
          
          setWeather(res.data);
          
        });
        
    }
  };

  const datebuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year} `;
  };
  return (
    <div className={(typeof weather.current != "undefined")? ((weather.current.temperature> 16)? 'App warm':'App') : 'App'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          ></input>
        </div>
        {typeof weather.current != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.request.query}</div>
              <div className="date">{datebuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{weather.current.temperature}&deg;C</div>
              <div className="weather">{weather.current.weather_descriptions[0]}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
