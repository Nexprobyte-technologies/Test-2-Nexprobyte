'use client';

import React, { useState } from 'react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
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
            Scale your workforce up or down with 7 days notice. No lock-ins, no hidden overhead, and total IP ownership.
          </p>
        </div>

        {/* Working Monthly / Annual Toggle */}
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

        {/* 3 Tier Cards */}
        <div className="pricing-cards-grid stagger-group">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`pricing-card spotlight-card reveal-up ${p.isFeatured ? 'featured' : ''}`}
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
