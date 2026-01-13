// src/pages/Bulk.jsx
import { useState } from "react";
import { postBulkScore } from "../utils/address";
import { downloadCSV } from '../utils/csv';
import ErrorMessage from "../components/ErrorMessage";

function Bulk() {
  const [addressesText, setAddressesText] = useState("");
  const [bulkResults, setBulkResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Map band to Tailwind color classes
  const bandClasses = {
    safe: "text-green-600 font-semibold",
    caution: "text-yellow-600 font-semibold",
    risky: "text-red-600 font-semibold",
    unknown: "text-gray-500 font-semibold",
  };

  // Handle bulk check
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
        const results = postBulkScore(addresses); // call mock API
        setBulkResults(results);
      } catch {
        setError("Could not fetch data, try again later.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-md" data-aos="fade-up">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Bulk Wallet Check
      </h1>

      <textarea
        placeholder="Paste wallet addresses, one per line"
        value={addressesText}
        onChange={(e) => setAddressesText(e.target.value)}
        className="w-full h-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4 resize-none"
      ></textarea>

      {error && <ErrorMessage message={error} />}

      <button
        type="button"
        onClick={handleBulkCheck}
        className="w-full bg-teal-500 text-white font-semibold py-2 rounded-md hover:bg-teal-600 transition-colors mb-4"
      >
        Run Bulk Check
      </button>

      {loading && <p className="text-center">Loading...</p>}

      {bulkResults.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Score</th>
                <th className="border px-4 py-2">Band</th>
                <th className="border px-4 py-2">Summary</th>
              </tr>
            </thead>
            <tbody>
              {bulkResults.map((row, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{row.address}</td>
                  <td className="border px-4 py-2">{row.score}</td>
                  <td className={`border px-4 py-2 ${bandClasses[row.band]}`}>
                    {row.band.toUpperCase()}
                  </td>
                  <td className="border px-4 py-2">{row.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => downloadCSV(bulkResults)}
            className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors"
          >
            Download CSV
          </button>
        </div>
      )}
    </div>
  );
}

export default Bulk;
