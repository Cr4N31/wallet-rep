import { useState } from "react";
import { getScore } from "../utils/address";
import AddressInput from "../components/AddressInput";
import ScoreCard from "../components/ScoreCard";
import ErrorMessage from "../components/ErrorMessage";

function Home() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simple wallet address validator
  const isValidAddress = (addr) => /^0x[a-fA-F0-9]{40}$/.test(addr);
  const handleCheck = () => {
    if (!isValidAddress(address)) {
        setError('Please enter a valid wallet address.');
        setResult(null);
        return;
    }

    setError('');
    setResult(null);
    setLoading(true);

    // Simulate API call with 500ms delay
    setTimeout(() => {
        try {
        // Randomly fail to simulate API error (20% chance)
        if (Math.random() < 0.2) {
            throw new Error("Mock API failure");
        }

        const data = getScore(address); // call mock API
        setResult(data);
        } catch (err) {
        // Show user-friendly error message
        setError("Could not fetch data, try again later.");
        } finally {
        setLoading(false);
        }
    }, 500);
    };

  return (
    <div className="max-w-xl mx-auto p-4 text-center" data-aos="fade-up">
      {/* Address input + submit */}
      <AddressInput
        address={address}
        setAddress={setAddress}
        onSubmit={handleCheck}
      />

      {/* Error message */}
      {error && <ErrorMessage message={error} />}

      {/* Loading */}
      {loading && <p className="mt-4">Loading...</p>}

      {/* Result */}
      {result && (
        <ScoreCard
          score={result.score}
          band={result.band}
          factors={result.factors}
          summary={result.summary}
        />
      )}
    </div>
  );
}

export default Home;
