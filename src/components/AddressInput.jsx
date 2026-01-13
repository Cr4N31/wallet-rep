function AddressInput({ address, setAddress, onSubmit }) {
  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md" data-aos="fade-up">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        WalletRep - Wallet Reputation & Score
      </h1>

      <input
        type="text"
        placeholder="Input wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
      />

      <button
        type="button"
        onClick={onSubmit}
        className="w-full bg-teal-500 text-white font-semibold py-2 rounded-md hover:bg-teal-600 transition-colors"
      >
        Check
      </button>
    </div>
  );
}

export default AddressInput;
