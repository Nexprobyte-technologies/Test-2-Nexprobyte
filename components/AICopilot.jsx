'use client';

import React, { useState } from 'react';

export default function AICopilot() {
  const [activeScenario, setActiveScenario] = useState('leads');

  const scenarios = {
    leads: {
      prompt: '"Qualify all leads from LinkedIn & Web, enrich revenue, and schedule discovery call."',
      status: 'Workflow Executed • 3 Active Agents Triggered',
      body: 'Found 14 qualified prospects this hour. Filtered 3 enterprise targets (>$5M ARR). Dispatched personalized WhatsApp & calendar invite with dynamic booking link.',
      metric1: '99.2%',
      metric1Label: 'Data Accuracy',
      metric2: '< 1.8s',
      metric2Label: 'Lead Routing Time',
      metric3: '+42%',
      metric3Label: 'Meeting Conversion',
    },
    support: {
      prompt: '"Handle tier-1 support tickets, triage urgent bugs, and escalate VIP accounts."',
      status: 'Support Bot Active • 82 Conversations in Progress',
      body: 'Resolved 68 customer inquiries autonomously across email and live chat. Zero latency escalation for 2 enterprise accounts directly into Slack channel #ops-urgent.',
      metric1: '94.8%',
      metric1Label: 'Auto-Resolution Rate',
      metric2: '< 800ms',
      metric2Label: 'First Response Time',
      metric3: '4.9/5',
      metric3Label: 'Customer CSAT',
    },
    sprint: {
      prompt: '"Analyze sprint commits, benchmark PR review turnaround, and alert blocker bottlenecks."',
      status: 'Engineering Analytics Synced • 6 Repositories Monitored',
      body: 'Reviewed 28 Pull Requests across frontend and backend pods. Average review turnaround: 18 minutes. 0 regressions detected in staging branch.',
      metric1: '100%',
      metric1Label: 'CI/CD Pass Rate',
      metric2: '18m',
      metric2Label: 'PR Turnaround',
      metric3: '+35%',
      metric3Label: 'Cycle Velocity',
    },
  };

  const curr = scenarios[activeScenario];

  return (
    <>
      <section className="ai-section" id="ai-copilot">
        <div className="container">
          <div className="ai-grid">
            <div className="reveal-up">
              <div className="badge-tag">AI Operations</div>
              <h2 className="section-title">An Intelligent AI Copilot for Your Operations</h2>
              <p className="section-subtitle">
                Ask plain English questions, orchestrate multi-agent workflows, and dispatch autonomous customer support agents without code or complex setup.
              </p>

              <div className="ai-chips">
                <button
                  className={`ai-chip ${activeScenario === 'leads' ? 'active' : ''}`}
                  onClick={() => setActiveScenario('leads')}
                  data-prompt="leads"
                >
                  Lead Routing &amp; WhatsApp
                </button>
                <button
                  className={`ai-chip ${activeScenario === 'support' ? 'active' : ''}`}
                  onClick={() => setActiveScenario('support')}
                  data-prompt="support"
                >
                  24/7 Support Bot
                </button>
                <button
                  className={`ai-chip ${activeScenario === 'sprint' ? 'active' : ''}`}
                  onClick={() => setActiveScenario('sprint')}
                  data-prompt="sprint"
                >
                  Dev Sprint Velocity
                </button>
              </div>

              <div style={{ marginTop: '10px' }}>
                <a href="#contact" className="btn-primary-hero" style={{ fontSize: '0.9rem', padding: '12px 24px' }}>
                  Deploy Custom AI Agent
                </a>
              </div>
            </div>

            {/* Interactive AI Simulation Box */}
            <div className="ai-demo-window spotlight-card reveal-scale">
              <div className="ai-window-header">
                <div className="window-dots">
                  <span className="window-dot" style={{ background: '#ff5f56' }}></span>
                  <span className="window-dot" style={{ background: '#ffbd2e' }}></span>
                  <span className="window-dot" style={{ background: '#27c93f' }}></span>
                </div>
                <div className="window-title">nexprobyte-ai-orchestrator v4.2</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                  &#9679; Connected
                </div>
              </div>

              <div className="ai-window-body">
                <div className="ai-prompt-box">
                  <span className="ai-prompt-text" id="ai-active-prompt">
                    {curr.prompt}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                    ENTER &#9166;
                  </span>
                </div>

                <div className="ai-response-box">
                  <div className="response-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                    </svg>
                    <span id="ai-status-text">{curr.status}</span>
                  </div>

                  <div id="ai-dynamic-body" style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.9)' }}>
                    {curr.body}
                  </div>

                  <div className="ai-metrics-row">
                    <div className="ai-metric-item">
                      <div className="metric-rate" id="ai-metric-1">{curr.metric1}</div>
                      <div className="metric-label">{curr.metric1Label}</div>
                    </div>
                    <div className="ai-metric-item">
                      <div className="metric-rate" id="ai-metric-2">{curr.metric2}</div>
                      <div className="metric-label">{curr.metric2Label}</div>
                    </div>
                    <div className="ai-metric-item">
                      <div className="metric-rate" id="ai-metric-3">{curr.metric3}</div>
                      <div className="metric-label">{curr.metric3Label}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Talent Deployment Ticker */}
      <section
        className="reveal-fade"
        style={{
          background: 'var(--bg-secondary)',
          padding: '40px 0',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge-dot" style={{ background: 'var(--accent-blue)' }}></span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
              Global Deployments Today
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
            }}
          >
            <span>&#9679; San Francisco: <strong style={{ color: 'var(--text-primary)' }}>Senior React Dev</strong> (Deployed in 36h)</span>
            <span>&#9679; London: <strong style={{ color: 'var(--text-primary)' }}>Executive VA</strong> (Live synced)</span>
            <span>&#9679; Berlin: <strong style={{ color: 'var(--text-primary)' }}>Flutter Pod</strong> (Sprint Active)</span>
            <span>&#9679; Dubai: <strong style={{ color: 'var(--text-primary)' }}>n8n Automation Lead</strong> (Live)</span>
            <span>&#9679; Sydney: <strong style={{ color: 'var(--text-primary)' }}>QA Automation</strong> (Nightly Run)</span>
          </div>
        </div>
      </section>
    </>
  );
}
