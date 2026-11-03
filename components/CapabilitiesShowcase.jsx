'use client';

import React, { useState } from 'react';

const CAPABILITIES = [
  {
    code: 'SYS-01 // SEARCH-DOMINANCE',
    badge: 'RANKING #1',
    title: 'SEO & Search Dominance',
    subtitle: 'Dominate Google #1 For Commercial High-Intent Queries',
    desc: 'Technical audits, Core Web Vitals optimization, semantic schema markup, and high-authority link architectures engineered to climb Google rankings sustainably and drive qualified commercial inbound traffic.',
    bullets: [
      'Technical Core Web Vitals Audit (95+ Score)',
      'High-Intent Keyword Mapping & Content Clusters',
      'Google Business Profile & Local Map Pack Dominance',
      'White-Hat Authority Backlink Acquisition',
    ],
    chips: [
      { label: 'ORGANIC LIFT', val: '+280%' },
      { label: 'CORE VITALS', val: '99/100' },
      { label: 'PENALTIES', val: 'Zero' },
    ],
    systemStatus: 'STAGING // GOOGLE_INDEX_v4',
    telemetryBadge: 'ORGANIC LIFT: +280%',
    accentColor: '#0066FF',
    img: '/images/srv-seo.jpg',
  },
  {
    code: 'SYS-02 // GROWTH-ENGINE',
    badge: '4.8X AVG ROAS',
    title: 'Performance Marketing & CRO',
    subtitle: 'Turn Paid Ad Spend into Predictable, Compounding Revenue',
    desc: 'High-performance multi-channel ad campaigns across Google Ads, Meta, and Instagram, paired with bespoke landing pages, automated lead capture, and ruthless conversion rate optimization.',
    bullets: [
      'Google Search, Display & Performance Max Campaigns',
      'Meta & Instagram High-ROAS Funnel Architecture',
      'Custom High-Conversion CRO Landing Pages',
      'Full-Funnel Attribution & Google Analytics 4 Setup',
    ],
    chips: [
      { label: 'AVERAGE ROAS', val: '4.8x' },
      { label: 'LEAD INFLUX', val: '+340%' },
      { label: 'OPTIMIZATION', val: '24/7 Live' },
    ],
    systemStatus: 'CAMPAIGN_ENGINE // AD_STREAMS',
    telemetryBadge: 'CONVERSION LIFT: 3.8X',
    accentColor: '#635bff',
    img: '/images/srv-marketing.jpg',
  },
  {
    code: 'SYS-03 // CORE-ENGINEERING',
    badge: '99.98% SLA',
    title: 'Full-Stack Web & Mobile App Development',
    subtitle: 'Enterprise Platforms, Microservices & Native Mobile Apps',
    desc: 'From high-concurrency cloud web apps to native iOS & Android applications. We write clean, test-driven modular code architectures with 99.98% SLA uptime, automated CI/CD, and sub-16ms latency.',
    bullets: [
      'React & Next.js 15 Scalable Cloud Frontends',
      'Node.js, Python & High-Concurrency Microservices',
      'Cross-Platform Mobile Apps (React Native & Flutter)',
      'Enterprise REST API & PostgreSQL / MongoDB Datastores',
    ],
    chips: [
      { label: 'UPTIME SLA', val: '99.98%' },
      { label: 'THROUGHPUT', val: '18K req/s' },
      { label: 'API LATENCY', val: '<16ms' },
    ],
    systemStatus: 'RUNTIME_PROD // K8S_NODE_01',
    telemetryBadge: 'THROUGHPUT: 18K req/s',
    accentColor: '#00d6b2',
    img: '/images/srv-app.jpg',
  },
  {
    code: 'SYS-04 // INTERFACE-DESIGN',
    badge: 'PIXEL-PERFECT',
    title: 'UI/UX Design Systems & Interfaces',
    subtitle: 'Human-Centered Design Systems Built For Maximum Conversions',
    desc: 'Research-backed user journeys, comprehensive Figma component libraries, and accessible interaction designs that eliminate cognitive friction, delight customers, and convert users effortlessly.',
    bullets: [
      'User Research & Journey Friction Mapping',
      'Scalable Figma Design Systems & Design Token Kits',
      'High-Fidelity Clickable Interactive Prototypes',
      'WCAG 2.1 AAA Accessibility & Mobile Optimization',
    ],
    chips: [
      { label: 'USER RETENTION', val: '+64%' },
      { label: 'ACCESSIBILITY', val: 'WCAG AAA' },
      { label: 'SPECIFICATION', val: 'Tokenized' },
    ],
    systemStatus: 'FIGMA_CANVAS // DESIGN_SYSTEM',
    telemetryBadge: 'RETENTION: +64%',
    accentColor: '#ff6b1a',
    img: '/images/cover-design.jpg',
  },
  {
    code: 'SYS-05 // AUTONOMOUS-OPS',
    badge: '400+ CONNECTORS',
    title: 'n8n Workflow Automation & Pipelines',
    subtitle: 'Eliminate Repetitive Work with Multi-System Autonomous Flows',
    desc: 'Autonomous workflow pipelines connecting over 400+ enterprise applications, CRM platforms, customer support systems, and internal databases with zero manual overhead.',
    bullets: [
      'Custom n8n Multi-Step Workflow Pipelines',
      'Real-Time Webhook & Database Synchronizations',
      'WhatsApp & Email Lead Capture Automations',
      'AI Agent Triage & Data Extraction Bots',
    ],
    chips: [
      { label: 'VELOCITY LIFT', val: '12x Faster' },
      { label: 'CONNECTORS', val: '400+ APIs' },
      { label: 'HUMAN ERROR', val: 'Zero' },
    ],
    systemStatus: 'PIPELINE_ORCH // ACTIVE_DISPATCH',
    telemetryBadge: 'VELOCITY: 12X FASTER',
    accentColor: '#0066FF',
    img: '/images/new-automation.jpg',
  },
  {
    code: 'SYS-06 // ENTERPRISE-AI',
    badge: 'SMART OPS',
    title: 'Custom AI Copilots & Daily Operations',
    subtitle: 'Generative AI Assistants Trained on Your Proprietary Business Data',
    desc: 'Custom conversational AI assistants trained on your internal company knowledge, 24/7 automated customer query resolvers, and generative content synthesis pipelines bringing modern AI into daily business operations.',
    bullets: [
      'Proprietary RAG (Retrieval-Augmented) Knowledge Bases',
      '24/7 Automated Customer Support AI Copilots',
      'Intelligent Document Parsing & Summarization',
      'Secure Self-Hosted / Private Cloud LLM Deployments',
    ],
    chips: [
      { label: 'ACCURACY', val: '99.4%' },
      { label: 'AVG RESPONSE', val: '<2.0s' },
      { label: 'SECURITY', val: 'Enterprise' },
    ],
    systemStatus: 'NEURAL_CORE // RAG_INDEX_READY',
    telemetryBadge: 'ACCURACY: 99.4%',
    accentColor: '#12a150',
    img: '/images/about-workspace.jpg',
  },
];

