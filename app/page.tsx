"use client"

import { useState } from "react"
import { useEasterEggs } from "./hooks/useEasterEggs";

export default function Home() {
  const [location, setLocation] = useState("")
  const [temperature, setTemperature] = useState<number | null>(null)
  const [condition, setCondition] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { titleRef } = useEasterEggs(); 

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || ""

  const fetchWeather = async () => {
    if (!location) return

    setLoading(true)
    setError("")
    setTemperature(null)
    setCondition("")

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}`,
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || "Error fetching weather")
      }

      setTemperature(data.current.temp_c)
      setCondition(data.current.condition.text)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* <h1>Weather Checker</h1> */}
      <h1 ref={titleRef}>Weather Checker</h1>

      <div>
        <label htmlFor="txtLocation">Location: </label>
        <input
          id="txtLocation"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ margin: "10px 0", padding: "5px" }}
        />
      </div>

      <button onClick={fetchWeather} disabled={loading} style={{ padding: "5px 10px" }}>
        {loading ? "Fetching..." : "Get Weather"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {temperature !== null && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p>Temperature: {temperature}°C</p>
          </div>
          <div style={{ border: "1px solid #ccc", padding: "10px" }}>
            <p>Condition: {condition}</p>
          </div>
        </div>
      )}
    </div>
  )
}
