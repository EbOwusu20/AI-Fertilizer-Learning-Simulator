import random
import math

from config import CROPS



def calculate_yield(
    crop,
    soil_factor,
    rainfall,
    temperature,
    fertility,
    nitrogen,
    phosphorus,
    potassium
):
    info = CROPS[crop]

    max_yield = info["yield_range"][1]
    min_yield = info["yield_range"][0]

    # Fertilizer response (Mitscherlich-inspired)
    n_response = 1 - math.exp(-nitrogen / info["optimal_n"])
    p_response = 1 - math.exp(-phosphorus / info["optimal_p"])
    k_response = 1 - math.exp(-potassium / info["optimal_k"])

    fertilizer_response = (n_response + p_response + k_response) / 3

    # Weather effects
    rainfall_factor = min(rainfall / 1300, 1.15)
    temperature_factor = max(0.75, 1 - abs(28 - temperature) * 0.03)

    fertility_factor = fertility / 100

    predicted = (
        max_yield
        * fertilizer_response
        * soil_factor
        * rainfall_factor
        * temperature_factor
        * fertility_factor
    )

    predicted += random.uniform(-0.25, 0.25)

    predicted = max(min_yield, min(predicted, max_yield))

    return round(predicted, 2)


def environmental_score(
        crop,
        nitrogen,
        phosphorus,
        potassium,
        soil_ph,
        rainfall
):

    info = CROPS[crop]

    score = 100

    score -= abs(nitrogen-info["optimal_n"])*0.18

    score -= abs(phosphorus-info["optimal_p"])*0.22

    score -= abs(potassium-info["optimal_k"])*0.18

    if soil_ph < 5.5:

        score -= 12

    elif soil_ph > 7.5:

        score -= 8

    if rainfall > 1800:

        score -= 8

    return max(0,round(score,2))  

def sustainability(score):

    if score >=90:

        return "Excellent"

    elif score>=75:

        return "Good"

    elif score>=60:

        return "Fair"

    else:

        return "Poor"