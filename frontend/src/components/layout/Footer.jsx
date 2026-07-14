import { Link } from 'react-router-dom';
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
              Luxury · Trust · Investment. Dubai off-plan and ready properties, backed by transparent pricing.
            </p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/projects">Projects</Link>
            <Link to="/communities">Communities</Link>
            <Link to="/about">About</Link>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms</Link>
          </div>

          <div className="footer-col">
            <h4>Get in touch</h4>
            <a href="tel:+971561119233">+971 56 111 9233</a>
            <a href="mailto:info@shawahiqrealestate.ae">info@shawahiqrealestate.ae</a>
            <span className="footer-address">Business Bay, Dubai, UAE</span>
          </div>
        </div>

        {/* MAP */}
        <div className="footer-map-section">
          <h4>Find Us</h4>
          <div className="footer-map-wrap">
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
        </div>

        <div className="footer-social">
          <a href="#" aria-label="Facebook" className="footer-social-link"><FacebookIcon /></a>
          <a href="#" aria-label="Instagram" className="footer-social-link"><InstagramIcon /></a>
          <a href="https://wa.me/971561119233" aria-label="WhatsApp" className="footer-social-link" target="_blank" rel="noopener noreferrer"><WhatsappIcon /></a>
          <a href="#" aria-label="YouTube" className="footer-social-link"><YoutubeIcon /></a>
          <a href="#" aria-label="LinkedIn" className="footer-social-link"><LinkedinIcon /></a>
        </div>

        <div className="footer-bottom">
          <span>© {year} Shawahiq Real Estate. All rights reserved.</span>
          <span>RERA registered · Dubai, UAE</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;