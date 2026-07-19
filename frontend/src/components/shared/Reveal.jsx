import { useEffect, useRef, useState } from 'react';
import './Reveal.css';

/**
 * Wraps any content and fades/slides it in once it scrolls into view.
 *
 * <Reveal><section>...</section></Reveal>
 * <Reveal delay={150}><div>...</div></Reveal>
 *
 * Respects prefers-reduced-motion automatically via CSS.
 */
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

export default Reveal;