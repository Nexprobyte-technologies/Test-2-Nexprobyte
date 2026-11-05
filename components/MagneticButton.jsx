'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * MagneticButton — Gentle magnetic cursor pull effect for high-priority CTAs
 * Spring physics with zero layout thrashing.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 18,
  style = {},
  ...rest
}) {
  const ref = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  const springConfig = { damping: 15, stiffness: 220, mass: 0.1 };
  const posX = useSpring(0, springConfig);
  const posY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (reducedMotion || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) / (width / 2);
    const deltaY = (e.clientY - centerY) / (height / 2);

    posX.set(deltaX * strength);
    posY.set(deltaY * strength);
  };

  const handleMouseLeave = () => {
    posX.set(0);
    posY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic-button-wrap ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        x: reducedMotion ? 0 : posX,
        y: reducedMotion ? 0 : posY,
        ...style,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

