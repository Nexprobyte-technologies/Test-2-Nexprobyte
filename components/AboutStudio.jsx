'use client';

import React from 'react';

const PRINCIPLES = [
  {
    title: 'Honest work',
    desc: 'No magic promises. Clear scopes, real timelines and straight answers — even when the truth isn\'t easy to hear.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Own the outcome',
    desc: 'We treat every project like our own business. If it doesn\'t grow revenue or save time, it doesn\'t ship.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'Built to last',
    desc: 'Clean code, documented decisions and scalable architecture — so the work keeps paying off long after launch.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d6b2" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    title: 'Client-first care',
    desc: 'A dedicated point of contact, weekly updates and a team that picks up the phone. No layers, no noise.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b1a" strokeWidth="2">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
  },
];

export default function AboutStudio() {
  return (
    <section className="about-studio-section" id="about">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-up">
          <div className="badge-tag">The People Behind The Pixels</div>
          <h2 className="section-title">
            Built On Principles, <span className="gradient-text">Engineered in Coimbatore</span>
          </h2>
          <p className="section-subtitle">
            Nexprobyte was founded with a simple belief: small and mid-sized businesses deserve the same digital firepower as enterprises. We bridge that gap with a senior, honest team that ships.
          </p>
        </div>

        {/* Studio Banner Visual Card */}
        <div className="about-studio-banner spotlight-card reveal-up">
          <div className="about-studio-grid">
            <div className="about-studio-image-col">
              <img
                src="/images/about-team.jpg"
                alt="Nexprobyte engineering and design team in Coimbatore studio"
                className="about-studio-img"
              />
              <div className="about-img-badge-top">
                <span className="live-radar-dot" style={{ width: 7, height: 7 }}>
                  <span className="live-radar-ring" />
                </span>
                <span>Coimbatore Studio • In-House Team</span>
              </div>
              <div className="about-img-badge-bottom">
                <span>✦ 50+ Digital Products Shipped</span>
              </div>
            </div>

            <div className="about-studio-text-col">
              <span className="badge-tag">Crafted in Coimbatore</span>
              <h3 className="about-text-title">
                Built by Engineers Who Take Pride in Code &amp; Architecture.
              </h3>
              <p className="about-text-desc">
                From clean API design and responsive frontends to scalable enterprise databases and cloud automations — we write code that lasts. No outsourced junior layers. Every project is planned, reviewed, and shipped by senior talent right here in Coimbatore.
              </p>

              <div className="about-studio-pills">
                <span className="studio-pill">Modern React &amp; TypeScript</span>
                <span className="studio-pill">Enterprise Databases</span>
                <span className="studio-pill">Custom ERP Workflows</span>
                <span className="studio-pill">n8n Automation</span>
              </div>

              <div className="about-principles-subgrid">
                {PRINCIPLES.map((p, idx) => (
                  <div key={idx} className="about-principle-item">
                    <div className="principle-subicon">{p.icon}</div>
                    <div>
                      <h4 className="principle-subtitle">{p.title}</h4>
                      <p className="principle-subdesc">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="about-stats-row reveal-up">
          <div className="about-stat-item spotlight-card">
            <span className="stat-num">40+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="about-stat-item spotlight-card">
            <span className="stat-num">6+</span>
            <span className="stat-label">Years of Experience</span>
          </div>
          <div className="about-stat-item spotlight-card">
            <span className="stat-num">100%</span>
            <span className="stat-label">In-House Coimbatore Hub</span>
          </div>
          <div className="about-stat-item spotlight-card">
            <span className="stat-num">24/7</span>
            <span className="stat-label">Support on Retainer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
