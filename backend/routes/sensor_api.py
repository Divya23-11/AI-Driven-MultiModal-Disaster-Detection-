from flask import request, jsonify
import joblib
import numpy as np

# -------------------------------
# Load Sensor Model
# -------------------------------
try:
    sensor_model = joblib.load("models/sensor_model.pkl")
    print("✅ Sensor model loaded successfully")
except Exception as e:
    print("❌ Error loading sensor model:", e)
    sensor_model = None

# -------------------------------
# Register Routes
# -------------------------------
def register_sensor_routes(app):

    @app.route("/analyze-sensor", methods=["POST"])
    def analyze_sensor():
        try:
            data = request.get_json()
            print("📥 Received:", data)

            # Extract values
            temp = float(data.get("temperature", 0))
            rainfall = float(data.get("rainfall", 0))
            humidity = float(data.get("humidity", 0))
            water = float(data.get("waterLevel", 0))

            input_data = np.array([[temp, rainfall, humidity, water]])

            # 🔥 HYBRID LOGIC (VERY IMPORTANT)
            if rainfall > 200 and water > 6:
                prediction = "Flood"
            elif rainfall <= 0 and temp > 40:
                prediction = "Drought"

            elif rainfall > 120 and humidity > 75:
                prediction = "Landslide"

            elif temp > 40 and humidity < 30:
                prediction = "Fire"

            
            elif rainfall == 0 and humidity < 40:
                prediction = "Earthquake"

            else:
                # fallback ML
                if sensor_model:
                    prediction = sensor_model.predict(input_data)[0]
                else:
                    prediction = "Normal"

            # 🔥 SEVERITY LOGIC
            if rainfall > 200 or water > 7:
                severity = "High"
            elif rainfall > 100:
                severity = "Medium"
            else:
                severity = "Low"

            result = {
                "disaster": str(prediction),
                "severity": severity,
                "confidence": 0.9
            }

            print("📤 Response:", result)

            return jsonify(result)

        except Exception as e:
            print("❌ ERROR:", e)
            return jsonify({
                "disaster": "Error",
                "severity": "-",
                "confidence": 0,
                "error": str(e)
            })