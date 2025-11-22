import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { PortfolioProvider } from "./context/PortfolioContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PortfolioProvider>
    <App />
  </PortfolioProvider>
);
