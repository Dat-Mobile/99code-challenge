import React, { useState } from "react";
import "./style.css";

const tokens = [
  { symbol: "ETH", name: "Ethereum", img: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029" },
  { symbol: "USDT", name: "Tether", img: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=029" },
  { symbol: "BTC", name: "Bitcoin", img: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029" },
];

export default function App() {
  const [from, setFrom] = useState("ETH");
  const [to, setTo] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Simulate fetching price
  const getRate = (from, to) => {
    if (from === to) return 1;
    if (from === "ETH" && to === "USDT") return 3200;
    if (from === "USDT" && to === "ETH") return 1 / 3200;
    if (from === "BTC" && to === "USDT") return 60000;
    if (from === "USDT" && to === "BTC") return 1 / 60000;
    if (from === "ETH" && to === "BTC") return 3200 / 60000;
    if (from === "BTC" && to === "ETH") return 60000 / 3200;
    return 1;
  };

  const handleSwap = (e) => {
    e.preventDefault();
    setError("");
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const rate = getRate(from, to);
      setResult((Number(amount) * rate).toFixed(6));
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="swap-container">
      <form className="swap-form" onSubmit={handleSwap}>
        <h2>Currency Swap</h2>
        <div className="swap-row">
          <label>From</label>
          <select value={from} onChange={e => setFrom(e.target.value)}>
            {tokens.map(t => (
              <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
            ))}
          </select>
          <img src={tokens.find(t => t.symbol === from).img} alt={from} className="token-img" />
        </div>
        <div className="swap-row">
          <label>To</label>
          <select value={to} onChange={e => setTo(e.target.value)}>
            {tokens.map(t => (
              <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
            ))}
          </select>
          <img src={tokens.find(t => t.symbol === to).img} alt={to} className="token-img" />
        </div>
        <div className="swap-row">
          <label>Amount</label>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Swapping..." : "CONFIRM SWAP"}
        </button>
        {result && !loading && (
          <div className="result">
            You receive: <b>{result} {to}</b>
          </div>
        )}
      </form>
    </div>
  );
}