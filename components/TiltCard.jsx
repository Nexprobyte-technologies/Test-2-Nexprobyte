'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * TiltCard — Reusable 3D Perspective Card with Cursor-Reactive Tilt & Spotlight Sheen
 * Uses Framer Motion spring physics with zero layout shifts.
 * Automatically respects prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  className = '',
  style = {},
  maxTilt = 7,
  scale = 1.02,
  glare = true,
  onClick,
  ...rest
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);

  const handleMouseMove = (e) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    x.set(clientX / rect.width);
    y.set(clientY / rect.height);

    // Also update CSS variables for ambient radial spotlight glow
    cardRef.current.style.setProperty('--mouse-x', `${clientX}px`);
    cardRef.current.style.setProperty('--mouse-y', `${clientY}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card-container spotlight-card ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      {...rest}
    >
      <motion.div
        className="tilt-card-inner"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          scale: isHovered && !reducedMotion ? scale : 1,
          transition: reducedMotion ? 'none' : 'scale 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {children}

        {glare && !reducedMotion && (
          <motion.div
            className="tilt-card-glare"
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              background: `radial-gradient(400px circle at calc(${smoothX.get() * 100}%) calc(${smoothY.get() * 100}%), rgba(255, 255, 255, 0.12), transparent 60%)`,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.25s ease',
              zIndex: 3,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

