import { useState } from 'react';
import { X } from 'lucide-react';
import { WhatsappIcon } from './SocialIcons';
import './FloatingWhatsapp.css';

const FloatingWhatsapp = () => {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="floating-whatsapp">
      {!dismissed && (
        <div className="floating-whatsapp-tooltip">
          Chat with us on WhatsApp!
          <button
            className="floating-whatsapp-dismiss"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>
      )}
      <a
        href="https://wa.me/971561119233"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <WhatsappIcon width={26} height={26} />
      </a>
    </div>
  );
};

export default FloatingWhatsapp;