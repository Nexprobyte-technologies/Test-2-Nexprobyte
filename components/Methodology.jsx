'use client';

import React from 'react';

const PILLARS = [
  {
    num: '01',
    title: 'Strategic Discovery & Architecture',
    desc: 'Auditing real workflow bottlenecks, target demographics, and database schemas before writing a single line of code.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Agile Production & Clean Code',
    desc: 'Sprint-driven modular engineering, automated tests, zero technical debt, and weekly review deployments.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Continuous Scalability & Measurable ROI',
    desc: 'High-availability cloud hosting, automated CI/CD pipelines, and systems tied directly to measurable revenue.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00d6b2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </svg>
    ),
  },
];

export default function Methodology() {
  return (
    <section className="methodology-section" id="approach">
      <div className="container">
        <div className="methodology-box spotlight-card reveal-up">
          <div className="methodology-badge">
            <span className="live-radar-dot" style={{ width: 6, height: 6 }}>
              <span className="live-radar-ring" />
            </span>
            <span>The Nexprobyte Approach • Proven Methodology</span>
          </div>

          <h2 className="methodology-title">
            How We Build Systems That <span className="gradient-text">Actually Scale</span>
          </h2>

          <p className="methodology-sub">
            We don’t believe in bloated agency retainers or rushed code. Our engineering and marketing workflow is strictly disciplined, transparent, and built for speed.
          </p>

          <div className="methodology-grid">
            {PILLARS.map((p, idx) => (
              <div key={idx} className="methodology-pillar-card">
                <div className="pillar-top-row">
                  <div className="pillar-icon-box">{p.icon}</div>
                  <span className="pillar-num">{p.num}</span>
                </div>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
