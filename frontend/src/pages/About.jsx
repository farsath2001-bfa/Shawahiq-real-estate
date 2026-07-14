import { Link } from 'react-router-dom';
import { Eye, Home, Clock } from 'lucide-react';
import Seo from '../components/shared/Seo';
import './About.css';

const STATS = [
  { num: '2007', label: 'Established' },
  { num: '120+', label: 'Properties Delivered' },
  { num: '18', label: 'Communities' },
  { num: '4,000+', label: 'Happy Residents' },
];

const VALUES = [
  {
    icon: Eye,
    title: 'Transparent by default',
    body: "Every price, payment milestone, and completion date is published upfront — no hidden terms discovered after you've signed.",
  },
  {
    icon: Home,
    title: 'Built on the ground',
    body: 'Our team lives and works in the communities we develop. We know the traffic patterns, the school runs, the sunset angles.',
  },
  {
    icon: Clock,
    title: 'Long-term thinking',
    body: "We hold onto projects well past handover, which means we're accountable for how a community actually feels five years in.",
  },
];

const About = () => {
  return (
    <div className="about-page">
      <Seo
        title="About Us"
        description="Nearly two decades developing residential and mixed-use communities across Dubai — transparent pricing, verified master plans, and long-term accountability."
        url="https://shawahiqrealestate.ae/about"
      />
      <section className="about-hero">
        <div className="about-hero-bg-image" style={{ backgroundImage: `url('/about-bg.svg')` }} />
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <span className="about-eyebrow">About Us</span>
          <h1>Building neighborhoods, not just towers.</h1>
        </div>
      </section>

      <section className="about-stats">
        {STATS.map((s) => (
          <div className="about-stat" key={s.label}>
            <span className="about-stat-num">{s.num}</span>
            <span className="about-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="about-story">
        <span className="section-eyebrow">Our Story</span>
        <h2>Nearly two decades in Dubai's skyline</h2>
        <p>
          Since 2007, we've developed residential and mixed-use communities across
          Dubai's most sought-after locations. What started as a single waterfront
          project has grown into a portfolio spanning marina towers, villa
          communities, and hillside residences — always with the same principle:
          a home is judged by the neighborhood around it, not just the building itself.
        </p>
        <p>
          We're RERA registered and work directly with Dubai's master developers,
          which means every project on this site is verified against its actual
          master plan and construction schedule — not a marketing brochure.
        </p>
      </section>

      <section className="about-values">
        <span className="section-eyebrow">What We Believe</span>
        <h2>The principles behind every project</h2>
        <div className="about-values-grid">
          {VALUES.map((v) => (
            <div className="about-value-card" key={v.title}>
              <v.icon size={22} strokeWidth={1.5} className="about-value-icon" />
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <h2>Want to see it for yourself?</h2>
        <p>Browse current projects or reach out directly to our team.</p>
        <div className="about-cta-buttons">
          <Link to="/projects"><button className="btn-primary-dark">Browse Projects</button></Link>
          <Link to="/contact"><button className="btn-outline-dark">Contact Us</button></Link>
        </div>
      </section>
    </div>
  );
};

export default About;