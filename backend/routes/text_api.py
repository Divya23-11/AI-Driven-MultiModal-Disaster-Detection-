from flask import request, jsonify
import joblib
import numpy as np
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

# Load model
text_model = joblib.load("models/text_model.pkl")
vectorizer = joblib.load("models/vectorizer.pkl")

# -------------------------------
# Keyword Extraction
# -------------------------------
def extract_keywords(text, vectorizer, top_n=10):
    tfidf = vectorizer.transform([text])
    scores = tfidf.toarray()[0]

    words = np.array(vectorizer.get_feature_names_out())

    valid_indices = [i for i, w in enumerate(words) if len(w) > 3]

    scores = scores[valid_indices]
    words = words[valid_indices]

    top_indices = scores.argsort()[-top_n:][::-1]

    return words[top_indices].tolist()

# -------------------------------
# Register Route
# -------------------------------
def register_text_routes(app):

    @app.route("/analyze-text", methods=["POST"])
    def analyze_text():
        data = request.get_json()

        if not data or "text" not in data:
            return jsonify({"error": "No text provided"}), 400

        input_text = data["text"]
        text_lower = input_text.lower()

        # -------------------------------
        # 🔥 RULE-BASED BOOST (VERY IMPORTANT)
        # -------------------------------
        if "landslide" in text_lower or "rock" in text_lower or "mountain" in text_lower:
            prediction = "Landslide"

        elif "flood" in text_lower or "water" in text_lower or "river" in text_lower:
            prediction = "Floods"

        elif "fire" in text_lower and "forest" in text_lower:
            prediction = "Wild_Fire"

        elif "fire" in text_lower:
            prediction = "Fire_Disaster_Urban"

        elif "earthquake" in text_lower or "tremor" in text_lower:
            prediction = "Earthquake"

        elif "drought" in text_lower or "dry" in text_lower:
            prediction = "Drought"

        else:
            # ML fallback
            vec = vectorizer.transform([input_text])
            prediction = text_model.predict(vec)[0]

        # Keywords
        keywords = extract_keywords(input_text, vectorizer)

        return jsonify({
            "disaster_type": prediction,
            "confidence": 0.9,
            "keywords": keywords
        })