import Card from "../common/Card";
import { Trophy } from "lucide-react";

const number = (value, digits = 2) => {
  const n = Number(value);
  return Number.isFinite(n) ? n.toFixed(digits) : "—";
};

const MEDALS = ["🥇", "🥈", "🥉"];

// Renders optimization_result.top_recommendations from /predict.
const TopRecommendationsTable = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <Trophy className="text-green-700 w-5 h-5" />
        <h2 className="text-xl font-semibold">Top AI Recommendations</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 pr-3">Rank</th>
              <th className="py-2 pr-3">N</th>
              <th className="py-2 pr-3">P</th>
              <th className="py-2 pr-3">K</th>
              <th className="py-2 pr-3">Yield (t/ha)</th>
              <th className="py-2 pr-3">Profit</th>
              <th className="py-2 pr-3">Environment</th>
              <th className="py-2 pr-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec) => (
              <tr key={rec.rank} className="border-b last:border-0">
                <td className="py-3 pr-3 font-semibold">
                  {MEDALS[rec.rank - 1] ? `${MEDALS[rec.rank - 1]} ${rec.rank}` : rec.rank}
                </td>
                <td className="py-3 pr-3">{rec.nitrogen}</td>
                <td className="py-3 pr-3">{rec.phosphorus}</td>
                <td className="py-3 pr-3">{rec.potassium}</td>
                <td className="py-3 pr-3">{number(rec.expectedYield)}</td>
                <td className="py-3 pr-3">GH₵{number(rec.expectedProfit, 2)}</td>
                <td className="py-3 pr-3">{number(rec.environmentalScore, 0)}</td>
                <td className="py-3 pr-3 font-semibold text-green-700">{number(rec.optimizationScore, 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TopRecommendationsTable;
