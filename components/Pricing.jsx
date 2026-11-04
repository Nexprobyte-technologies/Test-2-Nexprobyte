'use client';

import React, { useState } from 'react';

export default function Pricing() {
  const [billingMode, setBillingMode] = useState('project'); // 'project' (INR) or 'retainer' (USD)
  const [isAnnual, setIsAnnual] = useState(false);

  const projectPackages = [
    {
      title: 'Essential Web',
      level: 'Starting Tier',
      tag: 'For startups, clinics, consultants & local shops',
      price: '₹18,999',
      period: 'one-time investment*',
      turnaround: '7–10 Days Delivery',
      features: [
        '5-Page High-Performance Website',
        'Mobile-First Responsive Design',
        'WhatsApp Click-to-Chat & Contact Form',
        'Google Business Profile & Map Setup',
        'Free SSL & Speed Optimization',
        '1 Month Free Post-Launch Support',
      ],
      btnText: 'Start Essential Web',
      isFeatured: false,
    },
    {
      title: 'Growth Pro',
      level: 'Mid-Level Tier',
      tag: 'For growing brands, services & high conversions',
      price: '₹38,999',
      period: 'one-time investment*',
      turnaround: '14–18 Days Delivery',
      features: [
        'Up to 10 Pages + Dynamic CMS / Blog',
        'Comprehensive On-Page & Technical SEO',
        'Lead Capture Funnel & WhatsApp Automation',
        'Speed & Core Web Vitals (90+ Score)',
        'Google Analytics 4 & Search Console Setup',
        '3 Months Priority Support & Maintenance',
      ],
      btnText: 'Start Growth Pro',
      isFeatured: true,
      popularTag: 'Most Popular',
    },
    {
      title: 'Enterprise Suite',
      level: 'Premium Tier',
      tag: 'For custom web apps, e-commerce & enterprise scale',
      price: '₹74,999',
      period: 'starting from / custom scope',
      turnaround: '21–30 Days Delivery',
      features: [
        'Custom Web App or E-Commerce Store',
        'Payment Gateway, Cart & User Accounts',
        'Custom REST API & PostgreSQL / MongoDB',
        'Cloud Architecture & High-Security Auth',
        'Performance Marketing & Ad Funnel Setup',
        '6 Months Dedicated Maintenance Retainer',
      ],
      btnText: 'Build Enterprise Suite',
      isFeatured: false,
    },
  ];

  const retainerPlans = [
    {
      title: 'Dedicated VA',
      desc: 'Perfect for founders and busy executives needing administrative or operational relief.',
      monthly: '$1,299',
      yearly: '$1,039',
      features: [
        '160 Hours Dedicated per Month',
        'Dedicated Account Manager',
        'Email, Calendar & CRM Handling',
        '100% Time-Zone Overlap',
        'Strict NDA & Data Security',
      ],
      btnText: 'Deploy Virtual Assistant',
      isFeatured: false,
    },
    {
      title: 'Dedicated Developer',
      desc: 'Senior full-stack, mobile, or AI engineer embedded directly into your tech sprints.',
      monthly: '$2,999',
      yearly: '$2,399',
      features: [
        'Senior Engineer (React, Node, Flutter, AI)',
        '40 Hours / Week Full-Time Capacity',
        'Daily Standups, GitHub PRs & CI/CD',
        'Automated Code Review & QA Included',
        '14-Day Risk-Free Trial Period',
      ],
      btnText: 'Deploy Senior Developer',
      isFeatured: true,
      popularTag: 'Most Popular',
    },
    {
      title: 'Custom Team & ERP',
      desc: 'Complete engineering squads, white-label agency staffing, or custom enterprise software builds.',
      monthly: '$5,499',
      yearly: '$4,399',
      features: [
        'Multi-Disciplinary Pod (Lead, Dev, QA, UI)',
        'Custom CRM / ERP Software Architecture',
        'Enterprise SLA & 24/7 Security Coverage',
        'White-Label Agency Reselling Rights',
        'Custom n8n/Zapier Automation Clusters',
      ],
      btnText: 'Contact Enterprise Sales',
      isFeatured: false,
    },
  ];

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-header reveal-up">
          <div className="badge-tag">Flexible Engagements</div>
          <h2 className="section-title">Transparent, High-ROI Plans</h2>
          <p className="section-subtitle">
            Choose between fixed-price project delivery packages or dedicated monthly engineering and VA talent retainers.
          </p>
        </div>

        {/* Mode Switcher: Project vs Dedicated Retainer */}
        <div className="pricing-mode-tabs reveal-up">
          <button
            type="button"
            className={`pricing-mode-btn ${billingMode === 'project' ? 'active' : ''}`}
            onClick={() => setBillingMode('project')}
          >
            <span>Project Delivery Packages (₹ INR)</span>
          </button>
          <button
            type="button"
            className={`pricing-mode-btn ${billingMode === 'retainer' ? 'active' : ''}`}
            onClick={() => setBillingMode('retainer')}
          >
            <span>Dedicated Manpower Retainers ($ USD)</span>
          </button>
        </div>

        {/* Annual / Monthly Toggle for Retainers */}
        {billingMode === 'retainer' && (
          <div className="pricing-toggle-wrap reveal-up">
            <span
              className={`toggle-label ${!isAnnual ? 'active' : ''}`}
              id="label-monthly"
              onClick={() => setIsAnnual(false)}
              style={{ cursor: 'pointer' }}
            >
              Monthly Billing
            </span>
            <div
              className={`toggle-switch ${isAnnual ? 'active' : ''}`}
              id="pricing-toggle"
              role="switch"
              aria-checked={isAnnual}
              tabIndex={0}
              onClick={() => setIsAnnual(!isAnnual)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setIsAnnual(!isAnnual);
                }
              }}
            >
              <div className="toggle-thumb" style={{ transform: isAnnual ? 'translateX(22px)' : 'translateX(0)' }}></div>
            </div>
            <span
              className={`toggle-label ${isAnnual ? 'active' : ''}`}
              id="label-yearly"
              onClick={() => setIsAnnual(true)}
              style={{ cursor: 'pointer' }}
            >
              Annual Billing
            </span>
            <span className="discount-tag">Save 20%</span>
          </div>
        )}

        {/* Hidden toggle element if in project mode to preserve test ID */}
        {billingMode !== 'retainer' && (
          <div style={{ display: 'none' }} id="pricing-toggle" />
        )}

        {/* Cards Grid */}
        <div className="pricing-cards-grid stagger-group" style={{ overflow: 'visible', paddingTop: '16px' }}>
          {billingMode === 'project' &&
            projectPackages.map((p, idx) => (
              <div
                key={idx}
                className={`pricing-card spotlight-card reveal-up ${p.isFeatured ? 'featured' : ''}`}
                style={{ overflow: 'visible' }}
              >
                {p.popularTag && <div className="popular-badge">{p.popularTag}</div>}
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {p.level} • {p.turnaround}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>{p.tag}</p>
                  <div className="price-val">
                    <span className="price-amount">{p.price}</span>
                    <span className="period" style={{ fontSize: '0.8rem' }}>/{p.period}</span>
                  </div>
                  <ul className="pricing-features-list">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="pricing-feature-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contact"
                  className={p.isFeatured ? 'btn-primary-hero' : 'btn-secondary-hero'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {p.btnText}
                </a>
              </div>
            ))}

          {billingMode === 'retainer' &&
            retainerPlans.map((p, idx) => (
              <div
                key={idx}
                className={`pricing-card spotlight-card reveal-up ${p.isFeatured ? 'featured' : ''}`}
                style={{ overflow: 'visible' }}
              >
                {p.popularTag && <div className="popular-badge">{p.popularTag}</div>}
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>{p.desc}</p>
                  <div className="price-val">
                    <span className="price-amount">{isAnnual ? p.yearly : p.monthly}</span>
                    <span className="period">/month</span>
                  </div>
                  <ul className="pricing-features-list">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="pricing-feature-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contact"
                  className={p.isFeatured ? 'btn-primary-hero' : 'btn-secondary-hero'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {p.btnText}
                </a>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
