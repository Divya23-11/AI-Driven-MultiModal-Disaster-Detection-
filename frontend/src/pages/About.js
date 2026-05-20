import "../styles/AboutPage.css";
import drought from "../assets/drought.png";
import flood from "../assets/Floods.png";
import earthquake from "../assets/earthquakes.png";
import Fireurban from "../assets/Fire_urban.png";
import wildfire from "../assets/wildfire.png";
import landslide from "../assets/landslide.png";
import sample1 from "../assets/sample1.png"; // adjust name if jpg
import cnn from "../assets/cnn.png";
import nlp from "../assets/nlp.png";
import ml from "../assets/ml.png";
import sample2 from "../assets/sample2.png";
function AboutPage() {
  return (
    <div className="about-page-bg">
      <div className="about-container">

        <h1>About the Project</h1>
        <p className="about-subtitle">
          AI-Driven Multimodal Disaster Detection and Response System
        </p>

        {/* OVERVIEW */}
        <section className="about-card overview-flex">

  <div className="overview-image">
    <img src={sample1} alt="AI Disaster System" />
  </div>

  <div className="overview-text">
    <h2>📌 Project Overview</h2>

    <p>
      This project presents an AI-driven multimodal system designed to detect disasters 
      using image data, text information, and environmental sensor inputs.By integrating multiple data sources, the system improves prediction accuracy 
      and reduces false alarms compared to traditional single-source systems.It identifies disasters such as floods, droughts, earthquakes, fires, and landslides 
      in real time using intelligent models. A multimodal fusion engine combines outputs from all modules to generate a 
      unified disaster risk score. The system supports early warning, faster decision-making, and efficient 
      emergency response for disaster management.
    </p>
  </div>

</section>
        {/* DISASTER TYPES */}
        <section className="about-card highlight">
          <h2>🌍 Disasters Covered in Our System</h2>

          <div className="disaster-grid">

            <div className="disaster-card">
              <img src={drought} alt="drought"/>
              <h4>Drought</h4>
            </div>

            <div className="disaster-card">
              <img src={flood} alt="flood"/>
              <h4>Flood</h4>
            </div>

            <div className="disaster-card">
              <img src={earthquake} alt="earthquake"/>
              <h4>Earthquake</h4>
            </div>

            <div className="disaster-card">
              <img src={Fireurban} alt="urban fire"/>
              <h4>Fire Urban</h4>
            </div>

            <div className="disaster-card">
              <img src={wildfire} alt="wildfire"/>
              <h4>Wildfire</h4>
            </div>

            <div className="disaster-card">
              <img src={landslide} alt="landslide"/>
              <h4>Landslide</h4>
            </div>

          </div>
        </section>

        {/* MODULES */}
        <section className="about-card">
          <h2>⚙ System Modules</h2>

          <div className="module-grid">

            <div>
              <h4>Image Module</h4>
               <div className="disaster-card">
              <img src={cnn} alt="drought"/>
            </div>
              <p>Detects disasters from images using CNN.</p>
            </div>

            <div>
              <h4>Text Module</h4>
               <div className="disaster-card">
              <img src={nlp} alt="drought"/>
            </div>
              <p>Analyzes alerts & messages using NLP.</p>
            </div>

            <div>
              <h4>Sensor Module</h4>
               <div className="disaster-card">
              <img src={ml} alt="drought"/>
            </div>
              <p>Predicts risk using environmental data.</p>
            </div>

          </div>
        </section>
  <section className="about-card highlight">
  <h2>💻 Technologies Used</h2>

  <div className="disaster-card">
              <img src={sample2} alt="sample2"/>
            </div>

</section>


      </div>
    </div>
  );
}

export default AboutPage;