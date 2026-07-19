import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Lightbox.css';

/**
 * <Lightbox images={[url1, url2, ...]} activeIndex={i} onClose={fn} onNavigate={setIndex} />
 * Renders nothing if activeIndex is null.
 */
const Lightbox = ({ images, activeIndex, onClose, onNavigate }) => {
  const isOpen = activeIndex !== null && activeIndex !== undefined;

  const goToPrev = useCallback(() => {
    onNavigate((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, onNavigate]);

  const goToNext = useCallback(() => {
    onNavigate((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKey);

    // prevent background scroll while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, goToPrev, goToNext]);

  if (!isOpen) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        <X size={26} strokeWidth={2} />
      </button>

      {images.length > 1 && (
        <button
          className="lightbox-arrow lightbox-arrow-prev"
          onClick={(e) => { e.stopPropagation(); goToPrev(); }}
          aria-label="Previous image"
        >
          <ChevronLeft size={28} strokeWidth={2} />
        </button>
      )}

      <img
        src={images[activeIndex]}
        alt={`View ${activeIndex + 1} of ${images.length}`}
        className="lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          className="lightbox-arrow lightbox-arrow-next"
          onClick={(e) => { e.stopPropagation(); goToNext(); }}
          aria-label="Next image"
        >
          <ChevronRight size={28} strokeWidth={2} />
        </button>
      )}

      {images.length > 1 && (
        <div className="lightbox-counter">{activeIndex + 1} / {images.length}</div>
      )}
    </div>
  );
};

export default Lightbox;