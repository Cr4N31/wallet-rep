// src/utils/address.js

// Helper to generate random score/band for demo
function randomScore() {
  const score = Math.floor(Math.random() * 101);
  let band = "unknown";

  if (score >= 75) band = "safe";
  else if (score >= 50) band = "caution";
  else if (score >= 25) band = "risky";

  return { score, band };
}

// GET /api/score/:address
export function getScore(address) {
  // validate address
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error("Invalid address");
  }

  const { score, band } = randomScore();

  return {
    address,
    score,
    band,
    tags: ["demo"],
    factors: {
      walletAgeDays: Math.floor(Math.random() * 1000),
      txCount: Math.floor(Math.random() * 5000),
      uniqueTokens: Math.floor(Math.random() * 50),
      scamInteractions: Math.floor(Math.random() * 5)
    },
    summary: `This is a mock summary for address ${address}.`
  };
}

// POST /api/score/bulk
export function postBulkScore(addresses) {
  return addresses.map((address) => {
    try {
      const { score, band } = randomScore();
      return {
        address,
        score,
        band,
        summary: `Mock summary for ${address}`
      };
    } catch {
      return {
        address,
        score: 0,
        band: "unknown",
        summary: "Invalid address"
      };
    }
  });
}
