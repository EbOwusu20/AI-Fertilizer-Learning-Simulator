import Card from "../common/Card";

const PredictionSummary = ({ prediction }) => {
  const items = [
    ["Crop", prediction.crop],
    ["Soil Type", prediction.soil],
    ["Nitrogen", prediction.nitrogen != null ? `${prediction.nitrogen} kg/ha` : "—"],
    ["Phosphorus", prediction.phosphorus != null ? `${prediction.phosphorus} kg/ha` : "—"],
    ["Potassium", prediction.potassium != null ? `${prediction.potassium} kg/ha` : "—"],
    ["Rainfall", prediction.rainfall != null ? `${prediction.rainfall} mm` : "—"],
    ["Temperature", prediction.temperature != null ? `${prediction.temperature} °C` : "—"],
    ["Humidity", prediction.humidity != null ? `${prediction.humidity}%` : "—"],
    ["Soil pH", prediction.pH ?? "—"],
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-5">Input Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map(([label, value]) => (
          <div key={label} className="border rounded-xl p-4">
            <p className="text-sm text-gray-500">{label}</p>
            <h3 className="font-semibold mt-1">{value}</h3>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PredictionSummary;
