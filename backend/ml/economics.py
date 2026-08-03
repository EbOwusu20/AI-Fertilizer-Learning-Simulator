import random

LABOUR_COST = (400, 1200)

TRANSPORT_COST = (150, 600)


def calculate_economics(crop_price, yield_prediction, fertilizer_cost):

    labour = random.randint(*LABOUR_COST)

    transport = random.randint(*TRANSPORT_COST)

    revenue = crop_price * yield_prediction

    total_cost = fertilizer_cost + labour + transport

    profit = revenue - total_cost

    return {
        "labour_cost": labour,
        "transport_cost": transport,
        "revenue": round(revenue,2),
        "total_cost": round(total_cost,2),
        "profit": round(profit,2)
    }