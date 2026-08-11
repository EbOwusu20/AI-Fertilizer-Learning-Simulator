import random

SOIL_TYPES = {

    "Sandy": {
        "ph": (5.0, 6.5),
        "organic": (1.0, 2.5),
        "drainage": "High"
    },

    "Loam": {
        "ph": (6.0, 7.2),
        "organic": (2.5, 5.0),
        "drainage": "Moderate"
    },

    "Clay": {
        "ph": (5.5, 7.0),
        "organic": (2.0, 4.0),
        "drainage": "Low"
    },

    "Sandy Loam": {
        "ph": (5.8, 7.0),
        "organic": (2.0, 4.0),
        "drainage": "Moderate"
    },

    "Clay Loam": {
        "ph": (6.0, 7.5),
        "organic": (3.0, 5.5),
        "drainage": "Moderate"
    }

}


def generate_soil():

    soil = random.choice(list(SOIL_TYPES.keys()))

    data = SOIL_TYPES[soil]

    soil_ph = round(random.uniform(*data["ph"]), 2)

    organic = round(random.uniform(*data["organic"]), 2)

    fertility = random.randint(45, 100)

    moisture = random.randint(20, 85)

    return (
        soil,
        soil_ph,
        organic,
        fertility,
        moisture,
        data["drainage"]
    )