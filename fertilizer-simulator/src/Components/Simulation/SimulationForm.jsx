import React, { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import Select from "../common/Select";
import Slider from "../common/Slider";

const SimulationForm = () => {

  const [formData, setFormData] = useState({
    crop: "",
    soil: "",
    nitrogen: 120,
    phosphorus: 60,
    potassium: 40,
    temperature: 28,
    humidity: 65,
    rainfall: 120,
    pH: 6.5,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const cropOptions = [
    "Maize",
    "Cassava",
    "Tomato",
  ];

  const soilOptions = [
    "Sandy",
    "Loamy",
    "Clay",
  ];

  const handleSubmit = () => {
    console.log("Simulation Data:", formData);
  };

  return (
    <Card className="max-w-4xl mx-auto">

      {/* Header */}
      <h1 className="text-3xl font-bold text-green-700">
        New Fertilizer Simulation
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Fill in the farm details to receive an AI fertilizer
        recommendation.
      </p>

      {/* Form */}
      <div className="space-y-6">

        {/* Crop */}
        <Select
          label="Crop Type"
          options={cropOptions}
          value={formData.crop}
          onChange={(e) =>
            handleChange("crop", e.target.value)
          }
        />

        {/* Soil */}
        <Select
          label="Soil Type"
          options={soilOptions}
          value={formData.soil}
          onChange={(e) =>
            handleChange("soil", e.target.value)
          }
        />

        {/* Nitrogen */}
        <Slider
          label="Nitrogen (N)"
          min={0}
          max={250}
          value={formData.nitrogen}
          onChange={(value) =>
            handleChange("nitrogen", value)
          }
        />

        {/* Phosphorus */}
        <Slider
          label="Phosphorus (P)"
          min={0}
          max={150}
          value={formData.phosphorus}
          onChange={(value) =>
            handleChange("phosphorus", value)
          }
        />

        {/* Potassium */}
        <Slider
          label="Potassium (K)"
          min={0}
          max={130}
          value={formData.potassium}
          onChange={(value) =>
            handleChange("potassium", value)
          }
        />

      </div>

      {/* Submit */}
      <div className="mt-8 flex justify-end">

        <Button onClick={handleSubmit}>
          Submit
        </Button>

      </div>

    </Card>
  );
};

export default SimulationForm;