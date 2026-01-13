import { useState } from "react";
import { postBulkScore } from "../utils/address";
import { downloadCSV } from "../utils/csv";
import ErrorMessage from "../components/ErrorMessage";

function Bulk() {
  const [addressesText, setAddressesText] = useState("");
  const [bulkResults, setBulkResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const bandClasses = {
    safe: "text-green-400 bg-green-500/10",
    caution: "text-yellow-400 bg-yellow-500/10",
    risky: "text-red-400 bg-red-500/10",
    unknown: "text-gray-400 bg-gray-500/10",
  };

  const handleBulkCheck = () => {
    const addresses = addressesText
      .split("\n")
      .map((a) => a.trim())
      .filter(Boolean);

    if (addresses.length === 0) {
      setError("Please enter at least one wallet address.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      try {
        const results = postBulkScore(addresses);
        setBulkResults(results);
      } catch {
        setError("Could not fetch data, try again later.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 px-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        Bulk Wallet Check
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Analyze multiple wallets at once using on-chain risk signals
      </p>

      {/* Input Card */}
      <div className="bg-[#0b1220]/80 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-lg shadow-cyan-500/10">
        <textarea
          placeholder="Paste wallet addresses (one per line)"
          value={addressesText}
          onChange={(e) => setAddressesText(e.target.value)}
          className="w-full h-44 bg-transparent text-gray-200 placeholder-gray-500 px-4 py-3 border border-cyan-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
        />

        {error && <ErrorMessage message={error} />}

        <button
          type="button"
          onClick={handleBulkCheck}
          className="w-full mt-4 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-3 rounded-xl transition-all"
        >
          Run Bulk Check
        </button>

        {loading && (
          <p className="text-center text-gray-400 mt-4 animate-pulse">
            Analyzing wallets…
          </p>
        )}
      </div>

      {/* Results */}
      {bulkResults.length > 0 && (
        <div className="mt-10 bg-[#0b1220]/80 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-300">
              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Band</th>
                  <th className="py-3 px-4">Wallet Age</th>
                  <th className="py-3 px-4">Scam Interactions</th>
                  <th className="py-3 px-4">Tags</th>
                  <th className="py-3 px-4">Summary</th>
                </tr>
              </thead>

              <tbody>
                {bulkResults.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3 font-mono text-xs">
                      {row.address}
                    </td>
                    <td className="px-4 py-3">{row.score}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${bandClasses[row.band]}`}
                      >
                        {row.band.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {row.factors.walletAgeDays} days
                    </td>
                    <td className="px-4 py-3">
                      {row.factors.scamInteractions}
                    </td>
                    <td className="px-4 py-3">
                      {row.tags?.length ? row.tags.join(", ") : "None"}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {row.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => downloadCSV(bulkResults)}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-2 px-6 rounded-xl transition shadow shadow-cyan-500/20"
            >
              Download CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bulk;
