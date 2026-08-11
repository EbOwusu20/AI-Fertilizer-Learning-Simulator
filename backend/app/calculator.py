def calculate_profit(
    yield_prediction,
    crop_price,
    fertilizer_cost,
    labour_cost,
    transport_cost
):
    revenue = yield_prediction * crop_price

    total_cost = (
        fertilizer_cost +
        labour_cost +
        transport_cost
    )

    return round(revenue - total_cost, 2)

def environmental_score(
    nitrogen,
    phosphorus,
    potassium,
    soil_ph,
    rainfall,
    soil_type,
    organic_matter,
    application_method,
    application_time
):

    score = 100
    reasons = []

    # Nitrogen
    if nitrogen > 180:
        score -= 15
        reasons.append("Excess nitrogen may increase nutrient leaching.")

    # Phosphorus
    if phosphorus > 100:
        score -= 10
        reasons.append("High phosphorus may contribute to water pollution.")

    # Potassium
    if potassium > 120:
        score -= 8
        reasons.append("Potassium application is higher than recommended.")

    # Soil pH
    if soil_ph < 5.5:
        score -= 8
        reasons.append("Acidic soil reduces fertilizer efficiency.")

    elif soil_ph > 7.5:
        score -= 5
        reasons.append("Alkaline soil may reduce nutrient availability.")

    # Heavy rainfall
    if rainfall > 1700:
        score -= 10
        reasons.append("Heavy rainfall increases nutrient leaching risk.")

    # Sandy soil
    if soil_type == "Sandy":
        score -= 6
        reasons.append("Sandy soils lose nutrients more easily.")

    # Organic matter
    if organic_matter < 2:
        score -= 8
        reasons.append("Low organic matter reduces soil fertility.")

    # Application method
    if application_method == "Broadcast":
        score -= 5
        reasons.append("Broadcast application wastes more fertilizer.")

    # Application timing
    if application_time == "Before Planting":
        score -= 4
        reasons.append("Applying too early can increase nutrient loss.")

    score = max(score,0)

    return score,reasons 

def classify_environment(score):

    if score >= 90:
        return "Excellent"

    elif score >= 75:
        return "Good"

    elif score >= 60:
        return "Moderate"

    elif score >= 40:
        return "Poor"

    return "Critical"  

def generate_advice(score):

    if score >= 90:

        return "Excellent fertilizer management. Maintain your current practice."

    elif score >= 75:

        return "Good fertilizer strategy. Minor improvements can increase sustainability."

    elif score >= 60:

        return "Consider reducing fertilizer application and improving soil management."

    elif score >= 40:

        return "Your fertilizer strategy may negatively affect the environment."

    return "Immediate correction is recommended to avoid severe environmental damage."