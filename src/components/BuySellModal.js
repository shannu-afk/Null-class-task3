import React, { useState } from "react";

function BuySellModal({ open, stock, price, type, confirm, close }) {
  const [qty, setQty] = useState("");

  if (!open) return null;

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>{type.toUpperCase()} {stock.symbol}</h2>
        <p>Price: ₹{price}</p>

        <input
          type="number"
          placeholder="Enter Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <button
          className={type === "buy" ? "btn-buy" : "btn-sell"}
          onClick={() => confirm(qty)}
        >
          Confirm {type.toUpperCase()}
        </button>

        <button className="btn-close" onClick={close}>Cancel</button>
      </div>
    </div>
  );
}

export default BuySellModal;
