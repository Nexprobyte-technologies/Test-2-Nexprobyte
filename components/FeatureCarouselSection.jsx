'use client';

import React from 'react';
import FeatureCarousel from './FeatureCarousel';

export default function FeatureCarouselSection() {
  return (
    <section
      className="feature-carousel-section"
      id="capabilities-carousel"
      style={{
        position: 'relative',
        padding: '80px 0 70px',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(240, 244, 250, 0.45) 50%, rgba(255, 255, 255, 0) 100%)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 32px' }}>
          <div
            className="badge-tag"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(0, 102, 255, 0.08)',
              border: '1px solid rgba(0, 102, 255, 0.2)',
              color: '#0066ff',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#0066ff',
                boxShadow: '0 0 10px rgba(0, 102, 255, 0.8)',
              }}
            />
            Execution Disciplines
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.1rem, 4.2vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              margin: '0 0 16px',
            }}
          >
            Enterprise Capabilities <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #0066ff 0%, #635bff 50%, #00d6b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Engineered for Velocity &amp; Scale
            </span>
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              margin: '0',
            }}
          >
            Continuous kinetic perspective view of our dedicated tech pods, autonomous AI agent pipelines, and bespoke enterprise systems.
          </p>
        </div>

        {/* Carousel Component */}
        <FeatureCarousel />
      </div>
    </section>
  );
}
