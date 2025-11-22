# 📊 Advanced Stock Portfolio Simulator (React.js)

This project is a **React-based stock trading simulator** where users can view real-time changing stock prices, simulate buy/sell actions, and track their portfolio in a clean user interface.

---

## 🚀 Features

- Live auto-updating stock prices (simulated)
- Buy & Sell stocks with modal interface
- Portfolio page showing:
  - Stock Name
  - Quantity
  - Price
  - Buy/Sell Type
  - Profit/Loss Calculation
- Realistic stock attributes:
  - Market Cap
  - Volume
  - 24H High / Low
  - Price Difference
  - Price Change (%)
- Smooth UI and clean card layout

---

## 📁 Project Structure

```
src/
├── components/
│   ├── StockCard.js
│   ├── BuySellModal.js
│   ├── StockCard.css
├── pages/
│   ├── Dashboard.js
│   ├── Portfolio.js
├── utils/
│   ├── stockData.js
│   ├── portfolioUtils.js
├── App.js
└── index.js
```

---

## 🛠 Installation & Setup

### Clone repo
```bash
git clone https://github.com/shannu-afk/Null-class-task3.git
```

### Install dependencies
```bash
npm install
```

### Start app
```bash
npm start
```

Runs at: **http://localhost:3000**

---

## 🧠 How It Works

- Prices refresh every 1–2 seconds using simulated random percentage changes.
- Portfolio stores trades in localStorage.
- Profit/Loss is calculated dynamically on every price update.
- UI uses React components with state-based re-rendering.

---

## 🐙 Git Commands (Push to GitHub)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

---

## 📌 Future Enhancements

- Replace fake prices with real APIs (e.g., Yahoo Finance, Alpha Vantage)
- Add stock charts (candlestick, line charts)
- Add authentication & user accounts
- Add advanced analytics page
- Add themes (dark/light mode)

---

## 👨‍💻 Author
**Shanmukh**

---

## 📜 License
MIT License – Free to use and modify.

