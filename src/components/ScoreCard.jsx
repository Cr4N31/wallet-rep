import FactorsList from "./FactorsList";

function ScoreCard({ score, band, factors, summary }) {
  // Map band to Tailwind text color class
  const bandClasses = {
    safe: "text-green-500",
    caution: "text-yellow-500",
    risky: "text-red-500",
    unknown: "text-gray-500",
  };

  return (
    <div className="mt-6 border p-4 rounded shadow bg-white max-w-md mx-auto">
      <h2 className={`text-4xl font-bold ${bandClasses[band]}`}>
        {score}
      </h2>
      <p className="font-semibold mt-2">{band.toUpperCase()}</p>
      <FactorsList factors={factors} />
      <p className="mt-4">{summary}</p>
    </div>
  );
}

export default ScoreCard;
