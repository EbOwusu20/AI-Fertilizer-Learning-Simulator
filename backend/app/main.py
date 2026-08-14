from fastapi import FastAPI

from dotenv import load_dotenv

from fastapi.middleware.cors import CORSMiddleware

from app.schemas import PredictionRequest

from app.ml_service import predict_yield

from app.optimizer import optimize_fertilizer

from fastapi import Depends


from app.database import Base, engine

from app.routers.auth import router as auth_router

from app.auth.dependencies import get_current_user
from app.models import User



from app.calculator import (
    calculate_profit,
    classify_environment,
    environmental_score,
    generate_advice
)

load_dotenv()

Base.metadata.create_all(bind=engine)



app = FastAPI(
    title="AI Fertilizer Simulator"
)

app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          
    allow_credentials=True,
    allow_methods=["*"],          
    allow_headers=["*"],
)


@app.post("/predict")
def predict(data: PredictionRequest , current_user: User = Depends(get_current_user)):

    prediction = predict_yield(data.model_dump())
    optimization_result = optimize_fertilizer(data.model_dump())

    fertilizer_cost = (
        data.nitrogen +
        data.phosphorus +
        data.potassium
    ) * 6

    labour = 800
    transport = 300

    crop_prices = {
        "Maize":3200,

        "Rice":4500,

        "Cassava":900,

        "Tomato":2500,

        "Pepper":3500,

        "Onion":2800,

        "Soybean":5000,

        "Groundnut":4200,

        "Cowpea":4800,

        "Plantain":1300,

        "Cocoa":18000,

        "Yam":2200
    }

    profit = calculate_profit(
        prediction,
        crop_prices[data.crop],
        fertilizer_cost,
        labour,
        transport
    )

    env, reasons = environmental_score(
        data.nitrogen,
        data.phosphorus,
        data.potassium,
        data.soil_ph,
        data.rainfall_mm,
        data.soil_type,
        data.organic_matter,
        data.application_method,
        data.application_time
    )

    level = classify_environment(env)

    advice = generate_advice(env)

    return {
        "predicted_yield": prediction,
        "profit": profit,
        "environmental_score": env,
        "environmental_status": level,
        "recommendation": advice,
        "analysis": reasons,    
        "optimization_result": optimization_result
    }