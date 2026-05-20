import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="ultra-home">

      {/* HERO SECTION */}
      <section className="ultra-hero">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>

        {/* 🔥 TITLE */}
        <h1 className="hero-title">
          AI-Driven Multimodal Disaster Detection <br />
          and Response System<br/>
        </h1>

        {/* TAGLINE */}
        <h3 className="hero-tagline">
          Early Detection • Risk Intelligence • Intelligent Response
        </h3>

        {/* DESCRIPTION */}
        <p className="hero-desc">
          A futuristic AI platform that fuses <b>Image</b>, <b>Text</b> and
          <b> Sensor data</b> to detect disasters early and drive intelligent
          emergency response.
        </p>

        {/* 🔥 BUTTONS */}
        <div className="hero-actions">
          <button
            className="neon-btn"
            onClick={() => navigate("/image")}
          >
            🚀 Start Detection
          </button>

          <button
            className="glass-btn"
            onClick={() => navigate("/about")}
          >
            Explore System
          </button>
        </div>
      </section>

    </div>
  );
}

export default Home;