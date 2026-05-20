import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier

# Load dataset
df = pd.read_excel("sensor_data.xlsx")

X = df[["temperature", "rainfall", "humidity", "waterLevel"]]
y = df["disaster"]

# Train model
model = RandomForestClassifier()
model.fit(X, y)

# Save model
joblib.dump(model, "backend/models/sensor_model.pkl")

print("✅ Sensor model trained & saved")