import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, TrendingUp, Users, MapPin, Quote } from 'lucide-react';
import api from '../api/api';
import Seo from '../components/shared/Seo';
import HeroSlider from '../components/shared/HeroSlider';
import './Home.css';

const formatPrice = (num) => {
  if (num >= 1000000) return `AED ${(num / 1000000).toFixed(1)}M`;
  return `AED ${(num / 1000).toFixed(0)}K`;
};

const statusLabel = { 'off-plan': 'Off-Plan', ready: 'Ready', upcoming: 'Upcoming' };

const TRUST_POINTS = [
  { icon: ShieldCheck, label: 'RERA Registered' },
  { icon: TrendingUp, label: 'Verified Payment Plans' },
  { icon: Users, label: '4,000+ Residents Housed' },
  { icon: MapPin, label: 'On-Ground Dubai Team' },
];

const TESTIMONIALS = [
  {
    quote: 'They walked us through the entire payment schedule before we signed anything. No surprises at handover.',
    name: 'A. Haddad',
    role: 'Buyer, Marina Quarter',
  },
  {
    quote: 'We compared three developers — this was the only one that gave us a straight answer on completion dates.',
    name: 'R. Fernandes',
    role: 'Buyer, Downtown Waterfront',
  },
  {
    quote: 'The team knew the community better than we did. Helped us pick the right block for resale value.',
    name: 'S. Okafor',
    role: 'Investor, Palm Grove',
  },
];

const WHY_US = [
  {
    title: 'Direct from source',
    body: 'Every listing here is verified against the master plan and payment schedule — no third-party markups.',
  },
  {
    title: 'Transparent payment plans',
    body: 'See construction-linked milestones upfront, before you ever pick up the phone.',
  },
  {
    title: 'Local, on the ground',
    body: 'A Dubai-based team that knows each community personally — not a call center reading a script.',
  },
];

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [projectsRes, communitiesRes] = await Promise.all([
          api.get('/projects'),
          api.get('/communities'),
        ]);
        setProjects(projectsRes.data.slice(0, 3));
        setCommunities(communitiesRes.data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load home data:', err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="home">
      <Seo
        title="Dubai Off-Plan & Ready Properties"
        description="Browse verified off-plan and ready properties across Dubai's top communities. Transparent pricing, payment plans, and completion dates."
      />

      {/* HERO */}
      <section className="hero">
        <HeroSlider />
        <div className="hero-overlay" />
        <div className="horizon-line" />
        <div className="hero-content">
          <span className="hero-eyebrow">Dubai Real Estate</span>
          <h1>Homes shaped by the skyline they stand in.</h1>
          <p>
            Explore off-plan and ready properties across Dubai's most sought-after
            communities, with full transparency on pricing, plans, and progress.
          </p>
          <div className="hero-cta-group">
            <Link to="/projects"><button className="btn-primary">Browse Projects</button></Link>
            <Link to="/contact"><button className="btn-outline">Talk to Us</button></Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="num">{projects.length > 0 ? `${projects.length}+` : '—'}</span>
            <span className="label">Properties</span>
          </div>
          <div className="hero-stat">
            <span className="num">{communities.length || '—'}</span>
            <span className="label">Communities</span>
          </div>
          <div className="hero-stat">
            <span className="num">2007</span>
            <span className="label">Established</span>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        {TRUST_POINTS.map((t) => (
          <div className="trust-item" key={t.label}>
            <t.icon size={18} strokeWidth={1.75} />
            <span>{t.label}</span>
          </div>
        ))}
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">Featured</span>
            <h2>Current developments worth your attention</h2>
          </div>
          <Link to="/projects" className="section-link">View all projects →</Link>
        </div>

        {loading && <p className="home-loading">Loading projects…</p>}
        {!loading && projects.length === 0 && (
          <p className="home-empty">No projects added yet — check back soon.</p>
        )}

        <div className="projects-grid">
          {projects.map((project) => (
            <Link
              to={`/projects/${project.slug}`}
              key={project.slug}
              className="project-card-link"
            >
              <div className="project-card">
                <div
                  className="project-card-image"
                  style={project.images?.[0] ? { backgroundImage: `url('${project.images[0]}')` } : undefined}
                >
                  <span className="project-status">{statusLabel[project.status] || project.status}</span>
                </div>
                <div className="project-card-body">
                  <span className="project-community">{project.community?.name || 'Dubai'}</span>
                  <h3>{project.name}</h3>
                  <div className="project-meta">
                    <span className="project-price">
                      {formatPrice(project.priceRange?.min || 0)} – {formatPrice(project.priceRange?.max || 0)}
                    </span>
                    {project.bedrooms?.length > 0 && (
                      <span className="project-beds">{project.bedrooms.join(' · ')}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* COMMUNITIES */}
      <section className="section communities-section">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">Communities</span>
            <h2>Grouped by neighborhood, not just listings</h2>
          </div>
          <Link to="/communities" className="section-link">Explore communities →</Link>
        </div>

        {!loading && communities.length === 0 && (
          <p className="home-empty">No communities added yet.</p>
        )}

        <div className="communities-grid">
          {communities.map((c, i) => (
            <Link
              to={`/communities/${c.slug}`}
              key={c.slug}
              className={`community-card ${!c.heroImage ? `community-card-${i % 4}` : ''}`}
              style={c.heroImage ? { backgroundImage: `url('${c.heroImage}')` } : undefined}
            >
              <span className="pin">Dubai</span>
              <h3>{c.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="section-header testimonials-header">
          <div>
            <span className="section-eyebrow">What buyers say</span>
            <h2>Trusted by residents across Dubai</h2>
          </div>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <Quote size={22} className="testimonial-quote-icon" strokeWidth={1.5} />
              <p className="testimonial-text">{t.quote}</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-role">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="section why-section">
        <div>
          <span className="section-eyebrow">Why us</span>
          <h2>Buying off-plan shouldn't feel like guesswork</h2>
          <div className="why-list">
            {WHY_US.map((item, i) => (
              <div className="why-item" key={item.title}>
                <span className="why-num">0{i + 1}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="why-visual">
          <div className="horizon-line" />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-pattern" />
        <h2>Ready to find your next address?</h2>
        <p>Tell us what you're looking for, and we'll match you with the right project.</p>
        <Link to="/contact"><button className="btn-primary">Get in Touch</button></Link>
      </section>
    </div>
  );
};

export default Home;