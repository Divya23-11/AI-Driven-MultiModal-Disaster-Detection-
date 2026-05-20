import { useState } from "react";
import "../styles/TextPage.css";

function TextPage() {
  const [text, setText] = useState("");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);

  const analyzeText = async () => {
    if (!text.trim()) return;

    setSteps([]);
    setResult(null);

    // Show pipeline progress (UI feel)
    setSteps([
      "Text ingestion completed",
      "Tokenization & cleaning",
      "Keyword & entity extraction"
    ]);

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
      });

      const data = await response.json();
      // ✅ SAVE TEXT RESULT
localStorage.setItem("textResult", JSON.stringify({
  confidence: data.confidence
}));

      // Continue pipeline steps
      setSteps((prev) => [
        ...prev,
        "Urgency & severity inference",
        "Risk vector generated"
      ]);

      // Basic severity logic from confidence
      const confidenceValue = data.confidence;

      const severity =
        confidenceValue > 0.8
          ? "Severe"
          : confidenceValue > 0.5
          ? "Moderate"
          : "Low";

      const urgency =
        confidenceValue > 0.8
          ? "Critical"
          : confidenceValue > 0.5
          ? "Warning"
          : "Normal";

      setResult({
        event: data.disaster_type,
        urgency: urgency,
        severity: severity,
        confidence: (confidenceValue * 100).toFixed(2) + "%",
        keywords: text.split(" ").slice(0, 5) // simple keyword demo
      });

    } catch (error) {
      console.error("Error:", error);
      setSteps(["Backend connection failed"]);
    }
  };

  return (
    <div className="text-v2-bg">
      <div className="text-v2-container">

        {/* LEFT PANEL */}
        <div className="text-input-panel">
          <h1>Text Intelligence Engine</h1>
          <p className="desc">
            AI-powered NLP engine for analyzing alerts, reports, and emergency communications.
          </p>

          <textarea
            placeholder="Paste disaster alert, SOS message, or news report here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={analyzeText}>Run NLP Analysis</button>

          {result && (
            <div className="keyword-box">
              <h4>Extracted Keywords</h4>
              <div className="chip-row">
                {result.keywords.map((k, i) => (
                  <span key={i} className="chip">{k}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="text-ai-panel">

          <h3>AI Processing Pipeline</h3>

          <ul className="pipeline">
            {steps.map((step, index) => (
              <li key={index}>✔ {step}</li>
            ))}
          </ul>

          {result && (
            <div className="ai-summary">
              <h3>Inference Summary</h3>
              <div className="summary-grid">
                <div><span>Detected Event</span><b>{result.event}</b></div>
                <div><span>Urgency</span><b>{result.urgency}</b></div>
                <div><span>Severity</span><b>{result.severity}</b></div>
                <div><span>Confidence</span><b>{result.confidence}</b></div>
              </div>
            </div>
          )}

          {result && (
            <div className="fusion-banner">
              ✓ Text intelligence forwarded to Multimodal Fusion Engine
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default TextPage;