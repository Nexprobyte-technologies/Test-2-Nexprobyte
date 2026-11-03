'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SERVICES as CORE_DISCIPLINES } from '@/data/siteContent';

export default function AllServices() {
  const [activeTab, setActiveTab] = useState('pdf'); // 'pdf' or 'core'
  const [selectedCore, setSelectedCore] = useState(null);

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header reveal-up">
          <div className="badge-tag">Service Architecture</div>
          <h2 className="section-title">The Complete Nexprobyte Suite</h2>
          <p className="section-subtitle">
            Everything your business needs to scale without friction. From 52 specialized PDF services to 12 core production disciplines.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="services-nav-switcher reveal-up">
          <button
            type="button"
            className={`services-nav-tab ${activeTab === 'pdf' ? 'active' : ''}`}
            onClick={() => setActiveTab('pdf')}
          >
            <span>52 Specialized PDF Services (5 Pillars)</span>
          </button>
          <button
            type="button"
            className={`services-nav-tab ${activeTab === 'core' ? 'active' : ''}`}
            onClick={() => setActiveTab('core')}
          >
            <span>12 Core Production Disciplines (Studio)</span>
          </button>
        </div>

        {/* TAB 1: 52 PDF SERVICES (Organized into 5 Pillars with exact IDs and names) */}
        {activeTab === 'pdf' && (
          <div className="services-grid stagger-group">
            {/* 1. Virtual Assistant Services (10 items) */}
            <div className="service-card col-4 spotlight-card reveal-up" id="service-va">
              <div>
                <div className="service-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="service-title">1. Virtual Assistant Services</h3>
                <p className="service-desc">
                  Dedicated, bilingual, and highly-trained executive assistants who take total ownership of your administrative, operational, and customer functions.
                </p>
                <ul className="service-sublist">
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Virtual Administrative Assistant</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Data Entry &amp; Data Management</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Email &amp; Calendar Management</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Customer Support &amp; Live Chat Support</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Lead Generation &amp; Business Research</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Appointment Setting &amp; Follow-ups</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> CRM Management</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Social Media Management</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> E-commerce Store Management</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Real Estate Virtual Assistance</li>
                </ul>
              </div>
              <div className="service-bottom">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>10 Core Disciplines</span>
                <a href="#contact" className="service-link">Deploy Assistant &rarr;</a>
              </div>
            </div>

            {/* 2. Software Development Manpower Support (12 items) */}
            <div className="service-card card-featured col-8 spotlight-card reveal-up" id="service-dev">
              <div>
                <div className="service-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <h3 className="service-title">2. Software Development Manpower Support</h3>
                <p className="service-desc">
                  On-demand senior engineering talent integrated directly into your GitHub, Jira, and Slack. Zero hiring fees, guaranteed time-zone overlap, and instant sprint ramp-up.
                </p>
                <div className="two-col-sublist">
                  <ul className="service-sublist">
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Full-Stack Developers</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Frontend Developers</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Backend Developers</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> WordPress Developers</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Mobile App Developers — Android &amp; iOS</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> React &amp; Flutter Developers</li>
                  </ul>
                  <ul className="service-sublist">
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> UI/UX Designers</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Software Testers &amp; QA Engineers</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> DevOps &amp; Cloud Support Engineers</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Dedicated Remote Development Teams</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Software Maintenance &amp; Bug Fixing</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> White-Label Development Support</li>
                  </ul>
                </div>
              </div>
              <div className="service-bottom">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: 600 }}>12 Core Disciplines • 48h Ramp</span>
                <a href="#contact" className="service-link">Hire Developers &rarr;</a>
              </div>
            </div>

            {/* 3. AI & Business Automation VA Services (12 items) */}
            <div className="service-card card-featured col-8 spotlight-card reveal-up" id="service-ai">
              <div>
                <div className="service-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3 className="service-title">3. AI &amp; Business Automation VA Services</h3>
                <p className="service-desc">
                  Transform repetitive human work into autonomous, self-healing multi-agent workflows using modern AI and no-code/low-code frameworks.
                </p>
                <div className="two-col-sublist">
                  <ul className="service-sublist">
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> AI Virtual Assistant Setup</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> AI Chatbot Development &amp; Integration</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> AI Customer Support Automation</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Email &amp; WhatsApp Automation</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Workflow Automation Using Zapier, Make &amp; n8n</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> CRM &amp; Sales Pipeline Automation</li>
                  </ul>
                  <ul className="service-sublist">
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Lead Collection &amp; Follow-up Automation</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Appointment Booking Automation</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Automated Reporting &amp; Data Processing</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> AI-Powered Business Process Automation</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> API Integration &amp; Third-Party Integrations</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Automated Testing &amp; QA Workflows</li>
                  </ul>
                </div>
              </div>
              <div className="service-bottom">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: 600 }}>12 Core Disciplines • 85% Effort Reduction</span>
                <a href="#ai-copilot" className="service-link">View Automations &rarr;</a>
              </div>
            </div>

            {/* 4. Website & E-commerce Technical Support (10 items) */}
            <div className="service-card col-4 spotlight-card reveal-up" id="service-support">
              <div>
                <div className="service-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <h3 className="service-title">4. Website &amp; E-commerce Technical Support</h3>
                <p className="service-desc">
                  Reliable 24/7 web infrastructure and e-commerce store maintenance. Keep your store fast, secure, bug-free, and always updated.
                </p>
                <ul className="service-sublist">
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Website Updates &amp; Maintenance</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> WordPress Website Management</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Shopify &amp; WooCommerce Management</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Product Uploads &amp; Catalogue Management</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Website Performance Monitoring</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Website Bug Fixing &amp; Troubleshooting</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Website Backup &amp; Security Maintenance</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Landing Page Development</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Website-to-CRM Integration</li>
                  <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Technical Support for Digital Agencies</li>
                </ul>
              </div>
              <div className="service-bottom">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>10 Core Disciplines</span>
                <a href="#contact" className="service-link">Get Support &rarr;</a>
              </div>
            </div>

            {/* 5. CRM, Software & Business Solutions (8 items) */}
            <div className="service-card col-12 card-featured spotlight-card reveal-up" id="service-custom">
              <div>
                <div className="service-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    <path d="M3 9h18"></path>
                    <path d="M9 21V9"></path>
                  </svg>
                </div>
                <h3 className="service-title">5. CRM, Software &amp; Business Solutions</h3>
                <p className="service-desc">
                  Custom enterprise-grade software engineered to automate your core business logic, billing pipelines, and client data flows.
                </p>
                <div className="two-col-sublist">
                  <ul className="service-sublist">
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> CRM Software Development</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Billing &amp; Invoicing Software</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> ERP Software Development</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom Business Software</li>
                  </ul>
                  <ul className="service-sublist">
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> SaaS Application Development</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Database Management &amp; Reporting</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Business Dashboard Development</li>
                    <li className="service-subitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Third-Party Software Integration</li>
                  </ul>
                </div>
              </div>
              <div className="service-bottom">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>8 Core Disciplines • Enterprise Architecture</span>
                <a href="#contact" className="service-link">Build Custom Software &rarr;</a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 8 CORE PRODUCTION DISCIPLINES (From Target Website) */}
        {activeTab === 'core' && (
          <div className="services-grid stagger-group">
            {CORE_DISCIPLINES.map((s, idx) => (
              <div
                key={s.slug}
                className="service-card col-6 spotlight-card reveal-up"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedCore(s)}
              >
                <div>
                  <div className="service-card-top-meta">
                    <span className="discipline-num">{s.num}</span>
                    <span className="discipline-serif-badge">{s.serif}</span>
                  </div>
                  <h3 className="service-title" style={{ marginTop: '12px' }}>{s.title}</h3>
                  <p className="service-desc">{s.blurb}</p>

                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '18px', marginBottom: '8px' }}>
                    {s.headline}
                  </h4>

                  <ul className="service-sublist">
                    {s.features.slice(0, 4).map((f, fIdx) => (
                      <li key={fIdx} className="service-subitem">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-bottom">
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
                    {s.deliverables.length} Key Deliverables
                  </span>
                  <span className="service-link">Explore Scope &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Core Discipline Detailed View */}
        {selectedCore && (
          <div className="modal-backdrop" onClick={() => setSelectedCore(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="badge-tag">Discipline {selectedCore.num} • {selectedCore.serif}</span>
                  <h3 className="modal-title">{selectedCore.title}</h3>
                  <div className="modal-meta">{selectedCore.headline}</div>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setSelectedCore(null)}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  {selectedCore.overview}
                </p>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
                  Core Technical Features
                </h4>
                <ul className="modal-list">
                  {selectedCore.features.map((f, idx) => (
                    <li key={idx}>✦ {f}</li>
                  ))}
                </ul>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 12px', color: 'var(--text-primary)' }}>
                  Project Deliverables
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedCore.deliverables.map((del, dIdx) => (
                    <span key={dIdx} className="modal-deliverable-chip">
                      ✓ {del}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-footer" style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link
                  href={`/services/${selectedCore.slug}`}
                  className="btn-outline-hero"
                  onClick={() => setSelectedCore(null)}
                >
                  Dedicated Service Page &nearr;
                </Link>
                <Link href="/contact" className="btn-primary-hero" onClick={() => setSelectedCore(null)}>
                  Deploy {selectedCore.title} Team &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/services" className="btn-primary-hero" style={{ padding: '14px 32px', fontSize: '1rem' }}>
            Explore All 12 Production Disciplines &amp; 52 Turnkey Capabilities &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
