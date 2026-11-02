'use client';

import React from 'react';

const PRINCIPLES = [
  {
    code: 'VAL-01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: 'Client-First Architecture',
    desc: 'We listen, discover, and architect digital platforms that solve fundamental business bottlenecks.',
  },
  {
    code: 'VAL-02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
      </svg>
    ),
    title: 'AI & Modern Innovation',
    desc: 'We embrace frontier stacks, intelligent automation, and modern web architectures to keep you ahead.',
  },
  {
    code: 'VAL-03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00d6b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Radical Transparency',
    desc: 'Traceable code, sprint-by-sprint deployments, and straight answers — zero hidden technical debt.',
  },
  {
    code: 'VAL-04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Enterprise Reliability',
    desc: 'High-availability cloud, automated testing pipelines, and battle-tested security standards.',
  },
  {
    code: 'VAL-05',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    title: 'Clean Scalability',
    desc: 'Modular microservices and intuitive design systems built to scale smoothly as your user base expands.',
  },
  {
    code: 'VAL-06',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#12a150" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: 'Compounding Growth',
    desc: 'Every system, interface, and campaign is engineered directly toward measurable ROI and customer retention.',
  },
];

export default function CorePrinciples() {
  return (
    <section className="principles-section" id="principles">
      <div className="container">
        <div className="section-header reveal-up">
          <div className="badge-tag">Core Principles • 3D Telemetry</div>
          <h2 className="section-title">Engineered for Long-Term Impact</h2>
          <p className="section-subtitle">
            Six architectural commitments that guide every pull request, customer consultation, and system deployment at Nexprobyte.
          </p>
        </div>

        <div className="principles-grid stagger-group">
          {PRINCIPLES.map((p, idx) => (
            <div key={idx} className="principle-card spotlight-card reveal-up">
              <div className="principle-card-top">
                <span className="principle-icon">{p.icon}</span>
                <span className="principle-code">{p.code}</span>
              </div>
              <h3 className="principle-title">{p.title}</h3>
              <p className="principle-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
