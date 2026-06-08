import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />

      <div className="footer-top">
        <div className="footer-container">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-mark">⚡</div>
              <div>
                <span className="footer-logo-name">POWER<span>FIT</span></span>
                <span className="footer-logo-sub">Elite Fitness</span>
              </div>
            </div>
            <p>We don't just build bodies — we build character. Mumbai's premier fitness destination since 2014.</p>
            <div className="footer-social">
              {['📸 Instagram', '👥 Facebook', '▶️ YouTube', '💬 WhatsApp'].map((s, i) => (
                <a key={i} href="#!" className="footer-social-btn" aria-label={s.split(' ')[1]}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact' },
                { to: '/register', label: 'Join Now' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>
                    <span className="link-arrow">→</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="footer-col">
            <h4>Programs</h4>
            <ul>
              {['Weight Training', 'Yoga & Wellness', 'Cardio Zone', 'Boxing & MMA', 'Nutrition Plans', 'Personal Training'].map(p => (
                <li key={p}><a href="#!"><span className="link-arrow">→</span>{p}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <span>📍</span>
                <p>123 Fitness Avenue, Andheri West<br />Mumbai, MH 400053</p>
              </div>
              <div className="footer-contact-item">
                <span>📞</span>
                <p>+91 98765 43210</p>
              </div>
              <div className="footer-contact-item">
                <span>✉️</span>
                <p>info@powerfit.com</p>
              </div>
              <div className="footer-contact-item">
                <span>🕐</span>
                <p>Mon–Sat: 5 AM – 10 PM<br />Sunday: 7 AM – 8 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {year} PowerFit Gym. All rights reserved. Built with 💪 in Mumbai.</p>
          <div className="footer-bottom-links">
            <a href="#!">Privacy Policy</a>
            <a href="#!">Terms of Service</a>
            <a href="#!">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
