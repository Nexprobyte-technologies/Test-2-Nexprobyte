'use client';

import React, { useState, useEffect } from 'react';

export default function PlatformOverview() {
  const initialStream = [
    {
      dot: true,
      name: 'HubSpot CRM Pipeline Enrichment',
      badge: 'VA Services',
      right: '+420 Leads Verified',
      isBlue: false,
    },
    {
      dot: true,
      name: 'Executive Calendar & Travel Booking',
      badge: 'Admin VA',
      right: 'Synced (NYC → LHR)',
      isBlue: true,
    },
    {
      dot: true,
      name: 'Shopify Product Uploads & SEO Meta',
      badge: 'E-Commerce',
      right: '+1,250 SKUs Active',
      isBlue: false,
    },
    {
      dot: true,
      name: 'Zendesk Live Support Resolution',
      badge: 'Customer Care',
      right: '99.4% CSAT Score',
      isBlue: false,
    },
  ];

  const [streamItems, setStreamItems] = useState(initialStream);

  useEffect(() => {
    const additionalEvents = [
      { name: 'PR #204 Full-Stack Merge to Main', badge: 'Dev Pod', right: 'Deployed to AWS', isBlue: true },
      { name: 'n8n Automated Lead Dispatcher', badge: 'AI Workflows', right: '1,420 Executions', isBlue: false },
      { name: 'WordPress 6.7 Security Patch', badge: 'Tech Support', right: '100% Uptime Verified', isBlue: true },
      { name: 'Real Estate MLS Property Sync', badge: 'VA Operations', right: '+88 Listings Synced', isBlue: false },
    ];

    let index = 0;
    const interval = setInterval(() => {
      const nextEvent = additionalEvents[index % additionalEvents.length];
      index++;
      setStreamItems((prev) => [nextEvent, ...prev.slice(0, 4)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="platform-section" id="platform">
      <div className="container">
        <div className="section-header reveal-up">
          <div className="badge-tag">Platform Overview</div>
          <h2 className="section-title">Every Capability, One Calm Engine</h2>
          <p className="section-subtitle">
            Track delegated tasks, inspect code sprints, trigger intelligent automations, and plan your development runway all in real time.
          </p>
        </div>

        <div className="platform-grid stagger-group">
          {/* Card 1: Live Operational Feed (7 cols) */}
          <div className="platform-card col-span-7 spotlight-card reveal-up">
            <div className="card-top">
              <span className="card-tag">Live Operations</span>
              <h3 className="card-heading">Real-Time Operational Stream</h3>
              <p className="card-desc">Your virtual assistants and automations execute mission-critical tasks round the clock.</p>
            </div>

            <div className="stream-list" id="stream-container">
              {streamItems.map((item, idx) => (
                <div key={idx} className="stream-item">
                  <div className="stream-left">
                    <span className="stream-dot"></span>
                    <span className="stream-name">{item.name}</span>
                    <span className="stream-badge">{item.badge}</span>
                  </div>
                  <span className={`stream-right ${item.isBlue ? 'metric-blue' : ''}`}>{item.right}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Dedicated Dev Pods (5 cols) */}
          <div className="platform-card col-span-5 spotlight-card reveal-up">
            <div className="card-top">
              <span className="card-tag">Tech Manpower</span>
              <h3 className="card-heading">Dedicated Engineering Pods</h3>
              <p className="card-desc">Full-time senior developers pre-vetted and aligned to your exact codebase and timezone.</p>
            </div>

            <div className="dev-pod-preview">
              <div className="dev-pod-header">
                <span className="pod-title">Active Sprint Pod #04</span>
                <span className="pod-uptime">&#9679; 99.8% Commit Velocity</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="dev-avatar-group">
                  <div className="dev-avatar" style={{ background: '#0066ff' }}>JM</div>
                  <div className="dev-avatar" style={{ background: '#12a150' }}>AL</div>
                  <div className="dev-avatar" style={{ background: '#635bff' }}>DK</div>
                  <div className="dev-avatar" style={{ background: '#ff6b1a' }}>SR</div>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  4 Senior Engineers
                </span>
              </div>

              <div className="pod-stack-tags">
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">Node / TypeScript</span>
                <span className="tech-tag">Flutter</span>
                <span className="tech-tag">Docker</span>
                <span className="tech-tag">PostgreSQL</span>
                <span className="tech-tag">AWS</span>
              </div>
            </div>
          </div>

          {/* Card 3: AI & Automations Pipeline (6 cols) */}
          <div className="platform-card col-span-6 spotlight-card reveal-up">
            <div className="card-top">
              <span className="card-tag">AI Workflows</span>
              <h3 className="card-heading">Autonomous Business Pipelines</h3>
              <p className="card-desc">Zero manual handoffs. Connect Zapier, Make, and n8n with our custom AI agent layers.</p>
            </div>

            <div className="automation-flow-box">
              <div className="flow-node">
                <div className="node-icon">&#9654;</div>
                <div>
                  <strong>Trigger: Inbound Webhook / WhatsApp</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lead captures from web form or WhatsApp API</div>
                </div>
              </div>
              <div className="node-connector"></div>
              <div className="flow-node">
                <div className="node-icon" style={{ background: 'var(--accent-purple)' }}>&#9881;</div>
                <div>
                  <strong>AI Filter &amp; Qualification Agent</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enrich LinkedIn, verify revenue &gt; $100k, draft reply</div>
                </div>
              </div>
              <div className="node-connector"></div>
              <div className="flow-node">
                <div className="node-icon" style={{ background: 'var(--accent-green)' }}>&#10003;</div>
                <div>
                  <strong>Auto-Route to Calendar &amp; CRM</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Calendar invite dispatched &amp; Slack notified in 1.4s</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Forecast / Velocity Meter (6 cols) */}
          <div className="platform-card col-span-6 spotlight-card reveal-up">
            <div className="card-top">
              <span className="card-tag">Velocity &amp; Sprints</span>
              <h3 className="card-heading">Development Sprint Velocity</h3>
              <p className="card-desc">Track deliverable throughput, hours utilized, and budget savings in real-time.</p>
            </div>

            <div className="forecast-box">
              <div className="forecast-stats">
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Story Points Delivered</div>
                  <div className="forecast-val">348 pts</div>
                </div>
                <div className="forecast-change">+68% vs in-house</div>
              </div>

              <div className="forecast-bars">
                <div className="bar-col" style={{ height: '35%' }}></div>
                <div className="bar-col" style={{ height: '50%' }}></div>
                <div className="bar-col" style={{ height: '45%' }}></div>
                <div className="bar-col" style={{ height: '65%' }}></div>
                <div className="bar-col" style={{ height: '80%' }}></div>
                <div className="bar-col" style={{ height: '75%' }}></div>
                <div className="bar-col active" style={{ height: '98%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
