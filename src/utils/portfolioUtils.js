export function addTrade(stock, qty, price, type) {
  const trades = JSON.parse(localStorage.getItem("portfolio")) || [];

  trades.push({
    id: Date.now(),
    stock,
    qty: Number(qty),
    price: Number(price),
    type,
  });

  localStorage.setItem("portfolio", JSON.stringify(trades));
}

export function getPortfolio() {
  return JSON.parse(localStorage.getItem("portfolio")) || [];
}

export function calculatePortfolioValue(currentPrices) {
  const trades = getPortfolio();
  let holdings = {};

  // Calculate holdings
  trades.forEach(trade => {
    if (!holdings[trade.stock]) {
      holdings[trade.stock] = { qty: 0, totalCost: 0 };
    }

    if (trade.type === 'buy') {
      holdings[trade.stock].qty += trade.qty;
      holdings[trade.stock].totalCost += trade.qty * trade.price;
    } else if (trade.type === 'sell') {
      holdings[trade.stock].qty -= trade.qty;
      holdings[trade.stock].totalCost -= trade.qty * trade.price;
    }
  });

  // Calculate current value and profit/loss
  let totalCost = 0;
  let totalCurrentValue = 0;
  let profitLoss = 0;

  Object.keys(holdings).forEach(stock => {
    const holding = holdings[stock];
    if (holding.qty > 0) {
      const currentPrice = currentPrices[stock] || 0;
      const currentValue = holding.qty * currentPrice;
      totalCurrentValue += currentValue;
      totalCost += holding.totalCost;
      profitLoss += currentValue - holding.totalCost;
    }
  });

  return {
    totalValue: totalCurrentValue,
    totalCost,
    profitLoss,
    holdings: Object.keys(holdings).filter(stock => holdings[stock].qty > 0).map(stock => ({
      stock,
      qty: holdings[stock].qty,
      avgCost: holdings[stock].totalCost / holdings[stock].qty,
      currentPrice: currentPrices[stock] || 0,
      currentValue: holdings[stock].qty * (currentPrices[stock] || 0),
      profitLoss: (holdings[stock].qty * (currentPrices[stock] || 0)) - holdings[stock].totalCost
    }))
  };
}

export function getAssetAllocation(currentPrices) {
  const portfolio = calculatePortfolioValue(currentPrices);
  const totalValue = portfolio.totalValue;

  if (totalValue === 0) return [];

  return portfolio.holdings.map(holding => ({
    stock: holding.stock,
    percentage: ((holding.currentValue / totalValue) * 100).toFixed(2),
    value: holding.currentValue
  })).sort((a, b) => b.value - a.value);
}
