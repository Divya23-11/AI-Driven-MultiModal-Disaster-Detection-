import { useEffect, useState } from "react";
import "../styles/WeatherPage.css";

function WeatherPage() {
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [risk, setRisk] = useState("");
  const [current, setCurrent] = useState(null);

  const API_KEY = "cd4d6778c265b5f2b4326cbc701a9135";

  useEffect(() => {
    getLocation();
  }, []);

  // 📍 CURRENT LOCATION BUTTON
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
      },
      () => alert("Location permission required")
    );
  };

  // 🔍 SEARCH CITY BUTTON
  const searchCity = async () => {
    if (!inputCity) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      setCity(data.city.name);
      processWeatherData(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🌦 FETCH BY COORDS
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();
      setCity(data.city.name);

      processWeatherData(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 PROCESS DATA
  const processWeatherData = (data) => {
    const now = new Date();

    setCurrent(data.list[0]);

    const nextIndex = data.list.findIndex(
      (item) => new Date(item.dt_txt) > now
    );

    const next5 = data.list.slice(nextIndex, nextIndex + 5);
    setHourly(next5);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);

    const nextDays = data.list.filter((item) => {
      const d = new Date(item.dt_txt);
      return (
        d.getDate() === tomorrow.getDate() ||
        d.getDate() === dayAfter.getDate()
      );
    });

    setDaily(nextDays);

    // 🔥 RISK
    const avgRain =
      next5.reduce((sum, item) => sum + (item.pop || 0), 0) /
      next5.length;

    let level = "LOW";
    if (avgRain > 0.7) level = "HIGH";
    else if (avgRain > 0.4) level = "MEDIUM";

    setRisk(level);
  };

  return (
    <div className="weather-page-bg">
      <div className="weather-dashboard">

        <h1>Weather Intelligence Engine</h1>
        <p className="subtitle">📍 {city}</p>

        {/* 🔥 OPTIONS */}
        <div className="weather-controls">

          {/* CURRENT LOCATION */}
          <button className="location-btn" onClick={getLocation}>
            📍 Use Current Location
          </button>

          {/* SEARCH */}
          <div className="weather-search">
            <input
              type="text"
              placeholder="Enter city..."
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
            />
            <button onClick={searchCity}>Search</button>
          </div>

        </div>

        {/* 🌤 CURRENT WEATHER */}
        {current && (
          <section className="weather-section">
            <h3>🌤 Current Weather</h3>
            <div className="current-weather">
              <h2>{current.main.temp.toFixed(1)}°C</h2>
              <p>{current.weather[0].main}</p>
              <span>Humidity: {current.main.humidity}%</span>
            </div>
          </section>
        )}

        {/* ⏱ NEXT 5 */}
        <section className="weather-section">
          <h3>⏱ Next 5 Time Slots</h3>
          <div className="forecast-row">
            {hourly.map((item, i) => (
              <ForecastCard
                key={i}
                time={new Date(item.dt_txt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
                temp={`${item.main.temp.toFixed(1)}°C`}
                condition={item.weather[0].main}
              />
            ))}
          </div>
        </section>

        {/* 📅 NEXT 2 DAYS */}
        <section className="weather-section">
          <h3>📅 Next 2 Days Forecast</h3>
          <div className="weather-grid">
            {daily.map((item, i) => (
              <div key={i} className="weather-card">
                <span>{new Date(item.dt_txt).toLocaleString()}</span>
                <b>{item.main.temp.toFixed(1)}°C</b>
                <p>{item.weather[0].main}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🚨 RISK */}
        <section className="weather-section">
          <h3>⚠ Weather Risk Analysis</h3>
          <div className={`weather-risk ${risk.toLowerCase()}`}>
            🌦 Risk Level: <b>{risk}</b>
          </div>
        </section>

      </div>
    </div>
  );
}

// 🌤 CARD
function ForecastCard({ time, temp, condition }) {
  const getIcon = () => {
    if (condition === "Rain") return "🌧";
    if (condition === "Clouds") return "☁";
    if (condition === "Thunderstorm") return "⛈";
    return "🌤";
  };

  return (
    <div className="forecast-card">
      <span>{time}</span>
      <div className="forecast-icon">{getIcon()}</div>
      <b>{temp}</b>
    </div>
  );
}

export default WeatherPage;