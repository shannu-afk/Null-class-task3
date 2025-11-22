import { createContext, useState } from "react";

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);

  const addTransaction = (stock, qty, price, type) => {
    setPortfolio(prev => [
      ...prev,
      { stock, qty, price, type }
    ]);
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, addTransaction }}>
      {children}
    </PortfolioContext.Provider>
  );
};
