import { useEffect, useState } from "react"

import { api } from "../services/api"

import "../assets/styles/Home.css"

export function Home() {
  const [city, setCity] = useState("City")
  const [country, setCountry] = useState("Country")
  const [weather, setWeather] = useState("Sunny")
  const [temp, setTemp] = useState("")
  const [input, setInput] = useState("")
  const [inputBackup, setInputBackup] = useState("London")
  const [unit, setUnit] = useState("metric")

  const data = new Date()
  const months = [
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
  ]

  useEffect(() => {
    getWeather("London", "metric")
  }, [])

  useEffect(() => {
    getWeather(inputBackup, unit)
  }, [unit])

  async function getWeather(city, unit) {
    try {
      const weather = await api.get("weather/", {
        params: {
          q: city,
          appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
          units: unit,
        },
      })
      let tempStr = JSON.stringify(weather.data.main.temp)
      setTemp(tempStr.replace(".", ","))
      setWeather(weather.data.weather[0].main)
      setCity(weather.data.name)
      setCountry(weather.data.sys.country)
    } catch {
      alert("Check your input!")
    }
  }

  async function handleSearchClick(event) {
    event.preventDefault()
    await getWeather(input, unit)
    setInputBackup(input)
    setInput("")
  }

  return (
    <div className="main-container">
      <form onSubmit={handleSearchClick}>
        <input
          type="text"
          placeholder="City, State or Country"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button type="submit">Search</button>
      </form>

      <div className="information-container">
        <h2 className="location">
          {city}, {country}
        </h2>
        <p>{`${
          months[data.getMonth()]
        }  ${data.getDate()}, ${data.getFullYear()}`}</p>
        <div className="container-degrees">
          <span>
            {temp}
            {unit === "imperial" ? "°F" : "°C"}
          </span>
        </div>
        <h2>{weather}</h2>
      </div>

      <div className="change-unit-container">
        <button
          onClick={() => setUnit("imperial")}
          className={unit === "imperial" ? "active" : {}}
        >
          Fahrenheit
        </button>
        <button
          onClick={() => setUnit("metric")}
          className={unit === "metric" ? "active" : {}}
        >
          Celsius
        </button>
      </div>
    </div>
  )
}
