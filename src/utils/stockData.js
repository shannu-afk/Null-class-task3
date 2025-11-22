export const stocks = [
  { symbol: "AAPL", name: "Apple", marketCap: "2.7T", high52: 198, low52: 120 },
  { symbol: "TSLA", name: "Tesla", marketCap: "800B", high52: 320, low52: 140 },
  { symbol: "MSFT", name: "Microsoft", marketCap: "3.0T", high52: 370, low52: 250 },
  { symbol: "GOOGL", name: "Google", marketCap: "1.9T", high52: 160, low52: 90 },
  { symbol: "AMZN", name: "Amazon", marketCap: "1.7T", high52: 180, low52: 100 }
];

// Generate realistic price with variation
export function getRandomPrice(symbol) {
  const base = {
    AAPL: 150,
    TSLA: 270,
    MSFT: 300,
    GOOGL: 140,
    AMZN: 160,
  };

  let price = base[symbol] + (Math.random() * 12 - 6);
  return Number(price.toFixed(2));
}
