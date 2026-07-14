import Seo from '../components/shared/Seo';
import './LegalPage.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <Seo
        title="Privacy Policy"
        description="How Shawahiq Real Estate collects, uses, and protects your personal information."
        url="https://shawahiqrealestate.ae/privacy-policy"
      />
      <section className="legal-hero">
        <span className="legal-eyebrow">Legal</span>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </section>

      <section className="legal-body">
        <h2>1. Information We Collect</h2>
        <p>
          When you submit an enquiry, contact form, or request project details through this
          website, we collect the information you provide directly — including your name,
          email address, phone number, and any message content. We do not collect payment
          information through this site.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information you submit to respond to your enquiries, provide requested
          project details, and follow up regarding properties you've expressed interest in.
          We do not sell or rent your personal information to third parties.
        </p>

        <h2>3. Data Storage</h2>
        <p>
          Enquiry and contact data is stored securely in our database and is only accessible
          to authorized team members for the purpose of responding to your request.
        </p>

        <h2>4. Cookies</h2>
        <p>
          This website may use basic cookies to support core functionality. We do not use
          third-party advertising or tracking cookies.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of any personal information
          you've submitted to us by contacting us directly using the details below.
        </p>

        <h2>6. Contact</h2>
        <p>
          For any privacy-related questions, reach out to us at{' '}
          <a href="mailto:info@shawahiqrealestate.ae">info@shawahiqrealestate.ae</a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;