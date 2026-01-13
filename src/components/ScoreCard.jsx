import FactorsList from "./FactorsList";

function ScoreCard({ score, band, factors, summary }) {
  const bandStyles = {
    safe: {
      text: "text-green-400",
      bg: "bg-green-500/10",
      ring: "ring-green-500/30",
    },
    caution: {
      text: "text-yellow-400",
      bg: "bg-yellow-500/10",
      ring: "ring-yellow-500/30",
    },
    risky: {
      text: "text-red-400",
      bg: "bg-red-500/10",
      ring: "ring-red-500/30",
    },
    unknown: {
      text: "text-gray-400",
      bg: "bg-gray-500/10",
      ring: "ring-gray-500/30",
    },
  };

  const style = bandStyles[band] || bandStyles.unknown;

  return (
    <div className="mt-10 max-w-md mx-auto bg-[#0b1220]/80 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-lg shadow-cyan-500/10">
      {/* Score */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400">Risk Score</p>
          <h2 className={`text-5xl font-bold ${style.text}`}>
            {score}
          </h2>
        </div>

        {/* Band pill */}
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${style.text} ${style.bg} ring-1 ${style.ring}`}
        >
          {band.toUpperCase()}
        </span>
      </div>

      {/* Factors */}
      <FactorsList factors={factors} />

      {/* Summary */}
      <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
        <p className="text-sm text-gray-300">{summary}</p>
      </div>
    </div>
  );
}

export default ScoreCard;
