import Card from "../common/Card";
import { ArrowRightLeft } from "lucide-react";

const number = (value, digits = 2) => {
  const n = Number(value);
  return Number.isFinite(n) ? n.toFixed(digits) : "—";
};

const dash = (value) => (value == null || Number.isNaN(Number(value)) ? "—" : value);

// Compares the student's own submitted NPK/yield/profit/environment against
// the AI's #1 recommendation from optimization_result.
const ComparisonPanel = ({ you, ai }) => {
  if (!you || !ai) return null;

  const profitDelta =
    you.profit != null && ai.expectedProfit != null ? ai.expectedProfit - you.profit : null;
  const yieldDelta =
    you.yield != null && ai.expectedYield != null ? ai.expectedYield - you.yield : null;
  const envDelta =
    you.environmentalScore != null && ai.environmentalScore != null
      ? ai.environmentalScore - you.environmentalScore
      : null;

  const rows = [
    ["Nitrogen (N)", dash(you.nitrogen), dash(ai.nitrogen), null],
    ["Phosphorus (P)", dash(you.phosphorus), dash(ai.phosphorus), null],
    ["Potassium (K)", dash(you.potassium), dash(ai.potassium), null],
    ["Yield (t/ha)", number(you.yield), number(ai.expectedYield), yieldDelta],
    [
      "Profit",
      you.profit == null ? "—" : `GH₵${number(you.profit, 2)}`,
      ai.expectedProfit == null ? "—" : `GH₵${number(ai.expectedProfit, 2)}`,
      profitDelta,
    ],
    [
      "Environmental Score",
      you.environmentalScore == null ? "—" : number(you.environmentalScore, 0),
      ai.environmentalScore == null ? "—" : number(ai.environmentalScore, 0),
      envDelta,
    ],
  ];

  const summaryParts = [];
  if (profitDelta != null) {
    if (Math.abs(profitDelta) < 0.01) {
      summaryParts.push("keeps expected profit about the same");
    } else {
      summaryParts.push(
        `${profitDelta > 0 ? "increases" : "decreases"} expected profit by approximately GH₵${number(Math.abs(profitDelta), 2)}`
      );
    }
  }
  if (envDelta != null) {
    if (Math.abs(envDelta) < 0.5) {
      summaryParts.push("while maintaining the same environmental score");
    } else {
      summaryParts.push(
        `while ${envDelta > 0 ? "improving" : "reducing"} the environmental score by ${number(Math.abs(envDelta), 0)} points`
      );
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <ArrowRightLeft className="text-green-700 w-5 h-5" />
        <h2 className="text-xl font-semibold">Your Decision vs AI Decision</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 pr-3"></th>
              <th className="py-2 pr-3">You</th>
              <th className="py-2 pr-3">AI</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, youVal, aiVal]) => (
              <tr key={label} className="border-b last:border-0">
                <td className="py-3 pr-3 text-gray-500">{label}</td>
                <td className="py-3 pr-3 font-medium">{youVal}</td>
                <td className="py-3 pr-3 font-medium text-green-700">{aiVal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {summaryParts.length > 0 && (
        <p className="mt-5 bg-green-50 text-green-800 rounded-xl p-4">
          The AI recommendation {summaryParts.join(" ")}.
        </p>
      )}
    </Card>
  );
};

export default ComparisonPanel;
