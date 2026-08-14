import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Sprout, Leaf, DollarSign } from "lucide-react";
import Card from "../Components/common/Card";
import PredictionSummary from "../Components/Results/PredictionSummary";
import StatusBadge from "../Components/Results/StatusBadge";
import AIRecommendationCard from "../Components/Results/AIRecommendationCard";
import TopRecommendationsTable from "../Components/Results/TopRecommendationsTable";
import ComparisonPanel from "../Components/Results/ComparisonPanel";

const number = (value, digits = 2) => {
  const n = Number(value);
  return Number.isFinite(n) ? n.toFixed(digits) : "—";
};

// Maps the /predict response (see app/main.py) into what the page needs.
// result shape:
// {
//   predicted_yield, profit, environmental_score, environmental_status,
//   recommendation, analysis: [reasons],
//   optimization_result: {
//     recommended_nitrogen, recommended_phosphorus, recommended_potassium,
//     expected_yield, expected_profit, environmental_score, optimization_score,
//     combinations_tested,
//     top_recommendations: [{ rank, nitrogen, phosphorus, potassium,
//       expected_yield, expected_profit, environmental_score, optimization_score }]
//   }
// }
const normalizeResult = (payload) => {
  const result = payload?.result || payload || {};
  const input = payload?.input || {};
  const opt = result.optimization_result || {};

  const analysis = Array.isArray(result.analysis) ? result.analysis : [];
  const advice = result.recommendation
    ? [String(result.recommendation), ...analysis]
    : analysis.length
      ? analysis
      : ["Review the AI recommendation together with the yield, profit and sustainability results."];

  const you = {
    nitrogen: input.nitrogen,
    phosphorus: input.phosphorus,
    potassium: input.potassium,
    yield: result.predicted_yield,
    profit: result.profit,
    environmentalScore: result.environmental_score,
  };

  const ai = {
    nitrogen: opt.recommended_nitrogen,
    phosphorus: opt.recommended_phosphorus,
    potassium: opt.recommended_potassium,
    expectedYield: opt.expected_yield,
    expectedProfit: opt.expected_profit,
    environmentalScore: opt.environmental_score,
    optimizationScore: opt.optimization_score,
    combinationsTested: opt.combinations_tested,
  };

  const topRecommendations = Array.isArray(opt.top_recommendations)
    ? opt.top_recommendations.map((rec) => ({
        rank: rec.rank,
        nitrogen: rec.nitrogen,
        phosphorus: rec.phosphorus,
        potassium: rec.potassium,
        expectedYield: rec.expected_yield,
        expectedProfit: rec.expected_profit,
        environmentalScore: rec.environmental_score,
        optimizationScore: rec.optimization_score,
      }))
    : [];

  return {
    input,
    raw: result,
    crop: input.crop,
    soil: input.soil_type || input.soil,
    nitrogen: input.nitrogen,
    phosphorus: input.phosphorus,
    potassium: input.potassium,
    rainfall: input.rainfall_mm ?? input.rainfall,
    temperature: input.temperature,
    humidity: input.humidity,
    pH: input.soil_ph ?? input.pH,
    expectedYield: result.predicted_yield,
    profit: result.profit,
    environmentalScore: result.environmental_score,
    environmentalStatus: result.environmental_status,
    advice,
    you,
    ai,
    topRecommendations,
  };
};

const Results = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("fertisim_last_result");
    if (!stored) {
      navigate("/simulation", { replace: true });
      return;
    }
    setData(normalizeResult(JSON.parse(stored)));
  }, [navigate]);

  if (!data) return null;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-green-700 font-semibold">Simulation Completed 🎉</p>
          <h1 className="text-3xl font-bold mt-1">Your AI-powered results</h1>
          <p className="text-gray-500 mt-2">These results came directly from the FertSim backend prediction service.</p>
        </div>
        <button onClick={() => navigate("/simulation")} className="px-5 py-3 rounded-xl bg-green-700 text-white font-semibold">
          New Simulation
        </button>
      </div>

      {/* 1. Student's own simulation result */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Your Simulation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="p-5">
            <div className="flex items-center gap-3"><Sprout className="text-green-700" /><span className="text-gray-500">Predicted Yield</span></div>
            <p className="text-3xl font-bold mt-3">{number(data.expectedYield)} <span className="text-sm font-normal">t/ha</span></p>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3"><DollarSign className="text-green-700" /><span className="text-gray-500">Expected Profit</span></div>
            <p className="text-3xl font-bold mt-3">{data.profit == null ? "—" : `GH₵ ${number(data.profit, 2)}`}</p>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3"><Leaf className="text-green-700" /><span className="text-gray-500">Environmental Score</span></div>
              <StatusBadge status={data.environmentalStatus} />
            </div>
            <p className="text-3xl font-bold mt-3">{data.environmentalScore == null ? "—" : number(data.environmentalScore, 0)} <span className="text-sm font-normal">/100</span></p>
          </Card>
        </div>
      </div>

      {/* 2. AI recommendation (single best) */}
      <AIRecommendationCard ai={data.ai} />

      {/* 3. Top 5 recommendations */}
      <TopRecommendationsTable recommendations={data.topRecommendations} />

      {/* 4. You vs AI */}
      <ComparisonPanel you={data.you} ai={data.ai} />

      <div className="grid lg:grid-cols-2 gap-8">
        <PredictionSummary prediction={data} />
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-5">AI Recommendation & Feedback</h2>
          <div className="space-y-4">
            {data.advice.map((tip, index) => (
              <div key={`${tip}-${index}`} className="flex items-start gap-3">
                <CheckCircle2 className="text-green-700 mt-1 shrink-0" />
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Results;
