import { useState } from "react";

import axios from "axios";

import "../assets/styles/Home.css";

export function Home() {
  const [city, setCity] = useState("City");
  const [country, setCountry] = useState("Country");
  const [weather, setWeather] = useState("Sunny");
  const [temp, setTemp] = useState("15");
  const [input, setInput] = useState("");
  const [unit, setUnit] = useState("metric");

  var data = new Date();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  async function getWeather(city, unidade) {
    try {
      let weather = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
            units: unidade,
          },
        }
      );
      let tempStr = JSON.stringify(weather.data.main.temp);
      setTemp(tempStr.replace(".", ","));
      setWeather(weather.data.weather[0].main);
      setCity(weather.data.name);
      setCountry(weather.data.sys.country);
    } catch {
      alert("Check your input!");
    }
  }

  async function handleSearchClick() {
    await getWeather(input, unit);
    setInput("");
  }

  return (
    <div className="main-container">
      <header>
        <input
          type="text"
          placeholder="City, State or Country"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button onClick={handleSearchClick}>Search</button>
      </header>
      <div className="information-container">
        <h2 className="location" onClick={getWeather}>
          {city}, {country}
        </h2>
        <p>{`${
          months[data.getMonth()]
        }  ${data.getDate()}, ${data.getFullYear()}`}</p>
        <div className="container-degrees">
          <span>{temp}°C</span>
        </div>
        <h2>{weather}</h2>
      </div>
    </div>
  );
}
