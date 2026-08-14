
// Generic 0-100 score pill. Used for the AI optimization score today;
// reusable anywhere else a 0-100 backend score needs a colored badge.
const ScoreBadge = ({ score, label = "Score" }) => {
  if (score == null) return null;

  let badgeColor = "bg-red-100 text-red-700";
  if (score >= 90) badgeColor = "bg-green-100 text-green-700";
  else if (score >= 70) badgeColor = "bg-yellow-100 text-yellow-700";
  else if (score >= 50) badgeColor = "bg-orange-100 text-orange-700";

  return (
    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeColor}`}>
      {score}/100 {label}
    </span>
  );
};

export default ScoreBadge;
