import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import api from '../api/api';
import Seo from '../components/shared/Seo';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      await api.post('/enquiries', { ...form, source: 'website' });
      setSubmitted(true);
    } catch (err) {
      setSubmitError('Could not send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <Seo
        title="Contact Us"
        description="Get in touch with our Dubai real estate team — ask about available projects, pricing, and payment plans."
        url="https://shawahiqrealestate.ae/contact"
      />
      <section className="contact-hero">
        <span className="contact-eyebrow">Get in Touch</span>
        <h1>Let's find your next address</h1>
        <p>Tell us what you're looking for and our team will follow up within one business day.</p>
      </section>

      <section className="contact-body">
        <div className="contact-form-col">
          {submitted ? (
            <div className="contact-success">
              <h3>Thanks — message received.</h3>
              <p>Someone from our team will reach out shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              {submitError && <div className="contact-error">{submitError}</div>}
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="name">Full name</label>
                  <input id="name" type="text" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="contact-field">
                  <label htmlFor="phone">Phone number</label>
                  <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="contact-field">
                <label htmlFor="email">Email address</label>
                <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="contact-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} placeholder="What are you looking for?" />
              </div>
              <button type="submit" className="contact-submit" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        <div className="contact-info-col">
          <div className="contact-info-card">
            <MapPin size={18} strokeWidth={1.75} className="contact-info-icon" />
            <div>
              <h3>Office</h3>
              <p>Business Bay, Dubai, UAE</p>
            </div>
          </div>
          <div className="contact-info-card">
            <Phone size={18} strokeWidth={1.75} className="contact-info-icon" />
            <div>
              <h3>Phone</h3>
              <a href="tel:+971000000000">+971 00 000 0000</a>
            </div>
          </div>
          <div className="contact-info-card">
            <Mail size={18} strokeWidth={1.75} className="contact-info-icon" />
            <div>
              <h3>Email</h3>
              <a href="mailto:info@shawahiqrealestate.ae">info@shawahiqrealestate.ae</a>
            </div>
          </div>
          <div className="contact-info-card">
            <Clock size={18} strokeWidth={1.75} className="contact-info-icon" />
            <div>
              <h3>Hours</h3>
              <p>Sunday – Thursday, 9am – 6pm</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;