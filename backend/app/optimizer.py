import pandas as pd
import numpy as np

from ml.config import CROPS
from app.ml_service import model


def optimize_fertilizer(data, step=10):
    crop = data["crop"]
    info = CROPS[crop]
    n_values = range(
        max(0, info["optimal_n"] - 40),
        info["optimal_n"] + 40 + 1,
        step
    )
    p_values = range(
        max(0, info["optimal_p"] - 25),
        info["optimal_p"] + 25 + 1,
        step
    )
    k_values = range(
        max(0, info["optimal_k"] - 25),
        info["optimal_k"] + 25 + 1,
        step
    )

    combos = [
        {**data, "nitrogen": n, "phosphorus": p, "potassium": k}
        for n in n_values
        for p in p_values
        for k in k_values
    ]

    df = pd.DataFrame(combos)

    predictions = model.predict(df)

    best_idx = int(np.argmax(predictions))
    best_input = combos[best_idx]
    best_prediction = predictions[best_idx]

    return {
        "recommended_nitrogen": best_input["nitrogen"],
        "recommended_phosphorus": best_input["phosphorus"],
        "recommended_potassium": best_input["potassium"],
        "expected_yield": round(float(best_prediction), 2),
        "combinations_tested": len(combos)
    }