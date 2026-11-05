'use client';

import React from 'react';
import Link from 'next/link';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const STACK_CARDS = [
  {
    num: '01',
    category: 'Dedicated Engineering',
    title: 'Full-Stack & Mobile Development Pods',
    desc: 'Senior React, Next.js, Node.js, and Flutter engineers integrated directly into your sprint cycle with zero recruitment overhead, strict CI/CD discipline, and 100% IP ownership.',
    metrics: [
      { label: 'Time to Onboard', val: '48 Hours' },
      { label: 'Code Quality', val: '99.9% Clean PRs' },
      { label: 'Time Zone Sync', val: 'EST / GMT / IST' },
    ],
    accent: '#0066ff',
    badgeBg: 'rgba(0, 102, 255, 0.1)',
    tag: 'Web & Mobile Apps',
    ctaLink: '/services/website-development',
  },
  {
    num: '02',
    category: 'Intelligent Workflows',
    title: 'Autonomous AI Copilots & Enterprise Workflows',
    desc: 'Eliminate repetitive manual bottlenecks. Custom n8n, Make, and LLM automation pipelines that qualify leads, synchronize CRMs, and generate executive reports 24/7.',
    metrics: [
      { label: 'Speed Multiplier', val: '10x Faster' },
      { label: 'Automated Tasks', val: '14,000+/mo' },
      { label: 'Manual Errors', val: '0% Falloff' },
    ],
    accent: '#635bff',
    badgeBg: 'rgba(99, 91, 255, 0.1)',
    tag: 'n8n & AI Integration',
    ctaLink: '/services',
  },
  {
    num: '03',
    category: 'Elite Operations',
    title: 'Executive Virtual Assistants & Back-Office Support',
    desc: 'Vetted, SOP-trained remote assistants handling calendar scheduling, CRM hygiene, e-commerce catalogue management, and real estate MLS synchronization.',
    metrics: [
      { label: 'Weekly Hours Saved', val: '25+ Hrs/Exec' },
      { label: 'SOP Mastery', val: 'Day 1 Ready' },
      { label: 'Client Retention', val: '98.4%' },
    ],
    accent: '#ff6b1a',
    badgeBg: 'rgba(255, 107, 26, 0.1)',
    tag: 'Executive Operations',
    ctaLink: '/services',
  },
  {
    num: '04',
    category: 'Enterprise SaaS',
    title: 'Custom CRM, ERP & Scalable Cloud Platforms',
    desc: 'High-performance bespoke enterprise software engineered for scale. Multi-tenant database architecture, automated invoicing, warehouse inventory, and role-based access control.',
    metrics: [
      { label: 'Platform SLA', val: '99.99% Uptime' },
      { label: 'Data Encryption', val: 'AES-256 / SOC2' },
      { label: 'Query Latency', val: '< 18ms' },
    ],
    accent: '#12a150',
    badgeBg: 'rgba(18, 161, 80, 0.1)',
    tag: 'Bespoke Software',
    ctaLink: '/products',
  },
];

export default function ScrollStackShowcase() {
  return (
    <section className="scroll-stack-section" style={{ position: 'relative', padding: '90px 0 60px' }}>
      <div className="container" style={{ marginBottom: '48px' }}>
        <div className="section-header reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div className="badge-tag">
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)', marginRight: '8px' }} />
            Core Disciplines
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '12px' }}>
            Enterprise Capabilities <br />
            <span className="gradient-text">Engineered for Velocity</span>
          </h2>
          <p className="section-subtitle" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '12px', lineHeight: 1.6 }}>
            Scroll down the page to explore our core execution disciplines — each card stacks smoothly into place as you scroll, flowing seamlessly into the next section.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
        <ScrollStack
          useWindowScroll={true}
          itemDistance={120}
          itemStackDistance={28}
          stackPosition="15%"
          itemScale={0.045}
          baseScale={0.84}
          dimAmount={0.16}
          blurAmount={0}
          tiltAmount={2.5}
          rotationAmount={1.2}
          holdDistance={260}
          smoothScroll={false}
        >
          {STACK_CARDS.map((card) => (
            <ScrollStackItem
              key={card.num}
              itemClassName="scroll-stack-showcase-item"
              style={{
                height: '22rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem 2.5rem',
                background: 'var(--bg-card, #ffffff)',
                border: `1px solid ${card.accent}30`,
                boxShadow: `0 16px 36px -12px ${card.accent}20, 0 0 0 1px rgba(0, 0, 0, 0.04)`,
              }}
            >
              <div>
                {/* Card Header Meta */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono, monospace)',
                        color: card.accent,
                        background: card.badgeBg,
                        padding: '3px 10px',
                        borderRadius: '8px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {card.num}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary, #5a5d62)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {card.category}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: card.accent,
                      background: `${card.accent}12`,
                      padding: '4px 12px',
                      borderRadius: '999px',
                    }}
                  >
                    {card.tag}
                  </span>
                </div>

                {/* Card Title & Desc */}
                <h3
                  style={{
                    fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)',
                    fontWeight: 800,
                    color: 'var(--text-primary, #141414)',
                    margin: '0 0 10px 0',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    color: 'var(--text-secondary, #5a5d62)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    margin: 0,
                    maxWidth: '720px',
                  }}
                >
                  {card.desc}
                </p>
              </div>

              {/* Card Bottom: Key Metrics & Action */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  {card.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: card.accent, fontFamily: 'var(--font-display, sans-serif)' }}>
                        {m.val}
                      </div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted, #8b8e96)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href={card.ctaLink}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: card.accent,
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    background: card.badgeBg,
                    transition: 'transform 0.2s ease, background 0.2s ease',
                  }}
                >
                  <span>Explore Discipline</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
