import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tag, BedDouble, CalendarCheck, CheckCircle2 } from 'lucide-react';
import api from '../api/api';
import Seo from '../components/shared/Seo';
import './ProjectDetail.css';

const statusLabel = { 'off-plan': 'Off-Plan', ready: 'Ready', upcoming: 'Upcoming' };
const formatPrice = (num) => `AED ${(num || 0).toLocaleString()}`;

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const { data } = await api.get(`/projects/${slug}`);
        setProject(data);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      await api.post('/enquiries', {
        ...form,
        project: project._id,
        source: 'website',
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError('Could not submit your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="pd-loading">Loading project…</div>;

  if (notFound || !project) {
    return (
      <div className="pd-notfound">
        <h2>Project not found</h2>
        <p>This listing may have been removed or the link is incorrect.</p>
        <Link to="/projects" className="pd-back-link">← Back to all projects</Link>
      </div>
    );
  }

  const floorPlans = project.floorPlans?.length > 0 ? project.floorPlans : null;
  const amenities = project.amenities || [];
  const paymentPlan = project.paymentPlan || [];

  return (
    <div className="project-detail">
      <Seo
        title={project.name}
        description={project.description || `${project.name} in ${project.community?.name || 'Dubai'} — starting from AED ${(project.priceRange?.min || 0).toLocaleString()}.`}
        image={project.images?.[0]}
        url={`https://shawahiqrealestate.ae/projects/${project.slug}`}
      />
      {/* HERO */}
      <section className="pd-hero">
        <div
          className="pd-hero-bg-image"
          style={{ backgroundImage: `url('${project.images?.[0] || '/hero-bg.svg'}')` }}
        />
        <div className="pd-hero-overlay" />
        <div className="pd-hero-content">
          <Link to="/projects" className="pd-back-link">← All Projects</Link>
          <span className="pd-status">{statusLabel[project.status] || project.status}</span>
          <h1>{project.name}</h1>
          <span className="pd-community">{project.community?.name || 'Dubai'}, Dubai</span>
        </div>
      </section>

      {/* GALLERY */}
      {project.images?.length > 0 && (
        <section className="pd-gallery">
          <div className="pd-gallery-main">
            <img src={project.images[activeImage]} alt={`${project.name} — view ${activeImage + 1}`} />
          </div>
          {project.images.length > 1 && (
            <div className="pd-gallery-thumbs">
              {project.images.map((url, i) => (
                <button
                  key={url}
                  className={`pd-gallery-thumb ${activeImage === i ? 'active' : ''}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={url} alt="" />
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      <div className="pd-body">
        {/* MAIN COLUMN */}
        <div className="pd-main">
          <section className="pd-section">
            <h2>Overview</h2>
            {project.description && <p className="pd-description">{project.description}</p>}
            <div className="pd-quick-facts">
              <div className="pd-fact">
                <Tag size={18} strokeWidth={1.75} className="pd-fact-icon" />
                <div>
                  <span className="pd-fact-label">Starting Price</span>
                  <span className="pd-fact-value">{formatPrice(project.priceRange?.min)}</span>
                </div>
              </div>
              {project.bedrooms?.length > 0 && (
                <div className="pd-fact">
                  <BedDouble size={18} strokeWidth={1.75} className="pd-fact-icon" />
                  <div>
                    <span className="pd-fact-label">Unit Types</span>
                    <span className="pd-fact-value">{project.bedrooms.join(' · ')}</span>
                  </div>
                </div>
              )}
              {project.completionDate && (
                <div className="pd-fact">
                  <CalendarCheck size={18} strokeWidth={1.75} className="pd-fact-icon" />
                  <div>
                    <span className="pd-fact-label">Completion</span>
                    <span className="pd-fact-value">
                      {new Date(project.completionDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* FLOOR PLANS */}
          {floorPlans && (
            <section className="pd-section">
              <h2>Floor Plans</h2>
              <div className="pd-floorplan-tabs">
                {floorPlans.map((fp, i) => (
                  <button
                    key={fp.label || i}
                    className={`pd-fp-tab ${activeFloorPlan === i ? 'active' : ''}`}
                    onClick={() => setActiveFloorPlan(i)}
                  >
                    {fp.label || `Plan ${i + 1}`}
                  </button>
                ))}
              </div>
              <div className="pd-floorplan-viewer">
                {floorPlans[activeFloorPlan]?.url ? (
                  <img src={floorPlans[activeFloorPlan].url} alt={floorPlans[activeFloorPlan].label} className="pd-fp-image" />
                ) : (
                  <div className="pd-fp-placeholder">
                    <span>{floorPlans[activeFloorPlan]?.label || 'Floor Plan'}</span>
                  </div>
                )}
                {floorPlans[activeFloorPlan]?.size && (
                  <div className="pd-fp-size">{floorPlans[activeFloorPlan].size}</div>
                )}
              </div>
            </section>
          )}

          {/* PAYMENT PLAN */}
          {paymentPlan.length > 0 && (
            <section className="pd-section">
              <h2>Payment Plan</h2>
              <div className="pd-payment-table">
                {paymentPlan.map((step) => (
                  <div className="pd-payment-row" key={step.milestone}>
                    <span className="pd-payment-milestone">{step.milestone}</span>
                    <div className="pd-payment-bar-track">
                      <div className="pd-payment-bar-fill" style={{ width: `${step.percentage}%` }} />
                    </div>
                    <span className="pd-payment-percent">{step.percentage}%</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AMENITIES */}
          {amenities.length > 0 && (
            <section className="pd-section">
              <h2>Amenities</h2>
              <div className="pd-amenities-grid">
                {amenities.map((a) => (
                  <div className="pd-amenity" key={a}>
                    <CheckCircle2 size={16} strokeWidth={1.75} className="pd-amenity-icon" />
                    {a}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="pd-sidebar">
          <div className="pd-enquiry-card">
            <h3>Interested in this project?</h3>
            <p>Leave your details and our team will get back to you with availability and pricing.</p>

            {submitted ? (
              <div className="pd-form-success">
                Thanks — we've received your enquiry and will be in touch shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pd-form">
                {submitError && <div className="pd-form-error">{submitError}</div>}
                <input
                  type="text" name="name" placeholder="Full name"
                  value={form.name} onChange={handleChange} required
                />
                <input
                  type="email" name="email" placeholder="Email address"
                  value={form.email} onChange={handleChange} required
                />
                <input
                  type="tel" name="phone" placeholder="Phone number"
                  value={form.phone} onChange={handleChange} required
                />
                <textarea
                  name="message" placeholder="Message (optional)" rows="3"
                  value={form.message} onChange={handleChange}
                />
                <button type="submit" className="pd-form-submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Request Details'}
                </button>
              </form>
            )}

            <a href="tel:+971000000000" className="pd-whatsapp-link">Or call +971 00 000 0000</a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetail;