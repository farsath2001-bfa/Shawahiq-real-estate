import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Faq.css';

/**
 * <Faq items={[{ question: '...', answer: '...' }, ...]} />
 */
const Faq = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div className={`faq-item ${isOpen ? 'faq-open' : ''}`} key={item.question}>
            <button
              className="faq-question"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown size={18} strokeWidth={2} className="faq-chevron" />
            </button>
            <div className="faq-answer-wrap" style={{ maxHeight: isOpen ? '400px' : '0px' }}>
              <p className="faq-answer">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;