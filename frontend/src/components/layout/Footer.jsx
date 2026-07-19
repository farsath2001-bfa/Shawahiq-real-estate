import { Link } from 'react-router-dom';
import { Navigation, MapPin, Phone, Mail } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, WhatsappIcon } from '../shared/SocialIcons';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/logo.png" alt="Shawahiq Real Estate" className="footer-logo-img" />
            <p className="footer-tagline">
              Your trusted partner for premium real estate in Dubai and across the UAE.
            </p>

            <div className="footer-social">
              <a href="#" aria-label="Facebook" className="footer-social-link"><FacebookIcon /></a>
              <a href="#" aria-label="Instagram" className="footer-social-link"><InstagramIcon /></a>
              <a href="https://wa.me/971561119233" aria-label="WhatsApp" className="footer-social-link" target="_blank" rel="noopener noreferrer"><WhatsappIcon /></a>
              <a href="#" aria-label="LinkedIn" className="footer-social-link"><LinkedinIcon /></a>
              <a href="#" aria-label="YouTube" className="footer-social-link"><YoutubeIcon /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/">→ Home</Link>
            <Link to="/projects">→ Projects</Link>
            <Link to="/communities">→ Communities</Link>
            <Link to="/about">→ About Us</Link>
            <Link to="/contact">→ Contact</Link>
            <Link to="/privacy-policy">→ Privacy &amp; Terms</Link>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <span className="footer-contact-item">
              <MapPin size={15} strokeWidth={2} />
              Business Bay, Dubai, UAE
            </span>
            <a href="tel:+971561119233" className="footer-contact-item">
              <Phone size={15} strokeWidth={2} />
              +971 56 111 9233
            </a>
            <a href="mailto:info@shawahiqrealestate.ae" className="footer-contact-item">
              <Mail size={15} strokeWidth={2} />
              info@shawahiqrealestate.ae
            </a>

            <div className="footer-map-wrap">
              <span className="footer-map-badge">Maps ↗</span>
              <iframe
                title="Office location — Business Bay, Dubai"
                src="https://www.google.com/maps?q=Business%20Bay%2C%20Dubai%2C%20UAE&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Business+Bay+Dubai+UAE"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-directions-link"
            >
              <Navigation size={13} strokeWidth={2} />
              Open in Google Maps →
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Shawahiq Real Estate L.L.C. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;