'use client';

import React from 'react';
import Link from 'next/link';
import HeroCords from './HeroCords';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-glow"></div>

      {/* Hanging threads and suspended technology squircles */}
      <HeroCords />

      <div className="container hero-content">
        {/* Status Badge */}
        <div className="hero-badge-wrap reveal-up">
          <div className="badge-tag badge-blue" id="hero-status-badge">
            <span className="badge-dot"></span>
            <span id="hero-badge-text">Deploy Vetted Teams &amp; AI Automation</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="hero-title reveal-up">
          Scale Your Business With <br />
          <span className="gradient-text">Dedicated Teams &amp; AI Automation</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle reveal-up">
          The unified talent and technology ecosystem for high-growth enterprises. Dedicated remote developers, executive virtual assistants, autonomous AI workflows, and custom software.
        </p>

        {/* Dual Actions removed per design update */}

        {/* Live Architectural Performance Indicators */}
        <div className="hero-metrics-pill-bar reveal-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(0, 102, 255, 0.05)', border: '1px solid rgba(0, 102, 255, 0.15)', borderRadius: '999px', padding: '6px 18px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-secondary)', margin: '20px 0 28px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-blue)' }}>
            <span className="badge-dot" style={{ width: 6, height: 6, background: 'var(--accent-blue)' }} />
            <span>SUB-14MS API LATENCY</span>
          </div>
          <span>•</span>
          <span>99.98% SLA UPTIME</span>
          <span>•</span>
          <span>40+ ENTERPRISE SYSTEMS SHIPPED</span>
          <span>•</span>
          <span style={{ color: 'var(--accent-green)' }}>120+ PROJECTS COMPLETED</span>
        </div>

        {/* 5 Quick Hero Service Folders */}
        <div className="hero-features-grid stagger-group">
          <Link href="/services#service-va" className="feature-folder-card spotlight-card reveal-up">
            <div className="folder-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="folder-info">
              <span className="folder-title">Virtual Assistants</span>
              <span className="folder-caption">Top 1% Vetted Talent</span>
            </div>
          </Link>

          <Link href="/services#service-dev" className="feature-folder-card spotlight-card reveal-up">
            <div className="folder-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <div className="folder-info">
              <span className="folder-title">Dev Manpower</span>
              <span className="folder-caption">Full-Stack &amp; Mobile</span>
            </div>
          </Link>

          <Link href="/services#service-ai" className="feature-folder-card spotlight-card reveal-up">
            <div className="folder-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div className="folder-info">
              <span className="folder-title">AI Automation</span>
              <span className="folder-caption">n8n, Zapier &amp; Agents</span>
            </div>
          </Link>

          <Link href="/services#service-support" className="feature-folder-card spotlight-card reveal-up">
            <div className="folder-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <div className="folder-info">
              <span className="folder-title">Web &amp; E-Commerce</span>
              <span className="folder-caption">Shopify &amp; WordPress</span>
            </div>
          </Link>

          <Link href="/services#service-custom" className="feature-folder-card spotlight-card reveal-up">
            <div className="folder-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                <path d="M3 9h18"></path>
              </svg>
            </div>
            <div className="folder-info">
              <span className="folder-title">Custom Software</span>
              <span className="folder-caption">CRM, ERP &amp; SaaS</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
