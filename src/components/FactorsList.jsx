function FactorsList({ factors }) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-gray-400 mb-2">
        Risk Factors
      </h3>

      <ul className="space-y-2">
        {Object.entries(factors).map(([key, value]) => (
          <li
            key={key}
            className="flex justify-between items-center bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
          >
            <span className="text-gray-400 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            <span className="text-gray-200 font-mono">
              {value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FactorsList;
