'use client';

import React from 'react';

const STATS = [
  {
    num: '120+',
    label: 'Projects Completed',
    sub: 'Web, Mobile & SaaS Deployments',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    num: '99%',
    label: 'Client Satisfaction',
    sub: 'Long-Term Client Partnerships',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    num: '25+',
    label: 'Tech Specialists',
    sub: 'Designers, Engineers & Marketers',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d6b2" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    num: '6+ Years',
    label: 'Industry Experience',
    sub: 'Coimbatore Engineering Hub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b1a" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function EnterpriseTrustStrip() {
  return (
    <section className="enterprise-trust-strip reveal-up" aria-label="Company Trust & Performance Metrics">
      <div className="container">
        <div className="trust-strip-inner">
          <div className="trust-strip-status">
            <span className="live-radar-dot">
              <span className="live-radar-ring" />
            </span>
            <span className="trust-status-title">NEXPROBYTE DIGITAL METRICS:</span>
            <span className="trust-status-pill">COIMBATORE HUB • VERIFIED PERFORMANCE</span>
          </div>

          <div className="trust-strip-grid">
            {STATS.map((stat, idx) => (
              <div key={idx} className="trust-stat-card spotlight-card">
                <div className="trust-stat-icon-wrap">{stat.icon}</div>
                <div className="trust-stat-content">
                  <div className="trust-stat-num">{stat.num}</div>
                  <div className="trust-stat-label">{stat.label}</div>
                  <div className="trust-stat-sub">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
