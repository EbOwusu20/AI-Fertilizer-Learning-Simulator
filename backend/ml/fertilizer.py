import random
from config import CROPS

FERTILIZER_TYPES = [
    "NPK 15-15-15",
    "NPK 23-10-10",
    "Urea",
    "Ammonium Sulphate"
]

APPLICATION_METHODS = [
    "Broadcast",
    "Band Placement",
    "Side Dressing"
]


def generate_fertilizer(crop):

    info = CROPS[crop]

    n = max(
        0,
        random.randint(
            info["optimal_n"] - 40,
            info["optimal_n"] + 40
        )
    )

    p = max(
        0,
        random.randint(
            info["optimal_p"] - 25,
            info["optimal_p"] + 25
        )
    )

    k = max(
        0,
        random.randint(
            info["optimal_k"] - 25,
            info["optimal_k"] + 25
        )
    )

    fertilizer = random.choice(FERTILIZER_TYPES)

    method = random.choice(APPLICATION_METHODS)

    return n, p, k, fertilizer, method