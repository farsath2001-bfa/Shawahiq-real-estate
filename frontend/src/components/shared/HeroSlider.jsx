import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

/**
 * Auto-rotating background image slider for hero sections, with prev/next
 * arrow controls (BizPro/Colorlib carousel style) plus dot indicators.
 * Drop 4 real photos into frontend/public/ named hero-1.jpg, hero-2.jpg,
 * hero-3.jpg, hero-4.jpg (1920x1080 recommended, optimized/compressed).
 */
const DEFAULT_IMAGES = ['/hero-1.jpg', '/hero-2.jpg', '/hero-3.jpg', '/hero-4.jpg'];

const HeroSlider = ({ images = DEFAULT_IMAGES, interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="hero-slider">
      {images.map((src, i) => (
        <div
          key={src}
          className={`hero-slide ${i === activeIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}

      <button className="hero-slider-arrow hero-slider-arrow-prev" onClick={goToPrev} aria-label="Previous slide">
        <ChevronLeft size={22} strokeWidth={2} />
      </button>
      <button className="hero-slider-arrow hero-slider-arrow-next" onClick={goToNext} aria-label="Next slide">
        <ChevronRight size={22} strokeWidth={2} />
      </button>

      <div className="hero-slider-dots">
        {images.map((src, i) => (
          <button
            key={src}
            className={`hero-slider-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(i)}
            aria-label={`Show slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;