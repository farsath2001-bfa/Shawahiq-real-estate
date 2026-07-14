import Seo from '../components/shared/Seo';
import './LegalPage.css';

const Terms = () => {
  return (
    <div className="legal-page">
      <Seo
        title="Terms of Service"
        description="Terms and conditions for using the Shawahiq Real Estate website."
        url="https://shawahiqrealestate.ae/terms"
      />
      <section className="legal-hero">
        <span className="legal-eyebrow">Legal</span>
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </section>

      <section className="legal-body">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using this website, you accept and agree to be bound by these
          terms of service. If you do not agree, please discontinue use of this site.
        </p>

        <h2>2. Property Information</h2>
        <p>
          Property listings, pricing, payment plans, and completion dates displayed on this
          site are provided for general informational purposes and are subject to change
          without notice. All figures should be independently verified before making any
          purchasing decision.
        </p>

        <h2>3. No Financial or Legal Advice</h2>
        <p>
          Nothing on this website constitutes financial, investment, or legal advice.
          Prospective buyers should consult independent professionals before entering into
          any property transaction.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          All content on this website — including text, images, and branding — is the
          property of Shawahiq Real Estate or its licensors and may not be reproduced without
          permission.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          We make reasonable efforts to keep information on this site accurate and up to
          date, but we do not guarantee completeness or accuracy and are not liable for any
          decisions made based on content found here.
        </p>

        <h2>6. Changes to These Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after
          changes are posted constitutes acceptance of the revised terms.
        </p>

        <h2>7. Contact</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href="mailto:info@shawahiqrealestate.ae">info@shawahiqrealestate.ae</a>.
        </p>
      </section>
    </div>
  );
};

export default Terms;