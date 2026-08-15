from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from app.schemas import PredictionRequest
from app.ml_service import predict_yield
from app.optimizer import optimize_fertilizer

from app.database import Base, engine
from app.routers.auth import router as auth_router
from app.auth.dependencies import get_current_user, get_db

from app.models import User, Simulation

from app.calculator import (
    calculate_profit,
    classify_environment,
    environmental_score,
    generate_advice,
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


# ============================================================
# PREDICTION / SIMULATION
# ============================================================

@app.post("/predict")
def predict(
    data: PredictionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # 1. Predict yield
    # --------------------------------------------------------

    prediction = predict_yield(
        data.model_dump()
    )


    # --------------------------------------------------------
    # 2. Optimize fertilizer
    # --------------------------------------------------------

    optimization_result = optimize_fertilizer(
        data.model_dump()
    )


    # --------------------------------------------------------
    # 3. Calculate fertilizer cost
    # --------------------------------------------------------

    fertilizer_cost = (
        data.nitrogen
        + data.phosphorus
        + data.potassium
    ) * 6


    labour = 800
    transport = 300


    # --------------------------------------------------------
    # 4. Crop prices
    # --------------------------------------------------------

    crop_prices = {
        "Maize": 3200,
        "Rice": 4500,
        "Cassava": 900,
        "Tomato": 2500,
        "Pepper": 3500,
        "Onion": 2800,
        "Soybean": 5000,
        "Groundnut": 4200,
        "Cowpea": 4800,
        "Plantain": 1300,
        "Cocoa": 18000,
        "Yam": 2200,
    }


    # --------------------------------------------------------
    # 5. Calculate profit
    # --------------------------------------------------------

    profit = calculate_profit(
        prediction,
        crop_prices[data.crop],
        fertilizer_cost,
        labour,
        transport,
    )


    # --------------------------------------------------------
    # 6. Environmental score
    # --------------------------------------------------------

    env, reasons = environmental_score(
        data.nitrogen,
        data.phosphorus,
        data.potassium,
        data.soil_ph,
        data.rainfall_mm,
        data.soil_type,
        data.organic_matter,
        data.application_method,
        data.application_time,
    )


    level = classify_environment(env)

    advice = generate_advice(env)


    # --------------------------------------------------------
    # 7. Create result
    # --------------------------------------------------------

    result = {
        "predicted_yield": float(prediction),
        "profit": float(profit),
        "environmental_score": float(env),
        "environmental_status": level,
        "recommendation": advice,
        "analysis": reasons,
        "optimization_result": optimization_result,
    }


    # --------------------------------------------------------
    # 8. SAVE SIMULATION TO DATABASE
    # --------------------------------------------------------

    simulation = Simulation(

        # Which user created this simulation?
        user_id=current_user.id,

        # Basic information
        crop=data.crop,
        fertilizer_type=data.fertilizer_type,

        # Results
        predicted_yield=float(prediction),
        profit=float(profit),
        environmental_score=float(env),

        # Optimization score
        optimization_score=float(
            optimization_result.get(
                "optimization_score",
                0
            )
        ),

        # Save all input information
        input_data=data.model_dump(),

        # Save all result information
        result_data=result,
    )


    # Add to database
    db.add(simulation)

    # Actually save it
    db.commit()

    # Get the generated ID
    db.refresh(simulation)


    # --------------------------------------------------------
    # 9. Return result to frontend
    # --------------------------------------------------------

    return {
        "simulation_id": simulation.id,
        **result,
    }


# ============================================================
# HISTORY
# ============================================================

@app.get("/history")
def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    simulations = (
        db.query(Simulation)
        .filter(
            Simulation.user_id == current_user.id
        )
        .order_by(
            Simulation.created_at.desc()
        )
        .all()
    )


    return [
        {
            "id": simulation.id,
            "date": simulation.created_at,
            "crop": simulation.crop,
            "fertilizer": simulation.fertilizer_type,
            "yield": simulation.predicted_yield,
            "profit": simulation.profit,
            "environmental_score": simulation.environmental_score,
            "optimization_score": simulation.optimization_score,
        }
        for simulation in simulations
    ]


@app.get("/history/{simulation_id}")
def get_simulation(
    simulation_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    simulation = (
        db.query(Simulation)
        .filter(
            Simulation.id == simulation_id,
            Simulation.user_id == current_user.id,
        )
        .first()
    )

    if not simulation:
        from fastapi import HTTPException

        raise HTTPException(
            status_code=404,
            detail="Simulation not found",
        )

    return {
        "id": simulation.id,
        "created_at": simulation.created_at,
        "crop": simulation.crop,
        "fertilizer_type": simulation.fertilizer_type,

        "input_data": simulation.input_data,

        "result_data": simulation.result_data,

        "predicted_yield": simulation.predicted_yield,
        "profit": simulation.profit,
        "environmental_score": simulation.environmental_score,
        "optimization_score": simulation.optimization_score,
    }


# ============================================================
# DASHBOARD STATISTICS
# ============================================================

@app.get("/dashboard/stats")
def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    simulations = (
        db.query(Simulation)
        .filter(
            Simulation.user_id == current_user.id
        )
        .order_by(
            Simulation.created_at.desc()
        )
        .all()
    )


    total_simulations = len(simulations)


    # No simulations yet
    if total_simulations == 0:

        return {
            "total_simulations": 0,
            "average_yield": 0,
            "total_profit": 0,
            "average_environmental_score": 0,
            "recent_simulations": [],
        }


    # --------------------------------------------------------
    # Average yield
    # --------------------------------------------------------

    average_yield = sum(
        simulation.predicted_yield
        for simulation in simulations
    ) / total_simulations


    # --------------------------------------------------------
    # Total profit
    # --------------------------------------------------------

    total_profit = sum(
        simulation.profit
        for simulation in simulations
    )


    # --------------------------------------------------------
    # Average environmental score
    # --------------------------------------------------------

    average_environmental_score = sum(
        simulation.environmental_score
        for simulation in simulations
    ) / total_simulations


    # --------------------------------------------------------
    # Recent simulations
    # --------------------------------------------------------

    recent_simulations = simulations[:5]


    return {
        "total_simulations": total_simulations,

        "average_yield": round(
            average_yield,
            2,
        ),

        "total_profit": round(
            total_profit,
            2,
        ),

        "average_environmental_score": round(
            average_environmental_score,
            2,
        ),

        "recent_simulations": [
            {
                "id": simulation.id,
                "crop": simulation.crop,
                "fertilizer": simulation.fertilizer_type,
                "yield": simulation.predicted_yield,
                "profit": simulation.profit,
                "environmental_score": simulation.environmental_score,
                "created_at": simulation.created_at,
            }
            for simulation in recent_simulations
        ],
    }