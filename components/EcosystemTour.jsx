'use client';

import React, { useState } from 'react';

export default function EcosystemTour() {
  const [activeTab, setActiveTab] = useState('va');

  const tourData = {
    va: {
      badge: 'Elite Virtual Assistants',
      heading: 'Executive VAs Managing Your Core Workflows',
      paragraph:
        'From calendar and email coordination to real estate CRM data entry and e-commerce catalogue management, our assistants work as a dedicated extension of your company.',
      list: [
        'Zero training curve with standard operating procedure (SOP) frameworks',
        'Direct Slack, Teams, and Email integration with daily accountability logs',
        'Weekly executive timesheet and task delivery digests',
      ],
      mockHeader: 'VA Operations Board • Synced Live',
      items: [
        { title: 'Inbox Zero Maintenance', sub: 'Filtered 140 emails, drafted 28 replies', status: 'Done', color: 'var(--accent-green)' },
        { title: 'Client Appointment Setting', sub: '8 Zoom meetings booked across EST & GMT', status: 'In Progress', color: 'var(--accent-blue)' },
        { title: 'Real Estate CRM Data Entry', sub: '65 MLS listings parsed and tagged', status: 'Done', color: 'var(--accent-green)' },
      ],
    },
    dev: {
      badge: 'Dedicated Tech Manpower',
      heading: 'Senior Engineers Embedded Directly in Your Sprints',
      paragraph:
        'Full-stack, frontend, backend, Flutter, and DevOps engineers ready to push code in 48 hours. Zero recruiter fees, full IP ownership, and strict CI/CD discipline.',
      list: [
        'Top 1% senior talent vetted for algorithmic and architecture rigor',
        'Daily standups and GitHub PR reviews matching your exact time zone',
        'Dedicated remote pods with QA automation engineering included',
      ],
      mockHeader: 'Sprint Pod #04 • Git Commit Stream',
      items: [
        { title: 'PR #142: Real-Time Payment Webhook', sub: 'Approved by Tech Lead • 12 passing tests', status: 'Merged', color: 'var(--accent-purple)' },
        { title: 'Flutter iOS Build Deployment', sub: 'TestFlight build #88 generated for staging', status: 'Deployed', color: 'var(--accent-green)' },
        { title: 'Docker Container Optimization', sub: 'Reduced image footprint from 1.2GB to 180MB', status: 'Done', color: 'var(--accent-green)' },
      ],
    },
    ai: {
      badge: 'Autonomous AI Workflows',
      heading: 'Workflows That Run Themselves with Zero Bottlenecks',
      paragraph:
        'Eliminate repetitive manual tasks. Connect n8n, Make, and Zapier with tailored AI agent layers for instant lead routing, customer booking, and automated reporting.',
      list: [
        'WhatsApp Business API & CRM bidirectional synchronization',
        'Autonomous customer inquiry qualification and routing',
        'Multi-platform executive metrics aggregated into daily Slack briefs',
      ],
      mockHeader: 'n8n & AI Pipeline • Execution Nodes',
      items: [
        { title: 'WhatsApp Inbound Webhook Listener', sub: 'Captured incoming voice note & transcribed via Whisper', status: '200 OK', color: 'var(--accent-green)' },
        { title: 'AI Sentiment & Priority Classifier', sub: 'Flagged as High-Value Corporate Buyer ($50k+)', status: 'Success', color: 'var(--accent-blue)' },
        { title: 'HubSpot Deal Creation & Calendar Ping', sub: 'Created Deal #9201 & scheduled partner intro', status: 'Triggered', color: 'var(--accent-purple)' },
      ],
    },
    web: {
      badge: 'E-Commerce & Web Support',
      heading: '24/7 Web Technical Support & Catalogue Operations',
      paragraph:
        'Keep your Shopify, WordPress, or WooCommerce store fast, secure, and always updated. Product uploads, speed optimization, and agency white-label technical support.',
      list: [
        '24/7 security monitoring, malware scans, and instant bug fixes',
        'Continuous PageSpeed optimization maintaining 95+ Google scores',
        'High-converting landing page development and CRM integration',
      ],
      mockHeader: 'Store Health Monitor • 100% Uptime',
      items: [
        { title: 'Shopify Store Performance Check', sub: 'Load time: 0.82s • Core Web Vitals all green', status: '99/100', color: 'var(--accent-green)' },
        { title: 'Catalogue Bulk Upload (Fall Season)', sub: '450 new SKUs with high-res assets & variants', status: 'Published', color: 'var(--accent-blue)' },
        { title: 'SSL Certificate & Security Audit', sub: 'Zero vulnerabilities found • Daily backup complete', status: 'Passed', color: 'var(--accent-green)' },
      ],
    },
    custom: {
      badge: 'Custom Business Software',
      heading: 'Bespoke CRM, ERP & SaaS Portals Built for Scale',
      paragraph:
        'Custom software engineered to automate your company’s unique workflows. Billing systems, customer portals, custom dashboards, and third-party API integrations.',
      list: [
        'Custom CRM & ERP software built around your exact business model',
        'Automated billing, subscription invoicing, and accounting sync',
        'Role-based permissions, bank-grade encryption, and real-time dashboards',
      ],
      mockHeader: 'Custom ERP Console • Live Metrics',
      items: [
        { title: 'Automated Monthly Invoicing Run', sub: 'Dispatched $184,200 across 34 corporate clients', status: 'Completed', color: 'var(--accent-green)' },
        { title: 'Live Executive Financial Dashboard', sub: 'Aggregated Stripe, PayPal & Wire balances in 1 panel', status: 'Live', color: 'var(--accent-blue)' },
        { title: 'Third-Party Logistics API Sync', sub: 'Real-time warehouse inventory sync with Shopify ERP', status: 'Synced', color: 'var(--accent-purple)' },
      ],
    },
  };

  const curr = tourData[activeTab];

  return (
    <section className="tour-section" id="tour">
      <div className="container">
        <div className="section-header reveal-up">
          <div className="badge-tag">Interactive Tour</div>
          <h2 className="section-title">Explore the Nexprobyte Ecosystem</h2>
          <p className="section-subtitle">
            Click through our core operational departments and experience how we integrate seamlessly with your company.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="tour-tabs reveal-up">
          <button
            className={`tour-tab ${activeTab === 'va' ? 'active' : ''}`}
            onClick={() => setActiveTab('va')}
            data-tour="va"
          >
            1. Virtual Assistance
          </button>
          <button
            className={`tour-tab ${activeTab === 'dev' ? 'active' : ''}`}
            onClick={() => setActiveTab('dev')}
            data-tour="dev"
          >
            2. Dev Manpower
          </button>
          <button
            className={`tour-tab ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
            data-tour="ai"
          >
            3. AI &amp; Automation
          </button>
          <button
            className={`tour-tab ${activeTab === 'web' ? 'active' : ''}`}
            onClick={() => setActiveTab('web')}
            data-tour="web"
          >
            4. E-Commerce Support
          </button>
          <button
            className={`tour-tab ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom')}
            data-tour="custom"
          >
            5. Custom Software
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="tour-content-panel reveal-scale">
          <div className="tour-panel-inner" id="tour-display">
            <div>
              <div className="badge-tag" style={{ marginBottom: '12px' }} id="tour-badge">
                {curr.badge}
              </div>
              <h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '16px' }} id="tour-heading">
                {curr.heading}
              </h3>
              <p className="section-subtitle" style={{ fontSize: '1rem', marginBottom: '24px' }} id="tour-paragraph">
                {curr.paragraph}
              </p>
              <ul className="service-sublist" id="tour-list">
                {curr.list.map((item, idx) => (
                  <li key={idx} className="service-subitem">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '24px' }}>
                <a href="#contact" className="btn-primary-sm">Deploy Assistants Now &rarr;</a>
              </div>
            </div>

            {/* Dynamic Visual Mockup */}
            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xl)',
                padding: '32px',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }} id="mockup-header">
                  {curr.mockHeader}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent-green)',
                    background: 'var(--accent-green-light)',
                    padding: '3px 8px',
                    borderRadius: '99px',
                  }}
                >
                  Active Today
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} id="mockup-items">
                {curr.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="mockup-item-enter"
                    style={{
                      animationDelay: `${idx * 0.08}s`,
                      background: '#fff',
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '0.85rem' }}>{item.title}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: item.color, fontWeight: 600 }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
