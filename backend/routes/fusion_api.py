@app.route("/fusion", methods=["POST"])
def fusion():
    data = request.get_json()

    print("📥 Fusion Input:", data)   # DEBUG

    # Convert safely
    image_conf = float(data.get("image_confidence", 0))
    text_conf = float(data.get("text_confidence", 0))
    sensor_flag = float(data.get("sensor_detected", 0))

    # Fusion logic
    risk_score = (0.4 * image_conf) + (0.4 * text_conf) + (0.2 * sensor_flag)

    if risk_score > 0.7:
        level = "HIGH"
    elif risk_score > 0.4:
        level = "MEDIUM"
    else:
        level = "LOW"

    result = {
        "risk_score": round(risk_score, 2),
        "alert_level": level
    }

    print("📤 Fusion Output:", result)   # DEBUG

    return jsonify(result)