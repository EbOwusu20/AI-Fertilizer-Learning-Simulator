# ============================
# CROP CONFIGURATION
# ============================
CROP_VARIETIES = {
    "Maize": ["Obatanpa", "Abontem", "Omankwa"],
    "Rice": ["Jasmine", "AGRA Rice", "NERICA"],
    "Cassava": ["Bankye Hemaa", "Afisiafi", "Ampong"],
    "Tomato": ["Pectomech", "Power Rano", "Roma"],
    "Pepper": ["Legon 18", "Bird Eye", "Cayenne"],
    "Onion": ["Red Creole", "Texas Grano"],
    "Soybean": ["Jenguma", "Anidaso"],
    "Groundnut": ["Nkate SARI", "Yenyawoso"],
    "Cowpea": ["Asontem", "Songotra"],
    "Plantain": ["Apem", "Apantu", "Oniaba"],
    "Cocoa": ["Amazon", "Amelonado"],
    "Yam": ["Pona", "Lariboko"]
}

GROWTH_STAGES = [
    "Planting",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
]

APPLICATION_TIMES = [
    "Before Planting",
    "At Planting",
    "2 Weeks After Planting",
    "Top Dressing",
    "Flowering Stage"
]


CROPS = {
    "Maize": {
        "yield_range": (3.5, 8.5),
        "optimal_n": 120,
        "optimal_p": 60,
        "optimal_k": 40,
        "price_per_ton": 3200,
        "growing_days": 120
    },

    "Rice": {
        "yield_range": (2.5, 6.5),
        "optimal_n": 100,
        "optimal_p": 50,
        "optimal_k": 50,
        "price_per_ton": 4500,
        "growing_days": 140
    },

    "Cassava": {
        "yield_range": (10, 30),
        "optimal_n": 90,
        "optimal_p": 40,
        "optimal_k": 80,
        "price_per_ton": 900,
        "growing_days": 360
    },

    "Tomato": {
        "yield_range": (15, 45),
        "optimal_n": 150,
        "optimal_p": 80,
        "optimal_k": 120,
        "price_per_ton": 2500,
        "growing_days": 100
    },

    "Pepper": {
        "yield_range": (8, 25),
        "optimal_n": 130,
        "optimal_p": 70,
        "optimal_k": 110,
        "price_per_ton": 3500,
        "growing_days": 120
    },

    "Onion": {
        "yield_range": (12, 35),
        "optimal_n": 110,
        "optimal_p": 60,
        "optimal_k": 90,
        "price_per_ton": 2800,
        "growing_days": 110
    },

    "Soybean": {
        "yield_range": (2.0, 5.5),
        "optimal_n": 30,
        "optimal_p": 70,
        "optimal_k": 60,
        "price_per_ton": 5000,
        "growing_days": 115
    },

    "Groundnut": {
        "yield_range": (1.5, 4.5),
        "optimal_n": 25,
        "optimal_p": 60,
        "optimal_k": 50,
        "price_per_ton": 4200,
        "growing_days": 110
    },

    "Cowpea": {
        "yield_range": (1.2, 3.8),
        "optimal_n": 20,
        "optimal_p": 55,
        "optimal_k": 45,
        "price_per_ton": 4800,
        "growing_days": 90
    },

    "Plantain": {
        "yield_range": (12, 30),
        "optimal_n": 200,
        "optimal_p": 90,
        "optimal_k": 250,
        "price_per_ton": 1300,
        "growing_days": 365
    },

    "Cocoa": {
        "yield_range": (0.6, 2.5),
        "optimal_n": 90,
        "optimal_p": 45,
        "optimal_k": 120,
        "price_per_ton": 18000,
        "growing_days": 1460
    },

    "Yam": {
        "yield_range": (10, 28),
        "optimal_n": 100,
        "optimal_p": 60,
        "optimal_k": 120,
        "price_per_ton": 2200,
        "growing_days": 240
    }
}


# ============================
# GHANA REGIONS
# ============================

REGIONS = {
    "Ashanti": 1200,
    "Ahafo": 1250,
    "Bono": 1100,
    "Bono East": 1050,
    "Central": 1500,
    "Eastern": 1400,
    "Greater Accra": 800,
    "North East": 850,
    "Northern": 900,
    "Oti": 1350,
    "Savannah": 950,
    "Upper East": 800,
    "Upper West": 850,
    "Volta": 1450,
    "Western": 1800,
    "Western North": 1750
}


# ============================
# SOIL TYPES
# ============================

SOILS = {

    "Sandy": {
        "yield_factor": 0.85,
        "environment_factor": 0.80
    },

    "Loam": {
        "yield_factor": 1.00,
        "environment_factor": 1.00
    },

    "Clay": {
        "yield_factor": 0.92,
        "environment_factor": 0.95
    },

    "Sandy Loam": {
        "yield_factor": 0.95,
        "environment_factor": 0.92
    },

    "Clay Loam": {
        "yield_factor": 0.98,
        "environment_factor": 0.97
    },

    "Silty Loam": {
        "yield_factor": 1.02,
        "environment_factor": 1.01
    }

}


# ============================
# GROWING SEASONS
# ============================

SEASONS = [
    "Major",
    "Minor"
]


# ============================
# FERTILIZER TYPES
# ============================

FERTILIZER_TYPES = [
    "NPK 15-15-15",
    "NPK 23-10-10",
    "NPK 20-10-10",
    "NPK 15-15-30",
    "Urea",
    "Ammonium Sulphate",
    "Organic Compost",
    "Poultry Manure"
]


# ============================
# APPLICATION METHODS
# ============================

APPLICATION_METHODS = [
    "Broadcast",
    "Band Placement",
    "Side Dressing",
    "Foliar Spray",
    "Spot Application"
]


# ============================
# APPLICATION TIME
# ============================

APPLICATION_TIMES = [
    "Morning",
    "Afternoon",
    "Evening"
]


# ============================
# IRRIGATION METHODS
# ============================

IRRIGATION_METHODS = [
    "None",
    "Drip",
    "Sprinkler",
    "Flood"
]


# ============================
# PEST PRESSURE
# ============================

PEST_PRESSURE = [
    "Low",
    "Medium",
    "High"
]


# ============================
# DISEASE RISK
# ============================

DISEASE_RISK = [
    "Low",
    "Medium",
    "High"
]

CROP_REGIONS = {
    "Maize": ["Ashanti", "Bono", "Northern", "Eastern", "Ahafo"],
    "Rice": ["Northern", "Volta", "Oti", "Bono East"],
    "Cassava": ["Eastern", "Ashanti", "Central", "Volta"],
    "Tomato": ["Upper East", "Northern", "Bono"],
    "Pepper": ["Volta", "Ashanti", "Eastern"],
    "Onion": ["Upper East", "Northern"],
    "Soybean": ["Northern", "Savannah", "Upper West"],
    "Groundnut": ["Northern", "Upper East", "Upper West"],
    "Cowpea": ["Northern", "North East"],
    "Plantain": ["Ashanti", "Eastern", "Western", "Central"],
    "Cocoa": ["Ashanti", "Western", "Western North", "Ahafo", "Eastern"],
    "Yam": ["Northern", "Bono", "Savannah", "Oti"]
}