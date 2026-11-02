'use client';

import React from 'react';

const GPS_MARKERS = [
  { name: 'America', left: '29%', top: '28%' },
  { name: 'Iceland', left: '44%', top: '14%' },
  { name: 'London', left: '50%', top: '22%' },
  { name: 'Qatar', left: '64%', top: '36%' },
  { name: 'Dubai', left: '66%', top: '34%' },
];

export default function InternationalClients() {
  return (
    <section className="international-section reveal-up" id="global">
      <div className="container">
        <div className="international-card spotlight-card">
          <div className="international-text-col">
            <div className="badge-tag">
              <span className="badge-dot" />
              <span>Global Reach • 5 Continents</span>
            </div>
            <h2 className="international-title">
              We Welcome <span className="gradient-text">International Clients</span>
            </h2>
            <p className="international-desc">
              From Coimbatore to the world — Nexprobyte partners with businesses across borders, delivering the same quality, speed and care no matter where you&apos;re based. Fully remote-friendly, timezone-aware and built for global collaboration.
            </p>
            <div className="international-stats-list">
              <div className="intl-stat">
                <span className="intl-num">100%</span>
                <span className="intl-lbl">Timezone Overlap</span>
              </div>
              <div className="intl-divider" />
              <div className="intl-stat">
                <span className="intl-num">48h</span>
                <span className="intl-lbl">Onboarding Ramp</span>
              </div>
              <div className="intl-divider" />
              <div className="intl-stat">
                <span className="intl-num">Zero</span>
                <span className="intl-lbl">Lock-in Contracts</span>
              </div>
            </div>
            <div style={{ marginTop: '24px' }}>
              <a href="#contact" className="btn-primary-hero">
                <span>Start Global Consultation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          <div className="international-map-col">
            <div className="map-wrapper">
              <img
                src="/images/world-map.png"
                alt="World map illustrating global client distribution"
                className="map-image"
              />
              {GPS_MARKERS.map((m, idx) => (
                <div
                  key={idx}
                  className="gps-dot"
                  style={{ left: m.left, top: m.top }}
                >
                  <span className="gps-pulse" />
                  <span className="gps-label">{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
