import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number counting up from 0 to `end` once it scrolls into view.
 *
 * <Counter end={120} suffix="+" />
 * <Counter end={2007} duration={1500} />          // no suffix
 * <Counter end={4000} suffix="+" separator />       // renders "4,000+"
 */
const Counter = ({ end, duration = 1400, suffix = '', prefix = '', separator = false }) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setValue(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  const display = separator ? value.toLocaleString() : value;

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
};

export default Counter;