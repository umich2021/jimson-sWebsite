import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ tone = "fun" }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-name">
          Jimson Yang
        </Link>
        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/jobs">Hiring me?</Link>
          <a href="https://aventos.dev" target="_blank" rel="noreferrer">
            Aventos
          </a>
        </nav>
      </div>
    </header>
  );
}
