import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";
import Select from "../common/Select";
import Slider from "../common/Slider";

const initialForm = {
  crop: "Maize",
  region: "Ashanti",
  season: "Major",
  crop_variety: "Improved",
  growth_stage: "Vegetative",
  application_time: "2 weeks after planting",
  soil_type: "Loamy",
  soil_ph: 6.5,
  organic_matter: 2.5,
  fertility_index: 0.7,
  soil_moisture: 55,
  drainage: "Good",
  rainfall_mm: 120,
  temperature: 28,
  humidity: 65,
  sunshine_hours: 7,
  nitrogen: 120,
  phosphorus: 60,
  potassium: 45,
  fertilizer_type: "NPK",
  application_method: "Broadcast",
  planting_density: 5,
  irrigation: "Rainfed",
  previous_crop: "Legume",
  pest_pressure: "Low",
  disease_risk: "Low",
  farmer_experience_years: 5,
  farm_size_hectares: 1,
};

const cropOptions = ["Maize", "Rice", "Cassava", "Tomato", "Yam", "Beans", "Sorghum", "Groundnut"];
const regionOptions = ["Ashanti", "Eastern", "Greater Accra", "Northern", "Upper East", "Upper West", "Volta", "Bono", "Ahafo", "Western", "Central", "Oti", "Savannah", "North East", "Western North"];
const seasonOptions = ["Major", "Minor"];
const soilOptions = ["Sandy", "Loamy", "Clay", "Sandy Loam", "Clay Loam"];
const varietyOptions = ["Improved", "Local", "Hybrid"];
const growthOptions = ["Germination", "Vegetative", "Flowering", "Fruiting", "Maturity"];
const applicationTimeOptions = ["At planting", "1 week after planting", "2 weeks after planting", "4 weeks after planting"];
const drainageOptions = ["Poor", "Moderate", "Good", "Very Good"];
const fertilizerOptions = ["NPK", "Urea", "DAP", "Compound NPK", "Organic"];
const methodOptions = ["Broadcast", "Banding", "Side dressing", "Foliar"];
const irrigationOptions = ["Rainfed", "Supplementary", "Irrigated"];
const previousCropOptions = ["Legume", "Cereal", "Root crop", "Vegetable", "Fallow"];
const pressureOptions = ["Low", "Medium", "High"];

const SimulationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.crop || !formData.soil_type || !formData.region) {
      setError("Please select a crop, region and soil type before starting the simulation.");
      return;
    }

    // Loading.jsx performs the actual API request. Keeping the payload in sessionStorage
    // lets the loading screen survive a route change and then redirect to Results.
    sessionStorage.setItem("fertisim_pending_simulation", JSON.stringify(formData));
    navigate("/loading");
  };

  return (
    <Card className="max-w-5xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">New Fertilizer Simulation</h1>
        <p className="text-gray-500 mt-2">
          Enter the farm conditions and fertilizer inputs. The AI model will predict yield,
          profit and environmental sustainability.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Crop & Farm Details</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Select label="Crop Type" options={cropOptions} value={formData.crop} onChange={(e) => handleChange("crop", e.target.value)} />
            <Select label="Region" options={regionOptions} value={formData.region} onChange={(e) => handleChange("region", e.target.value)} />
            <Select label="Season" options={seasonOptions} value={formData.season} onChange={(e) => handleChange("season", e.target.value)} />
            <Select label="Crop Variety" options={varietyOptions} value={formData.crop_variety} onChange={(e) => handleChange("crop_variety", e.target.value)} />
            <Select label="Growth Stage" options={growthOptions} value={formData.growth_stage} onChange={(e) => handleChange("growth_stage", e.target.value)} />
            <Select label="Previous Crop" options={previousCropOptions} value={formData.previous_crop} onChange={(e) => handleChange("previous_crop", e.target.value)} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">2. Soil Conditions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Select label="Soil Type" options={soilOptions} value={formData.soil_type} onChange={(e) => handleChange("soil_type", e.target.value)} />
            <Slider label="Soil pH" min={4} max={9} value={formData.soil_ph} onChange={(value) => handleChange("soil_ph", value)} />
            <Slider label="Organic Matter (%)" min={0} max={10} step={0.1} value={formData.organic_matter} onChange={(value) => handleChange("organic_matter", value)} />
            <Slider label="Fertility Index" min={0} max={1} step={0.01} value={formData.fertility_index} onChange={(value) => handleChange("fertility_index", value)} />
            <Slider label="Soil Moisture (%)" min={0} max={100} value={formData.soil_moisture} onChange={(value) => handleChange("soil_moisture", value)} />
            <Select label="Drainage" options={drainageOptions} value={formData.drainage} onChange={(e) => handleChange("drainage", e.target.value)} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">3. Fertilizer Inputs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Slider label="Nitrogen (N) kg/ha" min={0} max={300} value={formData.nitrogen} onChange={(value) => handleChange("nitrogen", value)} />
            <Slider label="Phosphorus (P) kg/ha" min={0} max={300} value={formData.phosphorus} onChange={(value) => handleChange("phosphorus", value)} />
            <Slider label="Potassium (K) kg/ha" min={0} max={300} value={formData.potassium} onChange={(value) => handleChange("potassium", value)} />
          </div>
          <div className="grid md:grid-cols-2 gap-5 mt-6">
            <Select label="Fertilizer Type" options={fertilizerOptions} value={formData.fertilizer_type} onChange={(e) => handleChange("fertilizer_type", e.target.value)} />
            <Select label="Application Method" options={methodOptions} value={formData.application_method} onChange={(e) => handleChange("application_method", e.target.value)} />
            <Select label="Application Time" options={applicationTimeOptions} value={formData.application_time} onChange={(e) => handleChange("application_time", e.target.value)} />
          </div>
        </section>

        <button
          type="button"
          onClick={() => setShowAdvanced((value) => !value)}
          className="text-green-700 font-semibold hover:underline"
        >
          {showAdvanced ? "Hide advanced farm & weather inputs" : "Show advanced farm & weather inputs"}
        </button>

        {showAdvanced && (
          <section className="border-t pt-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">4. Weather & Farm Conditions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Slider label="Rainfall (mm)" min={0} max={500} value={formData.rainfall_mm} onChange={(value) => handleChange("rainfall_mm", value)} />
              <Slider label="Temperature (°C)" min={15} max={40} value={formData.temperature} onChange={(value) => handleChange("temperature", value)} />
              <Slider label="Humidity (%)" min={0} max={100} value={formData.humidity} onChange={(value) => handleChange("humidity", value)} />
              <Slider label="Sunshine (hours/day)" min={0} max={12} value={formData.sunshine_hours} onChange={(value) => handleChange("sunshine_hours", value)} />
              <Slider label="Planting Density" min={1} max={20} value={formData.planting_density} onChange={(value) => handleChange("planting_density", value)} />
              <Slider label="Farmer Experience (years)" min={0} max={50} value={formData.farmer_experience_years} onChange={(value) => handleChange("farmer_experience_years", value)} />
              <Slider label="Farm Size (hectares)" min={0.1} max={100} step={0.1} value={formData.farm_size_hectares} onChange={(value) => handleChange("farm_size_hectares", value)} />
              <Select label="Irrigation" options={irrigationOptions} value={formData.irrigation} onChange={(e) => handleChange("irrigation", e.target.value)} />
              <Select label="Pest Pressure" options={pressureOptions} value={formData.pest_pressure} onChange={(e) => handleChange("pest_pressure", e.target.value)} />
              <Select label="Disease Risk" options={pressureOptions} value={formData.disease_risk} onChange={(e) => handleChange("disease_risk", e.target.value)} />
            </div>
          </section>
        )}

        {error && <p className="text-red-600 bg-red-50 rounded-xl p-3">{error}</p>}

        <div className="pt-2 flex justify-end">
          <Button type="submit">Run Simulation</Button>
        </div>
      </form>
    </Card>
  );
};

export default SimulationForm;
