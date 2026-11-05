'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * AnimatedCounter — Smooth requestAnimationFrame count-up animation
 * Triggers when scrolled into viewport. Respects prefers-reduced-motion.
 */
export default function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 1600,
  className = '',
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // If reduced motion is enabled, show target value immediately
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    let observer = null;
    let animId = null;

    const startCounting = () => {
      if (hasAnimated) return;
      setHasAnimated(true);

      const startTime = performance.now();
      const startVal = 0;
      const endVal = target;

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.round(startVal + (endVal - startVal) * eased);

        setCount(current);

        if (progress < 1) {
          animId = requestAnimationFrame(updateCount);
        } else {
          setCount(endVal);
        }
      };

      animId = requestAnimationFrame(updateCount);
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              startCounting();
              if (observer) observer.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(node);
    } else {
      startCounting();
    }

    return () => {
      if (observer) observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [target, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={`animated-counter ${className}`.trim()}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

