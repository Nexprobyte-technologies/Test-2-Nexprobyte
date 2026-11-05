'use client';

import React from 'react';
import HeroCords from './HeroCords';
import HeroBackgroundGlow from './HeroBackgroundGlow';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-glow"></div>
      <HeroBackgroundGlow />

      {/* Hanging threads and suspended technology squircles */}
      <HeroCords />

      <div className="container hero-content">
        {/* Status Badge */}
        <div className="hero-badge-wrap reveal-up">
          <div className="badge-tag badge-blue" id="hero-status-badge">
            <span className="badge-dot"></span>
            <span id="hero-badge-text">Deploy Vetted Teams &amp; AI Automation</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="hero-title reveal-up">
          Scale Your Business With <br />
          <span className="gradient-text">Dedicated Teams &amp; AI Automation</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle reveal-up">
          The unified talent and technology ecosystem for high-growth enterprises. Dedicated remote developers, executive virtual assistants, autonomous AI workflows, and custom software.
        </p>
      </div>
    </section>
  );
}
