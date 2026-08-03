import pandas as pd
import joblib
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error,
)

# ===========================
# LOAD DATASET
# ===========================

df = pd.read_csv("../dataset/fertilizer_dataset.csv")

# ===========================
# INPUT FEATURES
# ===========================

X = df.drop(
    columns=[
        "yield_ton_per_ha",
        "profit",
        "revenue",
        "environmental_score",
        "sustainability"
    ]
)

# Target
y = df["yield_ton_per_ha"]

# ===========================
# CATEGORICAL & NUMERICAL
# ===========================

categorical_features = X.select_dtypes(include=["object"]).columns.tolist()

numerical_features = X.select_dtypes(exclude=["object"]).columns.tolist()

# ===========================
# PREPROCESSOR
# ===========================

preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features
        ),
        (
            "num",
            "passthrough",
            numerical_features
        )
    ]
)

# ===========================
# RANDOM FOREST
# ===========================

model = RandomForestRegressor(
    n_estimators=200,
    max_depth=20,
    random_state=42,
    n_jobs=-1
)

pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model)
    ]
)

# ===========================
# TRAIN / TEST SPLIT
# ===========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ===========================
# TRAIN
# ===========================

pipeline.fit(X_train, y_train)

# ===========================
# PREDICT
# ===========================

predictions = pipeline.predict(X_test)

# ===========================
# METRICS
# ===========================

r2 = r2_score(y_test, predictions)
mae = mean_absolute_error(y_test, predictions)
rmse = mean_squared_error(y_test, predictions) ** 0.5

print("=" * 50)
print("MODEL PERFORMANCE")
print("=" * 50)

print(f"R² Score : {r2:.4f}")
print(f"MAE      : {mae:.4f}")
print(f"RMSE     : {rmse:.4f}")

# ===========================================
# PREDICTED VS ACTUAL
# ===========================================

plt.figure(figsize=(8,6))

plt.scatter(
    y_test,
    predictions,
    alpha=0.5
)

plt.plot(
    [y_test.min(), y_test.max()],
    [y_test.min(), y_test.max()],
    'r--'
)

plt.xlabel("Actual Yield")

plt.ylabel("Predicted Yield")

plt.title("Actual vs Predicted Yield")

plt.savefig("../evaluation/predicted_vs_actual.png")

plt.close()

# ===========================================
# FEATURE IMPORTANCE
# ===========================================

feature_names = pipeline.named_steps["preprocessor"].get_feature_names_out()

importance = pipeline.named_steps["model"].feature_importances_

importance_df = (
    pd.DataFrame({
        "Feature": feature_names,
        "Importance": importance
    })
    .sort_values(by="Importance", ascending=False)
)

top20 = importance_df.head(20)

plt.figure(figsize=(10,8))

plt.barh(top20["Feature"], top20["Importance"])

plt.title("Top 20 Most Important Features")

plt.tight_layout()

plt.savefig("../evaluation/feature_importance.png")

plt.close()

print("\nTop 10 Important Features")

print(top20.head(10))

# ===========================================
# RESIDUAL DISTRIBUTION
# ===========================================

residuals = y_test - predictions

plt.figure(figsize=(8,6))

plt.hist(
    residuals,
    bins=30
)

plt.title("Residual Error Distribution")

plt.xlabel("Prediction Error")

plt.ylabel("Frequency")

plt.savefig("../evaluation/residual_histogram.png")

plt.close()


metrics = pd.DataFrame({

    "Metric":[
        "R2",
        "MAE",
        "RMSE"
    ],

    "Value":[
        r2,
        mae,
        rmse
    ]

})

metrics.to_csv(
    "../evaluation/model_metrics.csv",
    index=False
)

comparison = pd.DataFrame({
    "Actual_Yield": y_test.values,
    "Predicted_Yield": predictions
})

comparison["Absolute_Error"] = (
    comparison["Actual_Yield"] -
    comparison["Predicted_Yield"]
).abs()

comparison.to_csv(
    "../evaluation/sample_predictions.csv",
    index=False
)

# ===========================
# SAVE MODEL
# ===========================

joblib.dump(pipeline, "../models/yield_prediction_model.pkl")


print("\n✅ Model saved successfully!")