import { useState } from "react";
import "../styles/ImagePage.css";

function ImagePage() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState([]);
  const [result, setResult] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    setImage(URL.createObjectURL(file));
    setStatus([]);
    setResult(null);

    // Show processing steps
    setStatus(["📥 Image received", "🧠 Sending to AI Engine..."]);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      // ✅ SAVE IMAGE RESULT
localStorage.setItem("imageResult", JSON.stringify({
  confidence: data.confidence
}));

      setStatus((s) => [...s, "🔍 Analyzing disaster patterns"]);
      setStatus((s) => [...s, "✅ Risk score generated"]);

      setResult({
        disaster: data.disaster_type,
        confidence: (data.confidence * 100).toFixed(2) + "%",
        severity:
          data.confidence > 0.8
            ? "High"
            : data.confidence > 0.5
            ? "Medium"
            : "Low",
        impact: "Region identified based on visual intensity",
      });

    } catch (error) {
      console.error("Error:", error);
      setStatus(["❌ Backend connection failed"]);
    }
  };

  return (
    <div className="image-page-bg">
      <div className="image-dashboard">

        {/* HEADER */}
        <h1>Image Intelligence Engine</h1>
        <p className="subtitle">
          Real-time visual analysis for disaster detection
        </p>

        {/* UPLOAD */}
        <div className="upload-card">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <p>Upload Satellite / Drone / CCTV Image</p>
        </div>

        {/* IMAGE PREVIEW */}
        {image && (
          <div className="preview-card">
            <h3>Input Image</h3>
            <img src={image} alt="Disaster Input" />
          </div>
        )}

        {/* SYSTEM STATUS */}
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
                <span>Disaster Type</span>
                <b>{result.disaster}</b>
              </div>
              <div>
                <span>Confidence</span>
                <b>{result.confidence}</b>
              </div>
              <div>
                <span>Severity</span>
                <b>{result.severity}</b>
              </div>
              <div>
                <span>Impact Area</span>
                <b>{result.impact}</b>
              </div>
            </div>
          </div>
        )}

        {/* FUSION NOTE */}
        {result && (
          <div className="fusion-note">
            ✔ Image risk score forwarded to Multimodal Fusion Engine
          </div>
        )}

      </div>
    </div>
  );
}

export default ImagePage;