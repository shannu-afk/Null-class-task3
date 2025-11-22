import React from "react";
import "./StockCard.css";

function StockCard({ stock, price, change, extra, onBuy, onSell }) {
  
  return (
    <div className="stock-card">
      <h3>{stock.symbol}</h3>
      <p>{stock.name}</p>

      <h2>₹{price}</h2>

      {/* PRICE CHANGE FIX */}
      {change && (
        <p style={{ color: change.diff > 0 ? "green" : "red", fontWeight: "bold" }}>
          {change.diff > 0 ? "+" : ""}
          {change.diff} ({change.diffPercent}%)
        </p>
      )}

      {/* Extra realistic market data */}
      {extra && (
        <div className="extra">
          <p>Open: ₹{extra.open}</p>
          <p>High: ₹{extra.high}</p>
          <p>Low: ₹{extra.low}</p>
          <p>Volume: {extra.volume.toLocaleString()}</p>
          <p>Market Cap: {extra.marketCap}</p>
        </div>
      )}

      <div className="actions">
        <button className="buy" onClick={onBuy}>BUY</button>
        <button className="sell" onClick={onSell}>SELL</button>
      </div>
    </div>
  );
}

export default StockCard;
