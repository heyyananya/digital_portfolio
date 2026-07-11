import React, { useEffect, useRef, useState } from 'react';

/**
 * High-performance reveal-on-scroll wrapper using IntersectionObserver.
 * Fades in and slides up elements organically as they enter the viewport.
 */
export const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Trigger only once for performance
        }
      },
      { 
        threshold: 0.05, 
        rootMargin: '0px 0px -60px 0px' // Trigger slightly before it hits the bottom
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};
