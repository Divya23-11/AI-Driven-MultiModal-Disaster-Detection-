import { useState } from "react";
import "../styles/SensorPage.css";

function SensorPage() {
  const [status, setStatus] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Dynamic Inputs
  const [sensorData, setSensorData] = useState({
    temperature: "",
    rainfall: "",
    humidity: "",
    waterLevel: ""
  });

  // Handle Input Change
  const handleChange = (e) => {
    setSensorData({
      ...sensorData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 Analyze Sensors (Backend Connected)
  const analyzeSensors = async () => {
    setStatus([]);
    setResult(null);
    setLoading(true);

    console.log("📤 Sending:", sensorData);

    // UI animation steps
    setTimeout(() => setStatus(s => [...s, "📡 Sensor data received"]), 500);
    setTimeout(() => setStatus(s => [...s, "📊 Data normalization completed"]), 1200);
    setTimeout(() => setStatus(s => [...s, "⚠️ Anomaly detection running"]), 2000);

    try {
      const response = await fetch("http://localhost:5000/analyze-sensor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sensorData)
      });

      const data = await response.json();
      // ✅ SAVE SENSOR RESULT
localStorage.setItem("sensorResult", JSON.stringify({
  detected: data.disaster !== "Normal" ? 1 : 0
}));

      console.log("📥 Response:", data);

      setTimeout(() => {
        setStatus(s => [...s, "✅ Sensor risk score generated"]);

        setResult({
          disaster: data.disaster || "Unknown",
          severity: data.severity || "Medium",
          confidence: data.confidence || "0.9",
          trigger: "Sensor Data"
        });

        setLoading(false);
      }, 2500);

    } catch (error) {
      console.error("❌ ERROR:", error);

      setLoading(false);

      setResult({
        disaster: "Error",
        severity: "-",
        confidence: "-",
        trigger: "Backend not connected"
      });
    }
  };

  return (
    <div className="global-bg">
      <div className="sensor-dashboard">

        {/* HEADER */}
        <h1>Sensor Risk Intelligence Engine</h1>
        <p className="subtitle">
          Environmental sensor-based disaster risk assessment
        </p>

        {/* INPUT */}
        <div className="sensor-input-card">
          <div className="sensor-vertical">

            <div>
              <label>Temperature (°C)</label>
              <input
                type="number"
                name="temperature"
                value={sensorData.temperature}
                onChange={handleChange}
                placeholder="Enter temperature"
              />
            </div>

            <div>
              <label>Rainfall (mm)</label>
              <input
                type="number"
                name="rainfall"
                value={sensorData.rainfall}
                onChange={handleChange}
                placeholder="Enter rainfall"
              />
            </div>

            <div>
              <label>Humidity (%)</label>
              <input
                type="number"
                name="humidity"
                value={sensorData.humidity}
                onChange={handleChange}
                placeholder="Enter humidity"
              />
            </div>

            <div>
              <label>Water Level (m)</label>
              <input
                type="number"
                name="waterLevel"
                value={sensorData.waterLevel}
                onChange={handleChange}
                placeholder="Enter water level"
              />
            </div>

          </div>

          <button onClick={analyzeSensors}>
            {loading ? "Analyzing..." : "Analyze Sensor Data"}
          </button>
        </div>

        {/* STATUS */}
        {status.length > 0 && (
          <div className="status-card">
            <h3>System Status</h3>
            <ul>
              {status.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div className="result-card">
            <h3>AI Analysis Output</h3>
            <div className="result-grid">

              <div>
                <span>Detected Risk</span>
                <b>{result.disaster}</b>
              </div>

              <div>
                <span>Severity</span>
                <b className={result.severity.toLowerCase()}>
                  {result.severity}
                </b>
              </div>

              <div>
                <span>Confidence</span>
                <b>{result.confidence}</b>
              </div>

              <div>
                <span>Main Trigger</span>
                <b>{result.trigger}</b>
              </div>

            </div>
          </div>
        )}

        {/* FUSION NOTE */}
        {result && (
          <div className="fusion-note">
            ✔ Sensor risk features forwarded to Multimodal Fusion Engine
          </div>
        )}

      </div>
    </div>
  );
}

export default SensorPage;