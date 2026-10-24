import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "./authService";
import "./NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  useLocation(); // re-renders the bar on every page change so login/logout state stays fresh
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        DEV@Deakin
      </Link>

      <input
        className="navbar-search"
        type="search"
        placeholder="Search..."
        aria-label="Search"
      />

      <nav className="navbar-links">
        {/* Search will be implemented in a future task */}
        <Link to="/profile">Profile</Link>
        <Link to="/post">Post</Link> {/* CHANGED: was to="/" */}
        {user ? (
          <button type="button" className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}