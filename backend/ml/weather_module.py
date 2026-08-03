import random

REGION_WEATHER = {
    "Ashanti": {"rainfall": (1200, 1500), "temperature": (22, 31)},
    "Eastern": {"rainfall": (1300, 1600), "temperature": (22, 30)},
    "Western": {"rainfall": (1600, 2200), "temperature": (22, 30)},
    "Western North": {"rainfall": (1600, 2200), "temperature": (21, 29)},
    "Central": {"rainfall": (1400, 1700), "temperature": (23, 31)},
    "Volta": {"rainfall": (1200, 1600), "temperature": (23, 32)},
    "Greater Accra": {"rainfall": (700, 900), "temperature": (25, 34)},
    "Northern": {"rainfall": (900, 1200), "temperature": (26, 37)},
    "North East": {"rainfall": (850, 1100), "temperature": (27, 38)},
    "Savannah": {"rainfall": (900, 1200), "temperature": (27, 38)},
    "Upper East": {"rainfall": (700, 1000), "temperature": (28, 40)},
    "Upper West": {"rainfall": (800, 1100), "temperature": (27, 39)},
    "Bono": {"rainfall": (1100, 1400), "temperature": (23, 32)},
    "Bono East": {"rainfall": (1000, 1300), "temperature": (24, 33)},
    "Ahafo": {"rainfall": (1200, 1500), "temperature": (22, 30)},
    "Oti": {"rainfall": (1300, 1700), "temperature": (23, 31)}
}


def generate_weather(region):

    weather = REGION_WEATHER[region]

    rainfall = random.randint(*weather["rainfall"])

    temperature = round(random.uniform(*weather["temperature"]), 1)

    humidity = random.randint(45, 95)

    sunshine = round(random.uniform(5, 10), 1)

    return rainfall, temperature, humidity, sunshine