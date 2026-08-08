import Card from '../common/Card'

const PredictionSummary = ({ prediction }) => {

  const items = [
    ["Crop", prediction.crop],
    ["Soil", prediction.soil],
    ["Nitrogen", prediction.nitrogen],
    ["Phosphorus", prediction.phosphorus],
    ["Potassium", prediction.potassium],
    ["Rainfall", `${prediction.rainfall}mm`],
    ["Temperature", `${prediction.temperature}°C`],
    ["Humidity", `${prediction.humidity}%`],
    ["pH", prediction.pH]
  ]

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-5">
        Input Summary
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="border rounded-xl p-4"
          >
            <p className="text-sm text-gray-500">
              {label}
            </p>

            <h3 className="font-semibold mt-1">
              {value}
            </h3>
          </div>
        ))}

      </div>
    </Card>
  )
}

export default PredictionSummary
