"use client"

import { useState } from "react"

export default function Home() {
  const [localidad, setLocalidad] = useState("")
  const [temperatura, setTemperatura] = useState<number | null>(null)
  const [condicion, setCondicion] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Reemplaza esto con tu API key de WeatherAPI.com
  const API_KEY = process.env.WEATHER_API_KEY || ""

  const consultarClima = async () => {
    if (!localidad) return

    setLoading(true)
    setError("")
    setTemperatura(null)
    setCondicion("")

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(localidad)}`,
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || "Error al consultar el clima")
      }

      setTemperatura(data.current.temp_c)
      setCondicion(data.current.condition.text)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Consulta del Clima</h1>

      <div>
        <label htmlFor="txtLocalidad">Localidad: </label>
        <input
          id="txtLocalidad"
          type="text"
          value={localidad}
          onChange={(e) => setLocalidad(e.target.value)}
          style={{ margin: "10px 0", padding: "5px" }}
        />
      </div>

      <button onClick={consultarClima} disabled={loading} style={{ padding: "5px 10px" }}>
        {loading ? "Consultando..." : "Clima"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {temperatura !== null && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p>Temperatura: {temperatura}°C</p>
          </div>
          <div style={{ border: "1px solid #ccc", padding: "10px" }}>
            <p>Condición: {condicion}</p>
          </div>
        </div>
      )}
    </div>
  )
}