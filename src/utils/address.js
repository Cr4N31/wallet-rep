// List of mock “bad/scam” token contracts
const SCAM_TOKENS = [
  "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  "0xfeedfacecafebabe1234567890abcdef12345678",
  "0x0badc0de0badc0de0badc0de0badc0de0badc0de",
];

// Helper: validate Ethereum address
function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Generate mock wallet factors
function generateWalletFactors() {
  const walletAgeDays = Math.floor(Math.random() * 1000); // 0–999 days
  const txCount = Math.floor(Math.random() * 6000); // 0–6000 txs
  const uniqueTokens = Math.floor(Math.random() * 20); // 0–19 tokens
  const scamInteractions = Math.floor(Math.random() * 5); // 0–4
  return { walletAgeDays, txCount, uniqueTokens, scamInteractions };
}

// Compute score based on wallet factors
function computeScore(factors) {
  let { walletAgeDays, txCount, scamInteractions } = factors;
  let score = 50;

  if (walletAgeDays > 180) score += 20;
  if (walletAgeDays > 365) score += 10;
  if (walletAgeDays < 7) score -= 15;
  if (walletAgeDays < 30) score -= 10;

  if (txCount >= 20 && txCount <= 500) score += 10;
  if (txCount >= 0 && txCount <= 3) score -= 10;
  if (txCount > 5000) score -= 10;

  if (scamInteractions === 0) score += 10;
  if (scamInteractions >= 1) score -= 30;
  if (scamInteractions >= 3) score -= 10;

  // Clamp between 0–100
  return Math.max(0, Math.min(100, score));
}

// Map numeric score to band
function getBand(score) {
  if (score >= 80) return "safe";
  if (score >= 50) return "caution";
  return "risky";
}

// Generate tags based on wallet factors
function generateTags(factors) {
  const { walletAgeDays, txCount, scamInteractions } = factors;
  const tags = [];

  if (walletAgeDays < 30) tags.push("New wallet");
  if (walletAgeDays > 365) tags.push("Old wallet");
  if (txCount > 100) tags.push("Active trader");
  if (scamInteractions > 0)
    tags.push(`Scam exposure: ${scamInteractions} token(s)`);

  return tags;
}

// GET /api/score/:address
export function getScore(address) {
  if (!isValidAddress(address)) throw new Error("Invalid address");

  const factors = generateWalletFactors();
  const score = computeScore(factors);
  const band = getBand(score);
  const tags = generateTags(factors);
  const summary = `Wallet age: ${factors.walletAgeDays} days, TXs: ${factors.txCount}, Unique tokens: ${factors.uniqueTokens}, Scam interactions: ${factors.scamInteractions}`;

  return { address, score, band, tags, factors, summary };
}

// POST /api/score/bulk
export function postBulkScore(addresses) {
  return addresses.map((address) => {
    try {
      const factors = generateWalletFactors();
      const score = computeScore(factors);
      const band = getBand(score);
      const tags = generateTags(factors);
      const summary = `Wallet age: ${factors.walletAgeDays} days, TXs: ${factors.txCount}, Unique tokens: ${factors.uniqueTokens}, Scam interactions: ${factors.scamInteractions}`;
      return { address, score, band, tags, factors, summary };
    } catch {
      return { address, score: 0, band: "unknown", tags: [], factors: {}, summary: "Invalid address" };
    }
  });
}
