import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { WhatsappIcon } from '../components/shared/SocialIcons';
import Faq from '../components/shared/Faq';
import api from '../api/api';
import Seo from '../components/shared/Seo';
import './Contact.css';

const isOfficeOpen = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 4 = Thursday
  const hour = now.getHours();
  const isWorkday = day >= 0 && day <= 4; // Sunday–Thursday, UAE work week
  const isWorkHour = hour >= 9 && hour < 18;
  return isWorkday && isWorkHour;
};

const FAQ_ITEMS = [
  {
    question: 'Is it safe to buy off-plan property in Dubai?',
    answer: "Yes, provided the developer is RERA-registered and the project has an escrow account, which is legally required in Dubai. We only list projects that meet these requirements, and every listing here is verified against its actual master plan before it goes live.",
  },
  {
    question: 'What is a payment plan, and how does it work?',
    answer: 'A payment plan spreads the purchase price across construction milestones instead of one lump sum — for example 20% on booking, then further installments tied to progress, with the balance due on handover. Each project page shows its exact payment schedule.',
  },
  {
    question: 'Do you charge buyers any fees?',
    answer: 'No — our listings are provided directly, and our fee (if any, depending on the transaction) is covered by the developer, not the buyer. We\'ll always be upfront about this before you commit to anything.',
  },
  {
    question: 'Can international buyers purchase property in Dubai?',
    answer: 'Yes. Dubai allows 100% foreign ownership in designated freehold areas, which covers the vast majority of our listings. We can guide you through the specific requirements for your nationality.',
  },
  {
    question: 'What happens after I submit an enquiry?',
    answer: "Someone from our team reviews your enquiry and reaches out within one business day — usually sooner. We'll confirm availability, share the full payment schedule, and answer any specific questions before you decide anything.",
  },
];

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
          <a
            href="https://wa.me/971561119233"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-whatsapp-card"
          >
            <div className="contact-whatsapp-icon"><WhatsappIcon /></div>
            <div>
              <h3>Chat on WhatsApp</h3>
              <p>Usually replies within minutes</p>
            </div>
            <span className={`contact-status-dot ${isOfficeOpen() ? 'online' : 'offline'}`} />
          </a>

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
              <span className={`contact-open-label ${isOfficeOpen() ? 'open' : 'closed'}`}>
                {isOfficeOpen() ? 'Open now' : 'Closed now'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-faq-section">
        <div className="contact-faq-inner">
          <span className="contact-eyebrow">Common Questions</span>
          <h2>Frequently asked questions</h2>
          <Faq items={FAQ_ITEMS} />
        </div>
      </section>
    </div>
  );
};

export default Contact;