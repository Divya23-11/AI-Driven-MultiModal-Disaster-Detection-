import { Link, useLocation } from "react-router-dom";
import "../App.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar-glass navbar-large">
      <div className="brand">
        <span className="brand-dot"></span>
        <span className="brand-text">AI Disaster System</span>
      </div>

      <div className="nav-menu">
        <NavItem to="/" label="Home" active={location.pathname === "/"} />
        <NavItem to="/about" label="About" active={location.pathname === "/about"} />
         <NavItem to="/response" label="Response" active={location.pathname === "/response"} />
        <NavItem to="/image" label="Image" active={location.pathname === "/image"} />
        <NavItem to="/text" label="Text" active={location.pathname === "/text"} />
        <NavItem to="/sensor" label="Sensor" active={location.pathname === "/sensor"} />
        <NavItem to="/fusion" label="Fusion" active={location.pathname === "/fusion"} />
        <NavItem to="/weather" label="Weather" active={location.pathname === "/weather"} />
      </div>
    </nav>
  );
}

function NavItem({ to, label, active }) {
  return (
    <Link to={to} className={`nav-item ${active ? "active" : ""}`}>
      {label}
      <span className="underline"></span>
    </Link>
  );
}

export default Navbar;
