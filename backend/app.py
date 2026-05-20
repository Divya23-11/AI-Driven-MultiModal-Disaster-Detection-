from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import numpy as np

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# IMPORT ROUTES
from routes.text_api import register_text_routes
from routes.sensor_api import register_sensor_routes

# -------------------------------
# 1️⃣ Create Flask App
# -------------------------------
app = Flask(__name__)
CORS(app)

# -------------------------------
# 2️⃣ Register APIs
# -------------------------------
register_text_routes(app)
register_sensor_routes(app)

# -------------------------------
# 3️⃣ Configurations
# -------------------------------
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# -------------------------------
# 4️⃣ Load IMAGE MODEL
# -------------------------------
image_model = load_model("models/image_model.h5")

with open("models/class_indices.json", "r") as f:
    class_indices = json.load(f)

classes = list(class_indices.keys())

# -------------------------------
# 5️⃣ IMAGE API
# -------------------------------
@app.route("/analyze-image", methods=["POST"])
def analyze_image():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(filepath)

    img = image.load_img(filepath, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0

    prediction = image_model.predict(img_array)

    predicted_class = classes[np.argmax(prediction)]
    confidence = float(np.max(prediction))

    return jsonify({
        "disaster_type": predicted_class,
        "confidence": confidence
    })

# -------------------------------
# 6️⃣ FUSION API
# -------------------------------
@app.route("/fusion", methods=["POST"])
def fusion():
    data = request.get_json()

    image_conf = data.get("image_confidence", 0)
    text_conf = data.get("text_confidence", 0)
    sensor_flag = data.get("sensor_detected", 0)

    risk_score = (0.4 * image_conf) + (0.4 * text_conf) + (0.2 * sensor_flag)

    if risk_score > 0.7:
        level = "HIGH"
    elif risk_score > 0.4:
        level = "MEDIUM"
    else:
        level = "LOW"

    return jsonify({
        "risk_score": risk_score,
        "alert_level": level
    })

# -------------------------------
# 7️⃣ Run Server
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)