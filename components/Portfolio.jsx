'use client';

import React, { useState } from 'react';

const SIGNATURE_BUILDS = [
  {
    name: 'Tirupur Garments E-commerce Platform',
    short: 'E-commerce Platform',
    location: 'Tirupur • Garments Hub',
    city: 'Tirupur',
    desc: 'B2B wholesale portal connecting Tirupur mills to buyers across India with bulk ordering & Razorpay gateway.',
    stack: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
    metric: '300%',
    metricLabel: 'Sales Increase',
    category: 'Web',
    year: '2024',
    iconColor: '#0066FF',
  },
  {
    name: 'Care Hospital Management System',
    short: 'Hospital Management System',
    location: 'Coimbatore • Healthcare',
    city: 'Coimbatore',
    desc: 'EMR, digital appointments, pharmacy inventory, and lab reports automation for multi-speciality clinics.',
    stack: ['Next.js', 'PostgreSQL', 'Node.js', 'Socket.io'],
    metric: '25+',
    metricLabel: 'Clinics Live',
    category: 'Software',
    year: '2024',
    iconColor: '#00d6b2',
  },
  {
    name: 'Spice Route Restaurant Chain App',
    short: 'Restaurant Chain App',
    location: 'Chennai & Coimbatore • F&B',
    city: 'Chennai',
    desc: 'Online ordering, customer loyalty points, live table booking & kitchen display system for multi-outlet dining.',
    stack: ['Flutter', 'Firebase', 'Node.js', 'Google Maps'],
    metric: '10k+',
    metricLabel: 'Downloads',
    category: 'App',
    year: '2024',
    iconColor: '#ff6b1a',
  },
  {
    name: 'Salem Property Real Estate Portal',
    short: 'Real Estate Portal',
    location: 'Salem • PropTech',
    city: 'Salem',
    desc: 'Verified residential listings, virtual 3D walkthroughs, broker CRM and automated lead generation.',
    stack: ['React', 'Laravel', 'MySQL', 'Mapbox'],
    metric: '500+',
    metricLabel: 'Property Listings',
    category: 'Web',
    year: '2023',
    iconColor: '#635bff',
  },
  {
    name: 'Erode Textile ERP Software',
    short: 'Textile ERP Software',
    location: 'Erode • Textile Belt',
    city: 'Erode',
    desc: 'End-to-end ERP digitizing yarn procurement, weaving, dyeing batches, packing, and dispatch tracking.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    metric: '50+',
    metricLabel: 'Factories Managed',
    category: 'Software',
    year: '2023',
    iconColor: '#12a150',
  },
  {
    name: 'Madurai Scholars LMS Platform',
    short: 'Education LMS Platform',
    location: 'Madurai • EdTech',
    city: 'Madurai',
    desc: 'High-definition video lectures, live interactive classrooms, online test series, and real-time parent reports.',
    stack: ['Next.js', 'Flutter', 'Node.js', 'AWS S3'],
    metric: '5000+',
    metricLabel: 'Active Students',
    category: 'Web',
    year: '2023',
    iconColor: '#0066FF',
  },
];

const CATEGORIES = ['All', 'Web', 'App', 'Software'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredBuilds = SIGNATURE_BUILDS.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <section className="portfolio-section" id="work">
      <div className="container">
        <div className="section-header reveal-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="badge-tag">WORK • 6 SIGNATURE BUILDS • PROVEN SCALE</div>
            <h2 className="section-title">
              Real Businesses. <span className="gradient-text">Real Results.</span>
            </h2>
            <p className="section-subtitle">
              6 production case studies running live today — engineered with modern stacks for high speed and scale.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="portfolio-filter-buttons">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`portfolio-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid stagger-group">
          {filteredBuilds.map((b, idx) => (
            <div key={idx} className="portfolio-card spotlight-card reveal-up">
              <div className="portfolio-card-top">
                <div>
                  <span className="portfolio-cat-badge">{b.category} • {b.year}</span>
                  <div className="portfolio-location" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>{b.location}</span>
                  </div>
                </div>
                <div className="portfolio-metric-pill">
                  <span className="portfolio-metric-num">{b.metric}</span>
                  <span className="portfolio-metric-lbl">{b.metricLabel}</span>
                </div>
              </div>

              <h3 className="portfolio-title">{b.name}</h3>
              <p className="portfolio-desc">{b.desc}</p>

              <div className="portfolio-stack-pills">
                {b.stack.map((s, sIdx) => (
                  <span key={sIdx} className="stack-pill">{s}</span>
                ))}
              </div>

              <div className="portfolio-footer-row">
                <span className="portfolio-status-dot">Verified Production</span>
                <a href="#contact" className="portfolio-case-link">
                  Request Case Study &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