export default function CapabilitiesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="capabilities-section" id="capabilities">
      <div className="container">
        <div className="section-header reveal-up">
          <div className="badge-tag">Capabilities &amp; Stacks</div>
          <h2 className="section-title">Architected For Enterprise Scale</h2>
          <p className="section-subtitle">
            From search dominance and high-ROAS marketing to full-stack cloud engineering and autonomous workflow pipelines.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="capabilities-nav reveal-up">
          {CAPABILITIES.map((cap, idx) => (
            <button
              key={idx}
              type="button"
              className={`cap-nav-btn ${activeIdx === idx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="cap-nav-code">SYS-0{idx + 1}</span>
              <span className="cap-nav-title">{cap.title}</span>
            </button>
          ))}
        </div>

        {/* Active Capability Display */}
        <div className="capability-active-card spotlight-card reveal-up">
          <div className="cap-grid">
            <div className="cap-info-col">
              <div className="cap-header-meta">
                <span className="cap-code-badge">{CAPABILITIES[activeIdx].code}</span>
                <span className="cap-status-pill">{CAPABILITIES[activeIdx].badge}</span>
              </div>
              <h3 className="cap-main-title">{CAPABILITIES[activeIdx].title}</h3>
              <div className="cap-sub-heading">{CAPABILITIES[activeIdx].subtitle}</div>
              <p className="cap-desc">{CAPABILITIES[activeIdx].desc}</p>

              <div className="cap-bullets-list">
                {CAPABILITIES[activeIdx].bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="cap-bullet-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Telemetry Chips */}
              <div className="cap-chips-row">
                {CAPABILITIES[activeIdx].chips.map((chip, cIdx) => (
                  <div key={cIdx} className="cap-chip">
                    <span className="cap-chip-val">{chip.val}</span>
                    <span className="cap-chip-label">{chip.label}</span>
                  </div>
                ))}
              </div>

              <div className="cap-action-row">
                <a href="#contact" className="btn-primary-hero">
                  <span>Deploy {CAPABILITIES[activeIdx].title.split(' ')[0]} Architecture</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="cap-visual-col">
              <div className="cap-img-wrapper">
                <img
                  src={CAPABILITIES[activeIdx].img}
                  alt={CAPABILITIES[activeIdx].title}
                  className="cap-showcase-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="cap-telemetry-badge">
                  <span className="live-radar-dot" style={{ width: 6, height: 6 }}>
                    <span className="live-radar-ring" />
                  </span>
                  <span>{CAPABILITIES[activeIdx].telemetryBadge}</span>
                </div>
                <div className="cap-system-status">
                  <span>{CAPABILITIES[activeIdx].systemStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
