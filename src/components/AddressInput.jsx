function AddressInput({ address, setAddress, onSubmit }) {
  return (
    <div
      className="max-w-2xl mx-auto mt-16 sm:mt-24 px-4 sm:px-6"
      data-aos="fade-up"
    >
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-2">
        Wallet<span className="text-cyan-400">Rep</span>
      </h1>

      <p className="text-center text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
        Instant wallet reputation & risk score powered by on-chain analysis
      </p>

      {/* Input container */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 bg-[#0b1220] border border-cyan-500/20 rounded-2xl p-2 shadow-lg shadow-cyan-500/10">
        <input
          type="text"
          placeholder="Enter wallet address (0x...)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-transparent text-gray-200 placeholder-gray-500 px-4 py-3 focus:outline-none text-sm sm:text-base"
        />

        <button
          type="button"
          onClick={onSubmit}
          className="w-full sm:w-auto flex justify-center items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-5 sm:px-6 py-3 rounded-xl transition-all"
        >
          Check Wallet
        </button>
      </div>
    </div>
  );
}

export default AddressInput;
