# WalletRep – Wallet Reputation & Score

WalletRep is a frontend React application that allows users to check the reputation and risk score of Ethereum-style wallets, either individually or in bulk. It uses a mock API for scoring and is designed to be demo-ready and easy to extend with a real backend later.

---

## Features

### Single Wallet Check
- Enter a wallet address and get a score (0–100)
- Risk band classification:
  - Safe
  - Caution
  - Risky
  - Unknown
- Displays scoring factors:
  - Wallet age
  - Transaction count
  - Unique tokens
  - Scam interactions
- Human-readable summary

### Bulk Wallet Check
- Paste multiple wallet addresses (one per line)
- View results in a table:
  - Address
  - Score
  - Band (color-coded)
  - Summary
- Download results as a CSV file

### UI & UX
- Clean, minimal design
- Responsive and mobile-friendly
- Header navigation between Home and Bulk pages
- Active route highlighting

### Mock API
- Frontend-only implementation
- Simulates wallet scoring logic
- Easy to replace with real API endpoints later

---

## Tech Stack

- React
- React Router
- Tailwind CSS
- JavaScript
- Mock API utilities

---

## Project Structure


walletrep/
│
├── src/
│   ├── components/
│   │   ├── AddressInput.jsx      # Input field and submit button for single wallet
│   │   ├── ErrorMessage.jsx      # Displays validation or API errors
│   │   ├── FactorsList.jsx       # Bullet list of scoring factors
│   │   ├── ScoreCard.jsx         # Displays score, band, summary
│   │   └── Header.jsx            # Navigation between Home and Bulk
│   │
│   ├── pages/
│   │   ├── Home.jsx              # Single wallet check page
│   │   └── Bulk.jsx              # Bulk wallet check page
│   │
│   ├── utils/
│   │   ├── address.js            # Mock API functions: getScore & postBulkScore
│   │   └── csv.js                # CSV download utility
│   │
│   └── App.jsx                   # Main router and page layout
│
├── package.json
├── tailwind.config.js
└── README.md

## Usage

## Home Page (/)

1. Enter a single wallet address
2. Click Check
3. View score, band, factors, and summary

## Bulk Page (/bulk)
1. Paste multiple wallet addresses (one per line)
2. Click Run Bulk Check
3. View results table with color-coded bands
4. Download CSV of results

## Future Improvements
1. Integrate real blockchain data providers
2. Add pagination for bulk results
3. Cache previous checks
4. Improve table UX for large datasets


   
---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- 
npm run dev    # Vite
# or
npm start      # Create React App

### Install dependencies

```bash
npm install
# or
yarn install
