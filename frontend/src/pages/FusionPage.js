import { useState } from "react";
import "../styles/FusionPage.css";

// 🔥 GET DATA FROM LOCAL STORAGE
const getFusionInputs = () => {
  const image = JSON.parse(localStorage.getItem("imageResult"));
  const text = JSON.parse(localStorage.getItem("textResult"));
  const sensor = JSON.parse(localStorage.getItem("sensorResult"));

  return {
    image_confidence: image ? image.confidence : 0,
    text_confidence: text ? text.confidence : 0,
    sensor_detected: sensor ? sensor.detected : 0
  };
};

function FusionPage() {
  const [steps, setSteps] = useState([]);
  const [finalRisk, setFinalRisk] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 FOR DISPLAY PURPOSE
  const fusionInputs = getFusionInputs();

  const runFusion = async () => {
    setSteps([]);
    setFinalRisk(null);
    setLoading(true);

    const dynamicInputs = getFusionInputs();

    console.log("🔥 Dynamic Inputs:", dynamicInputs);

    // UI animation
    setTimeout(() => setSteps(s => [...s, "🖼 Image risk vector received"]), 500);
    setTimeout(() => setSteps(s => [...s, "📝 Text risk features received"]), 1200);
    setTimeout(() => setSteps(s => [...s, "📡 Sensor risk metrics received"]), 1900);
    setTimeout(() => setSteps(s => [...s, "🧠 Multimodal feature alignment completed"]), 2600);
    setTimeout(() => setSteps(s => [...s, "⚖️ Fusion weighting & confidence calibration"]), 3300);

    try {
      const response = await fetch("http://localhost:5000/fusion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dynamicInputs)   // ✅ FIXED
      });

      const data = await response.json();

      console.log("📥 Fusion Response:", data);

      setTimeout(() => {
        setSteps(s => [...s, "✅ Unified Disaster Risk Score generated"]);

        setFinalRisk({
          disaster:
            dynamicInputs.sensor_detected === 1
              ? "Disaster Detected"
              : "Normal",   // ✅ FIXED

          level: data.alert_level,
          score: data.risk_score.toFixed(2),
          confidence: (data.risk_score * 100).toFixed(0) + "%",

          recommendation:
            data.alert_level === "HIGH"
              ? "Immediate evacuation & emergency response"
              : data.alert_level === "MEDIUM"
              ? "Stay alert and monitor situation"
              : "No immediate danger"
        });

        setLoading(false);
      }, 4000);

    } catch (error) {
      console.error("❌ Fusion Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="fusion-page-bg">
      <div className="fusion-dashboard">

        <h1>Multimodal Fusion Intelligence Engine</h1>
        <p className="subtitle">
          Unified decision-making using Image, Text & Sensor intelligence
        </p>

        <button onClick={runFusion} className="fusion-btn">
          {loading ? "Processing..." : "Run Fusion"}
        </button>

        {/* 🔥 LIVE VALUES */}
        <div className="fusion-sources">
          <div className="fusion-card image">
            <h3>🖼 Image Intelligence</h3>
            <span>Risk Score: {fusionInputs.image_confidence}</span>
          </div>

          <div className="fusion-card text">
            <h3>📝 Text Intelligence</h3>
            <span>Risk Score: {fusionInputs.text_confidence}</span>
          </div>

          <div className="fusion-card sensor">
            <h3>📡 Sensor Intelligence</h3>
            <span>Risk Score: {fusionInputs.sensor_detected}</span>
          </div>
        </div>

        {/* STATUS */}
        {steps.length > 0 && (
          <div className="fusion-status">
            <h3>Fusion Processing Status</h3>
            <ul>
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {/* RESULT */}
        {finalRisk && (
          <div className="fusion-result">
            <h3>Unified AI Decision Output</h3>

            <div className="fusion-grid">
              <div>
                <span>Detected Disaster</span>
                <b>{finalRisk.disaster}</b>
              </div>

              <div>
                <span>Risk Level</span>
                <b className={finalRisk.level.toLowerCase()}>
                  {finalRisk.level}
                </b>
              </div>

              <div>
                <span>Unified Risk Score</span>
                <b>{finalRisk.score}</b>
              </div>

              <div>
                <span>Confidence</span>
                <b>{finalRisk.confidence}</b>
              </div>
            </div>

            <div className="fusion-recommendation">
              🚨 <b>AI Recommendation:</b> {finalRisk.recommendation}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default FusionPage;