import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC

# -------------------------------
# 1️⃣ Load Dataset
# -------------------------------
try:
    df = pd.read_excel("text_related_data.xlsx")
except Exception as e:
    print("❌ Error loading Excel:", e)
    exit()

# 🔥 IMPORTANT FIX (handles spaces, caps issues)
df.columns = df.columns.str.strip().str.lower()

print("📌 Columns Found:", df.columns)

# -------------------------------
# 2️⃣ Validate Columns
# -------------------------------
if "text" not in df.columns or "label" not in df.columns:
    print("❌ Excel must contain 'text' and 'label'")
    print("❌ Found columns:", df.columns)
    exit()

print("✅ Dataset Loaded Successfully")
print("📊 Total Samples:", len(df))

# -------------------------------
# 3️⃣ Clean Data (IMPORTANT)
# -------------------------------
df = df.dropna()   # remove empty rows

X_text = df["text"].astype(str)
y = df["label"].astype(str)

# -------------------------------
# 4️⃣ NLP (TF-IDF)
# -------------------------------
vectorizer = TfidfVectorizer(
    ngram_range=(1, 2),
    max_features=5000,
    stop_words="english"
)

X = vectorizer.fit_transform(X_text)

print("✅ Text Vectorization Done")

# -------------------------------
# 5️⃣ Train Model (SVM 🔥)
# -------------------------------
model = LinearSVC()
model.fit(X, y)

print("✅ Model Trained Successfully")

# -------------------------------
# 6️⃣ Save Model
# -------------------------------
try:
    joblib.dump(model, "backend/models/text_model.pkl")
    joblib.dump(vectorizer, "backend/models/vectorizer.pkl")
    print("✅ Model Saved in backend/models/")
except Exception as e:
    print("❌ Error saving model:", e)

# -------------------------------
# 7️⃣ Test Predictions (VERY IMPORTANT)
# -------------------------------
test_samples = [
    "landslide due to heavy rain in mountains",
    "fire in city building",
    "river overflow flood situation",
    "earthquake shaking buildings",
    "drought due to no rainfall"
]

print("\n🔍 TESTING MODEL:\n")

for text in test_samples:
    vec = vectorizer.transform([text])
    pred = model.predict(vec)[0]
    print(f"Input: {text}")
    print(f"Prediction: {pred}\n")