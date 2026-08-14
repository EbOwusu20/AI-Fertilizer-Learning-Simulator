import pandas as pd
import numpy as np

from ml.config import CROPS
from app.ml_service import model
from app.calculator import calculate_profit, environmental_score


LABOUR_COST = 800
TRANSPORT_COST = 300


YIELD_WEIGHT = 0.40
PROFIT_WEIGHT = 0.40
ENV_WEIGHT = 0.20

TOP_N = 5


def _normalize(values):
    """Min-max scale a list of numbers to the 0-100 range.
    If every value is identical, everyone scores 100 (no penalty for a flat field)."""
    lo, hi = min(values), max(values)
    if hi == lo:
        return [100.0 for _ in values]
    return [100.0 * (v - lo) / (hi - lo) for v in values]


def optimize_fertilizer(data, step=10):
    crop = data["crop"]
    info = CROPS[crop]
    crop_price = info["price_per_ton"]

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

   
    profits = []
    env_scores = []
    for combo, predicted_yield in zip(combos, predictions):
        fertilizer_cost = (combo["nitrogen"] + combo["phosphorus"] + combo["potassium"]) * 6
        profit = calculate_profit(
            float(predicted_yield),
            crop_price,
            fertilizer_cost,
            LABOUR_COST,
            TRANSPORT_COST
        )
        profits.append(profit)

        env, _reasons = environmental_score(
            combo["nitrogen"],
            combo["phosphorus"],
            combo["potassium"],
            combo["soil_ph"],
            combo["rainfall_mm"],
            combo["soil_type"],
            combo["organic_matter"],
            combo["application_method"],
            combo["application_time"]
        )
        env_scores.append(env)

    
    yield_norm = _normalize([float(p) for p in predictions])
    profit_norm = _normalize(profits)

    optimization_scores = [
        round(
            YIELD_WEIGHT * y_n + PROFIT_WEIGHT * p_n + ENV_WEIGHT * e,
            2
        )
        for y_n, p_n, e in zip(yield_norm, profit_norm, env_scores)
    ]

    candidates = []
    for combo, predicted_yield, profit, env, opt_score in zip(
        combos, predictions, profits, env_scores, optimization_scores
    ):
        candidates.append({
            "nitrogen": combo["nitrogen"],
            "phosphorus": combo["phosphorus"],
            "potassium": combo["potassium"],
            "expected_yield": round(float(predicted_yield), 2),
            "expected_profit": round(float(profit), 2),
            "environmental_score": env,
            "optimization_score": opt_score
        })

   
    candidates.sort(key=lambda c: c["optimization_score"], reverse=True)

    top_recommendations = []
    for rank, candidate in enumerate(candidates[:TOP_N], start=1):
        top_recommendations.append({"rank": rank, **candidate})

    best = top_recommendations[0]

    return {
       
        "recommended_nitrogen": best["nitrogen"],
        "recommended_phosphorus": best["phosphorus"],
        "recommended_potassium": best["potassium"],
        "expected_yield": best["expected_yield"],
        "expected_profit": best["expected_profit"],
        "environmental_score": best["environmental_score"],
        "optimization_score": best["optimization_score"],

        "combinations_tested": len(combos),
        "top_recommendations": top_recommendations
    }
