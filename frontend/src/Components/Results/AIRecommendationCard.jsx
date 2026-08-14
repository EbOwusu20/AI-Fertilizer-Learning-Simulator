import Card from "../common/Card";
import { Sparkles } from "lucide-react";
import ScoreBadge from "./ScoreBadge";

const number = (value, digits = 2) => {
  const n = Number(value);
  return Number.isFinite(n) ? n.toFixed(digits) : "—";
};

// Renders optimization_result from /predict: the single best NPK combination
// the backend found after testing every candidate combination.
const AIRecommendationCard = ({ ai }) => {
  if (!ai) return null;

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-green-700">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-lg font-semibold">AI Fertilizer Recommendation</h2>
          </div>
          {ai.combinationsTested != null && (
            <p className="text-gray-500 text-sm mt-1">
              Tested {ai.combinationsTested} NPK combinations to find this result.
            </p>
          )}

          <div className="grid grid-cols-3 gap-3 mt-5 max-w-sm">
            <div className="border rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500">Nitrogen (N)</p>
              <p className="text-xl font-bold text-green-700">{ai.nitrogen}</p>
              <p className="text-xs text-gray-400">kg/ha</p>
            </div>
            <div className="border rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500">Phosphorus (P)</p>
              <p className="text-xl font-bold text-green-700">{ai.phosphorus}</p>
              <p className="text-xs text-gray-400">kg/ha</p>
            </div>
            <div className="border rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500">Potassium (K)</p>
              <p className="text-xl font-bold text-green-700">{ai.potassium}</p>
              <p className="text-xs text-gray-400">kg/ha</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
          <ScoreBadge score={ai.optimizationScore} label="Optimization Score" />
          <div className="text-left md:text-right">
            <p className="text-gray-500 text-sm">Expected Yield</p>
            <p className="text-xl font-semibold">{number(ai.expectedYield)} t/ha</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-gray-500 text-sm">Expected Profit</p>
            <p className="text-xl font-semibold">
              {ai.expectedProfit == null ? "—" : `GH₵ ${number(ai.expectedProfit, 2)}`}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-gray-500 text-sm">Environmental Score</p>
            <p className="text-xl font-semibold">
              {ai.environmentalScore == null ? "—" : `${number(ai.environmentalScore, 0)}/100`}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIRecommendationCard;
