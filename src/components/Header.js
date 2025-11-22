import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <h2>Portfolio Simulator</h2>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/portfolio">Portfolio</Link>
      </nav>
    </div>
  );
}

export default Header;
