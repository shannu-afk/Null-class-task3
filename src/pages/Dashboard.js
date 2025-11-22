import React, { useEffect, useState, useCallback, useRef } from "react";
import { stocks, getRandomPrice } from "../utils/stockData";
import StockCard from "../components/StockCard";
import BuySellModal from "../components/BuySellModal";
import { addTrade } from "../utils/portfolioUtils";

function Dashboard() {
  const [prices, setPrices] = useState({});
  const [changes, setChanges] = useState({});
  const [extraData, setExtraData] = useState({});
  const [modal, setModal] = useState({ open: false });
  const prevPricesRef = useRef({});

  // ---------------------------------------------
  // Update Prices With useCallback (fixes warning)
  // ---------------------------------------------
  const updatePrices = useCallback(() => {
    let newPrices = {};
    let newChanges = {};
    let newExtraData = {};

    stocks.forEach((s) => {
      const oldPrice = prevPricesRef.current[s.symbol] || getRandomPrice(s.symbol);
      const newPrice = getRandomPrice(s.symbol);

      const diff = Number((newPrice - oldPrice).toFixed(2));
      const diffPercent = Number(((diff / oldPrice) * 100).toFixed(2));

      newPrices[s.symbol] = newPrice;
      newChanges[s.symbol] = { diff, diffPercent };

      // Adding realistic attributes
      newExtraData[s.symbol] = {
        open: Number((newPrice * 0.98).toFixed(2)),
        high: Number((newPrice * 1.03).toFixed(2)),
        low: Number((newPrice * 0.97).toFixed(2)),
        volume: Math.floor(Math.random() * 900000 + 100000),
        marketCap: (Math.random() * 900 + 100).toFixed(2) + "B",
      };
    });

    prevPricesRef.current = newPrices;
    setPrices(newPrices);
    setChanges(newChanges);
    setExtraData(newExtraData);

  }, []);

  // ---------------------------------------------
  // Run Updates Every 10s
  // ---------------------------------------------
  useEffect(() => {
    updatePrices();
    const interval = setInterval(updatePrices, 5000);
    return () => clearInterval(interval);
  }, [updatePrices]);


  // ---------------------------------------------
  // Open Buy/Sell Modal
  // ---------------------------------------------
  const openModal = (stock, type) => {
    setModal({
      open: true,
      stock,
      price: prices[stock.symbol],
      type,
    });
  };

  // ---------------------------------------------
  // Confirm Trade Save
  // ---------------------------------------------
  const confirmTrade = (qty) => {
    addTrade(modal.stock.symbol, qty, modal.price, modal.type);
    alert("Trade successful!");
    setModal({ open: false });
  };

  // ---------------------------------------------
  // UI Rendering
  // ---------------------------------------------
  return (
    <div className="container">
      <h1 style={{
        textAlign: 'center',
        color: '#fff',
        fontSize: '4em',
        marginBottom: '50px',
        fontWeight: '900',
        textShadow: '4px 4px 8px rgba(0,0,0,0.5)',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '2px'
      }}>📈 Live Market Dashboard</h1>

      {stocks.map((s) => (
        <StockCard
          key={s.symbol}
          stock={s}
          price={prices[s.symbol]}
          change={changes[s.symbol]}
          extra={extraData[s.symbol]}
          onBuy={() => openModal(s, "buy")}
          onSell={() => openModal(s, "sell")}
        />
      ))}

      <BuySellModal
        open={modal.open}
        stock={modal.stock || {}}
        price={modal.price}
        type={modal.type}
        confirm={confirmTrade}
        close={() => setModal({ open: false })}
      />
    </div>
  );
}

export default Dashboard;
