import React, { useState, useEffect } from "react";
import { getPortfolio, calculatePortfolioValue, getAssetAllocation } from "../utils/portfolioUtils";
import { stocks, getRandomPrice } from "../utils/stockData";

function Portfolio() {
  const [currentPrices, setCurrentPrices] = useState({});
  const [portfolioData, setPortfolioData] = useState(null);
  const [allocation, setAllocation] = useState([]);

  const trades = getPortfolio();

  useEffect(() => {
    // Initialize prices
    const initialPrices = {};
    stocks.forEach(stock => {
      initialPrices[stock.symbol] = getRandomPrice(stock.symbol);
    });
    setCurrentPrices(initialPrices);

    // Update prices every 10 seconds
    const interval = setInterval(() => {
      const newPrices = {};
      stocks.forEach(stock => {
        newPrices[stock.symbol] = getRandomPrice(stock.symbol);
      });
      setCurrentPrices(newPrices);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Object.keys(currentPrices).length > 0) {
      const data = calculatePortfolioValue(currentPrices);
      setPortfolioData(data);
      setAllocation(getAssetAllocation(currentPrices));
    }
  }, [currentPrices]);

  return (
    <div className="portfolio-page">
      <h2>My Portfolio</h2>

      {portfolioData && (
        <div className="portfolio-summary">
          <div className="summary-card">
            <h3>Total Portfolio Value</h3>
            <p className="value">₹{portfolioData.totalValue.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <h3>Total Cost</h3>
            <p className="value">₹{portfolioData.totalCost.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <h3>Profit/Loss</h3>
            <p className={`value ${portfolioData.profitLoss >= 0 ? 'profit' : 'loss'}`}>
              ₹{portfolioData.profitLoss.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      <div className="portfolio-content">
        <div className="holdings-section">
          <h3>Current Holdings</h3>
          {portfolioData && portfolioData.holdings.length > 0 ? (
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Quantity</th>
                  <th>Avg Cost</th>
                  <th>Current Price</th>
                  <th>Current Value</th>
                  <th>P/L</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.holdings.map((holding) => (
                  <tr key={holding.stock}>
                    <td>{holding.stock}</td>
                    <td>{holding.qty}</td>
                    <td>₹{holding.avgCost.toFixed(2)}</td>
                    <td>₹{holding.currentPrice.toFixed(2)}</td>
                    <td>₹{holding.currentValue.toFixed(2)}</td>
                    <td className={holding.profitLoss >= 0 ? 'profit' : 'loss'}>
                      ₹{holding.profitLoss.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No holdings yet. Start trading to see your portfolio!</p>
          )}
        </div>

        <div className="allocation-section">
          <h3>Asset Allocation</h3>
          {allocation.length > 0 ? (
            <div className="allocation-chart">
              {allocation.map((item) => (
                <div key={item.stock} className="allocation-item">
                  <div className="allocation-label">
                    <span>{item.stock}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="allocation-bar">
                    <div
                      className="allocation-fill"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No allocation data available.</p>
          )}
        </div>
      </div>

      <div className="trade-history">
        <h3>Trade History</h3>
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => (
              <tr key={t.id}>
                <td>{t.stock}</td>
                <td>{t.qty}</td>
                <td>₹{t.price}</td>
                <td className={t.type}>{t.type.toUpperCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Portfolio;
