import { Link } from 'react-router-dom';
import { Eye, Home, Clock } from 'lucide-react';
import Seo from '../components/shared/Seo';
import Counter from '../components/shared/Counter';
import './About.css';

const STATS = [
  { end: 2007, suffix: '', separator: false, label: 'Established' },
  { end: 120, suffix: '+', separator: false, label: 'Properties Delivered' },
  { end: 18, suffix: '', separator: false, label: 'Communities' },
  { end: 4000, suffix: '+', separator: true, label: 'Happy Residents' },
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
            <span className="about-stat-num">
              <Counter end={s.end} suffix={s.suffix} separator={s.separator} />
            </span>
            <span className="about-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="about-story">
        <div className="about-story-text">
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
        </div>
        <div className="about-story-image" style={{ backgroundImage: `url('/about-story.jpg')` }} />
      </section>

      <section className="about-timeline">
        <span className="section-eyebrow">Milestones</span>
        <h2>How we got here</h2>
        <div className="about-timeline-track">
          <div className="about-timeline-item">
            <span className="about-timeline-year">2007</span>
            <p>First waterfront project broke ground in Dubai</p>
          </div>
          <div className="about-timeline-item">
            <span className="about-timeline-year">2014</span>
            <p>Expanded into villa communities and master-planned neighborhoods</p>
          </div>
          <div className="about-timeline-item">
            <span className="about-timeline-year">2020</span>
            <p>Crossed 100 residential handovers across Dubai</p>
          </div>
          <div className="about-timeline-item">
            <span className="about-timeline-year">Today</span>
            <p>Active across 10+ communities with transparent, verified listings</p>
          </div>
        </div>
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