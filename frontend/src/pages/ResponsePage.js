import "../styles/ResponsePage.css";

function ResponsePage() {
  return (
    <div className="response-page-bg">
      <div className="response-dashboard">

        <h1>AI-Driven Disaster Response & Precautions</h1>
        <p className="subtitle">
          Risk-based preventive actions and emergency response recommendations
        </p>

        {/* LOW RISK */}
        <div className="response-card low">
          <h2>🟢 Low Risk</h2>
          <ul>
            <li>✔ Continue routine environmental monitoring</li>
            <li>✔ Maintain sensor and surveillance systems</li>
            <li>✔ Update emergency contact information</li>
            <li>✔ No immediate action required</li>
          </ul>
        </div>

        {/* MEDIUM RISK */}
        <div className="response-card medium">
          <h2>🟡 Medium Risk</h2>
          <ul>
            <li>⚠ Issue early warning notifications</li>
            <li>⚠ Prepare emergency response teams</li>
            <li>⚠ Monitor weather and sensor trends closely</li>
            <li>⚠ Keep evacuation routes ready</li>
          </ul>
        </div>

        {/* HIGH RISK */}
        <div className="response-card high">
          <h2>🔴 High  Risk</h2>
          <ul>
            <li>🚨 Immediate evacuation of affected zones</li>
            <li>🚨 Deploy rescue and disaster response teams</li>
            <li>🚨 Activate emergency shelters</li>
            <li>🚨 Shut down power in high-risk areas</li>
            <li>🚨 Continuous AI-based monitoring</li>
          </ul>
        </div>

        {/* AI NOTE */}
        <div className="ai-note">
          Precautionary actions are generated based on the unified disaster
          risk score from the Multimodal Fusion Engine.
        </div>

      </div>
    </div>
  );
}

export default ResponsePage;
