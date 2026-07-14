import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Search, Heart } from 'lucide-react';
import './Navbar.css';

// lucide-react removed brand/logo icons (Facebook, Instagram, LinkedIn) —
// using small inline SVGs instead, same fix as the Solo Heights project.
const FacebookIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02ZM3.25 8.75h3.4V21h-3.4V8.75Zm6.06 0h3.26v1.68h.05c.45-.86 1.56-1.77 3.22-1.77 3.44 0 4.08 2.27 4.08 5.22V21h-3.4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96V21h-3.19V8.75Z" />
  </svg>
);

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Communities', path: '/communities' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="navbar">
      {/* UTILITY BAR */}
      {/* <div className="navbar-utility">
        <div className="navbar-utility-inner">
          <a href="tel:+971561119233" className="navbar-utility-item">
            <Phone size={13} strokeWidth={2} />
            +971 56 111 9233
          </a>
          <div className="navbar-utility-social">
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="LinkedIn"><LinkedinIcon /></a>
          </div>
        </div>
      </div> */}

      {/* MAIN BAR */}
      <div className="navbar-main">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="navbar-logo-text">SHAWAHIQ</span>
            <span className="navbar-logo-sub">Real Estate</span>
          </Link>

          <nav className="navbar-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="navbar-actions">
            <button className="navbar-icon-btn" aria-label="Search">
              <Search size={18} strokeWidth={1.75} />
            </button>
            <button className="navbar-icon-btn" aria-label="Wishlist">
              <Heart size={18} strokeWidth={1.75} />
            </button>
            <Link to="/contact" className="navbar-cta-wrap">
              <button className="navbar-cta">Enquire Now</button>
            </Link>
          </div>

          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="navbar-mobile-menu">
          {NAV_LINKS.map((link) => (
            <Link key={link.path} to={link.path} className="navbar-mobile-link">
              {link.name}
            </Link>
          ))}
          <a href="tel:+971561119233">
            <button className="navbar-cta navbar-cta-mobile">
              <Phone size={16} strokeWidth={2} />
              +971 56 111 9233
            </button>
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;