import { useTheme } from '../context/ThemeContext';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">🏡</span>
          <span className="brand-text">Mortgage Calculator</span>
        </div>

        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            🏠 Home
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            📋 History
          </NavLink>
        </div>

        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? (
            <>
              <span className="theme-icon">☀️</span>
              <span className="theme-text">Light</span>
            </>
          ) : (
            <>
              <span className="theme-icon">🌙</span>
              <span className="theme-text">Dark</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

