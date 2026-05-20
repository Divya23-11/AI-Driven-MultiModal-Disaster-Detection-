@app.route("/predict/image", methods=["POST"])
def image_predict():
    return {
        "disaster": "Flood",
        "severity": "High",
        "confidence": "87%"
    }
