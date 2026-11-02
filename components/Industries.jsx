'use client';

import React, { useState } from 'react';

const INDUSTRIES_DATA = [
  {
    id: 'mfg',
    name: 'Manufacturing',
    badge: 'Smart Factory Operations',
    headline: 'Real-Time Shop Floor Intelligence & Custom ERP Systems',
    desc: 'Replace fragmented paper registers and manual spreadsheets with connected operator tablets, live machine utilization tracking, inventory batch audits, and automated dispatch workflows.',
    metricNum: '40%',
    metricLabel: 'Faster Production Cycles & Shift Turnaround',
    features: [
      'Batch & Raw Material Traceability',
      'Shop Floor Operator Dashboards',
      'Automated Machine Downtime Alerts',
      'Dispatched Goods & Invoice ERP Sync',
    ],
    pipeline: [
      { step: 'Order Ingestion', desc: 'PO Auto-Synced to Inventory' },
      { step: 'Floor Scheduling', desc: 'Machine Allocation & Shifts' },
      { step: 'QC Inspection', desc: 'Digital Tolerance Verification' },
      { step: 'Dispatch Logistics', desc: 'Auto E-Way Bill & Delivery' },
    ],
    tech: ['PostgreSQL', 'React', 'Node.js', 'Docker', 'WebSockets'],
  },
  {
    id: 'cnc',
    name: 'CNC & Engineering',
    badge: 'Precision Machining & Job-Order',
    headline: 'Instant CAD-to-Quote Calculation & Live Job-Card Telemetry',
    desc: 'Empower Coimbatore and global engineering manufacturers with automated quotation portals that calculate tooling hours, material cost, setup allowances, and delivery timelines in minutes.',
    metricNum: '3.5x',
    metricLabel: 'Faster RFQ & Client Quotation Turnaround',
    features: [
      'Instant Drawing & CAD Estimator',
      'Job-Card Lifecycle Tracking',
      'Vendor & Subcontractor Portals',
      'ISO 9001 Compliance Audit Logs',
    ],
    pipeline: [
      { step: 'CAD/Drawing Upload', desc: 'Tooling & Material Analyzed' },
      { step: 'Auto RFQ Quoting', desc: '1-Click PDF Estimate to Client' },
      { step: 'Spindle Job Cards', desc: 'Operator Real-time Progress' },
      { step: 'Customer Tracking', desc: 'Live Order Status Transparency' },
    ],
    tech: ['React', 'Express', 'PostgreSQL', 'AWS S3', 'PDF Engine'],
  },
  {
    id: 'startups',
    name: 'High-Growth Startups',
    badge: '0 to 1 MVP & Scale',
    headline: 'High-Velocity MVPs Built for Scale & Investor Readiness',
    desc: 'From whiteboard architecture to a production-ready SaaS in 6 weeks. Complete with user authentication, Stripe/Razorpay billing, cloud infrastructure, and enterprise scalability.',
    metricNum: '6 Wks',
    metricLabel: 'Average End-to-End MVP Launch Speed',
    features: [
      'Multi-Tenant SaaS Architecture',
      'Global Payment & Subscription Billing',
      'Scalable Serverless Cloud APIs',
      'Investor-Ready Tech Diligence',
    ],
    pipeline: [
      { step: 'System Blueprint', desc: 'Wireframes & Data Architecture' },
      { step: 'Core Prototype', desc: 'Working Engine & Test Suite' },
      { step: 'Billing & Auth', desc: 'Subscriptions & Role Security' },
      { step: 'Cloud Deployment', desc: 'High-Availability CI/CD' },
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind/CSS', 'Stripe API', 'Vercel'],
  },
  {
    id: 'smes',
    name: 'SMEs & Enterprises',
    badge: 'Workflow Automation',
    headline: 'Unified Business Operations & Automated WhatsApp CRM',
    desc: 'Consolidate customer inquiries, WhatsApp automated follow-ups, GST quotation generation, and internal team accountability into one clean, lightning-fast dashboard.',
    metricNum: '60+ Hrs',
    metricLabel: 'Saved Per Month on Manual Administrative Tasks',
    features: [
      'WhatsApp Automated Inquiries',
      'One-Click GST Quotations & Invoices',
      'Client Self-Service Account Portals',
      'Staff KPI & Task Accountability',
    ],
    pipeline: [
      { step: 'Lead Capture', desc: 'Web + WhatsApp Auto-Response' },
      { step: 'Quote Sent', desc: 'Professional PDF in 30 Seconds' },
      { step: 'Payment Gateway', desc: 'Auto-Reconciled Ledger' },
      { step: 'Follow-Up Bot', desc: 'Scheduled Retention Broadcast' },
    ],
    tech: ['React', 'Node.js', 'WhatsApp Cloud API', 'PostgreSQL', 'Cloud'],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Retail',
    badge: 'High-Conversion Commerce',
    headline: 'Sub-Second Storefronts Engineered for Peak Conversions',
    desc: 'Custom headless storefronts and multi-warehouse sync that load in under 1 second. Built with integrated payment gateways, abandoned cart recovery, and automated WhatsApp delivery alerts.',
    metricNum: '38%',
    metricLabel: 'Average Increase in Mobile Checkout Conversion',
    features: [
      'Sub-Second Page Load Speeds',
      'Multi-Warehouse Inventory Sync',
      'Direct WhatsApp Cart Recovery',
      'Frictionless Payment Gateways',
    ],
    pipeline: [
      { step: 'Lightning Catalog', desc: '< 1s Instant Product Browsing' },
      { step: 'Frictionless Checkout', desc: 'UPI, Cards, EMI with 0% Drop' },
      { step: 'Warehouse Auto-Sync', desc: 'Real-time Stock Allocation' },
      { step: 'Shipment Tracking', desc: 'Automated WhatsApp Alerts' },
    ],
    tech: ['React / Shopify', 'Razorpay / Stripe', 'Redis', 'Node.js'],
  },
];

export default function Industries() {
  const [activeTab, setActiveTab] = useState(0);
  const cur = INDUSTRIES_DATA[activeTab];

  return (
    <section className="industries-section" id="industries">
      <div className="container">
        <div className="section-header reveal-up">
          <div className="badge-tag">Industry Solutions</div>
          <h2 className="section-title">Engineered For Vertical Excellence</h2>
          <p className="section-subtitle">
            Tailored software pipelines, hardware-integrated dashboards, and conversion funnels built for industry-specific bottlenecks.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="industry-tabs-bar reveal-up">
          {INDUSTRIES_DATA.map((ind, idx) => (
            <button
              key={ind.id}
              type="button"
              className={`industry-tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span>{ind.name}</span>
            </button>
          ))}
        </div>

        {/* Active Industry Panel */}
        <div className="industry-panel-card spotlight-card reveal-up">
          <div className="ind-header-row">
            <div>
              <span className="ind-badge">{cur.badge}</span>
              <h3 className="ind-headline">{cur.headline}</h3>
            </div>
            <div className="ind-metric-box">
              <span className="ind-metric-val">{cur.metricNum}</span>
              <span className="ind-metric-label">{cur.metricLabel}</span>
            </div>
          </div>

          <p className="ind-desc">{cur.desc}</p>

          <div className="ind-two-col">
            {/* Features list */}
            <div>
              <h4 className="ind-subhead">Key Operational Capabilities</h4>
              <ul className="ind-features-list">
                {cur.features.map((feat, fIdx) => (
                  <li key={fIdx} className="ind-feature-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pipeline Steps */}
            <div>
              <h4 className="ind-subhead">Automated Execution Pipeline</h4>
              <div className="ind-pipeline-steps">
                {cur.pipeline.map((p, pIdx) => (
                  <div key={pIdx} className="ind-pipeline-node">
                    <span className="ind-pipeline-step-num">0{pIdx + 1}</span>
                    <div>
                      <div className="ind-step-title">{p.step}</div>
                      <div className="ind-step-desc">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stacks row */}
          <div className="ind-tech-row">
            <span className="ind-tech-label">Validated Tech Stack:</span>
            <div className="ind-tech-pills">
              {cur.tech.map((t, tIdx) => (
                <span key={tIdx} className="ind-tech-tag">{t}</span>
              ))}
            </div>
            <a href="#contact" className="ind-cta-link">
              Consult Industry Specialist &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
