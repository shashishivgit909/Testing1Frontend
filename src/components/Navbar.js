import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // close menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="navbar-container">

          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-mark">
              <span className="logo-icon">⚡</span>
            </div>
            <div className="logo-text">
              <span className="logo-name">POWER<span>FIT</span></span>
              <span className="logo-tagline">Elite Fitness</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/about', label: 'About' },
              { to: '/gallery', label: 'Gallery' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className={({ isActive }) => isActive ? 'active' : ''}>
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/register" className={({ isActive }) => `nav-cta ${isActive ? 'active' : ''}`}>
                <span>Join Now</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </NavLink>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-inner">
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/about', label: 'About Us' },
              { to: '/gallery', label: 'Gallery' },
              { to: '/contact', label: 'Contact' },
              { to: '/register', label: 'Join Now 💪', cta: true },
            ].map(({ to, label, end, cta }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `mobile-link ${cta ? 'mobile-cta' : ''} ${isActive ? 'active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
