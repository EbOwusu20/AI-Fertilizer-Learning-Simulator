import random
import pandas as pd

from config import (
    CROPS,
    REGIONS,
    SEASONS,
    CROP_REGIONS,
    CROP_VARIETIES,
    GROWTH_STAGES,
    APPLICATION_TIMES
)
from weather_module import generate_weather
from soil import generate_soil
from fertilizer import generate_fertilizer
from simulation import (
    calculate_yield,
    environmental_score,
    sustainability
)
from economics import calculate_economics

random.seed(42)

rows=[]

for _ in range(10000):

    crop = random.choice(list(CROP_VARIETIES.keys()))
    crop_variety = random.choice(CROP_VARIETIES[crop])

    region = random.choice(list(REGIONS.keys()))

    season=random.choice(SEASONS)
    growth_stage = random.choice(GROWTH_STAGES)
    application_time = random.choice(APPLICATION_TIMES)

    rainfall,temp,humidity,sunshine=generate_weather(region)

    soil,soil_ph,organic,fertility,moisture,drainage=generate_soil()

    soil_factor={
        "Sandy":0.85,
        "Loam":1.0,
        "Clay":0.92,
        "Sandy Loam":0.95,
        "Clay Loam":0.98
    }[soil]

    n,p,k,fertilizer,method=generate_fertilizer(crop)

    fertilizer_cost=(n+p+k)*6

    # Farming Practices
    planting_density = random.randint(18000, 32000)

    irrigation = random.choice([
        "None",
        "Drip",
        "Sprinkler",
        "Flood"
    ])

    previous_crop = random.choice(list(CROPS.keys()))

    pest_pressure = random.choice([
        "Low",
        "Medium",
        "High"
    ])

    disease_risk = random.choice([
        "Low",
        "Medium",
        "High"
    ])

    farmer_experience = random.randint(1, 30)

    farm_size = round(random.uniform(0.5, 15), 2)

    predicted=calculate_yield(
        crop,
        soil_factor,
        rainfall,
        temp,
        fertility,
        n,
        p,
        k
    )

    economy=calculate_economics(
        CROPS[crop]["price_per_ton"],
        predicted,
        fertilizer_cost
    )

    env=environmental_score(
        crop,
        n,
        p,
        k,
        soil_ph,
        rainfall
    )

    rows.append({

        "crop":crop,
        "region":region,
        "season":season,
        "crop_variety":crop_variety,
        "growth_stage":growth_stage,
        "application_time":application_time,
        "soil_type":soil,
        "soil_ph":soil_ph,
        "organic_matter":organic,
        "fertility_index":fertility,
        "soil_moisture":moisture,
        "drainage":drainage,

        "rainfall_mm":rainfall,
        "temperature":temp,
        "humidity":humidity,
        "sunshine_hours":sunshine,

        "nitrogen":n,
        "phosphorus":p,
        "potassium":k,

        "fertilizer_type":fertilizer,
        "application_method":method,

        "planting_density":planting_density,
        "irrigation":irrigation,
        "previous_crop":previous_crop,
        "pest_pressure":pest_pressure,
        "disease_risk":disease_risk,
        "farmer_experience_years":farmer_experience,
        "farm_size_hectares":farm_size,

        "fertilizer_cost":fertilizer_cost,

        "yield_ton_per_ha":predicted,

        "revenue":economy["revenue"],
        "labour_cost":economy["labour_cost"],
        "transport_cost":economy["transport_cost"],
        "total_cost":economy["total_cost"],
        "profit":economy["profit"],

        "environmental_score":env,

        "sustainability":sustainability(env)

    })

df=pd.DataFrame(rows)

df.to_csv("../dataset/fertilizer_dataset.csv",index=False)

print(df.head())

print(df.shape)

print("Dataset Generated Successfully ✅")