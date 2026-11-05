'use client';

import React from 'react';

/**
 * HeroBackgroundGlow — Subtle, cinematic floating ambient light orbs
 * Rendered with GPU compositing using existing brand color tokens.
 * Completely non-blocking with pointer-events: none.
 */
export default function HeroBackgroundGlow() {
  return (
    <div
      className="hero-ambient-lights"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Primary Cyan-Blue Light Bloom */}
      <div
        className="ambient-orb ambient-orb-1"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: '540px',
          height: '420px',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, rgba(0, 102, 255, 0) 70%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          animation: 'ambientFloat1 18s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />

      {/* Secondary Indigo-Purple Light Bloom */}
      <div
        className="ambient-orb ambient-orb-2"
        style={{
          position: 'absolute',
          top: '25%',
          right: '15%',
          width: '460px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(99, 91, 255, 0.06) 0%, rgba(99, 91, 255, 0) 70%)',
          filter: 'blur(70px)',
          borderRadius: '50%',
          animation: 'ambientFloat2 22s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />

      {/* Subtle Mint Emerald Ambient Accent */}
      <div
        className="ambient-orb ambient-orb-3"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '30%',
          width: '420px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(18, 161, 80, 0.04) 0%, rgba(18, 161, 80, 0) 70%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          animation: 'ambientFloat3 20s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />

      {/* Subtle Micro Noise Grid Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.6,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      />
    </div>
  );
}

