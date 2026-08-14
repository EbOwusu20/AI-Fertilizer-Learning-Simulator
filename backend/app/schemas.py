from pydantic import BaseModel

class PredictionRequest(BaseModel):
    crop: str
    region: str
    season: str

    crop_variety: str
    growth_stage: str
    application_time: str

    soil_type: str
    soil_ph: float
    organic_matter: float
    fertility_index: float
    soil_moisture: int
    drainage: str

    rainfall_mm: int
    temperature: float
    humidity: int
    sunshine_hours: float

    nitrogen: int
    phosphorus: int
    potassium: int

    fertilizer_type: str
    application_method: str

    planting_density: int
    irrigation: str
    previous_crop: str
    pest_pressure: str
    disease_risk: str
    farmer_experience_years: int
    farm_size_hectares: float