import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { PRODUCTS, COMPANY_INFO } from '@/data/siteContent';

export const metadata = {
  title: 'Products — Nexprobyte Technologies | Cloud Storage, AI Copilot & ERP',
  description: 'Explore proprietary software products by Nexprobyte Technologies: GO Drive cloud storage, Nexi AI Enterprise Copilot, Nexprobyte Cloud ERP, and NexApp mobile framework.',
  keywords: 'Nexprobyte products, GO Drive, AI Copilot, cloud ERP software Coimbatore, mobile framework, software products Tamil Nadu',
};

export default function ProductsPage() {
  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Products' }]} />
      </div>

      <PageHero
        num="02"
        label="Proprietary Platforms"
        title={['Software Products Built', 'for Enterprise Velocity']}
        sub="Discover our suite of proprietary cloud platforms, autonomous AI copilots, and business operating systems engineered in Coimbatore and deployed across global operations."
      />

      {/* SLA & Telemetry Ticker Bar */}
      <section className="container" style={{ margin: '10px auto 40px' }}>
        <div
          className="spotlight-card reveal-up"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '24px',
            padding: '24px 32px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-blue)', fontFamily: 'var(--font-display)' }}>
              99.99%
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Cloud SLA Uptime
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', background: 'var(--border-subtle)' }} className="hide-mobile" />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-purple)', fontFamily: 'var(--font-display)' }}>
              &lt; 14ms
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              AI Inference Latency
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', background: 'var(--border-subtle)' }} className="hide-mobile" />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-display)' }}>
              AES-256
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Zero-Knowledge Vault
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', background: 'var(--border-subtle)' }} className="hide-mobile" />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-orange)', fontFamily: 'var(--font-display)' }}>
              14+
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Global Edge Regions
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Showcase List */}
      <section className="section wrap" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="products-showcase-grid" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {PRODUCTS.map((prod, idx) => (
              <div
                key={prod.slug}
                id={prod.slug}
                className="product-hero-card spotlight-card reveal-up"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '24px',
                  padding: '40px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'var(--card-shadow)'
                }}
              >
                {/* Decorative Accent Glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    right: '-60px',
                    width: '240px',
                    height: '240px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${prod.accent}18 0%, transparent 70%)`,
                    pointerEvents: 'none'
                  }}
                  aria-hidden="true"
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'center' }}>
                  {/* Left Column: Product Info */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                      <span
                        className="badge-tag"
                        style={{
                          background: `${prod.accent}14`,
                          color: prod.accent,
                          border: `1px solid ${prod.accent}30`,
                          fontWeight: 700,
                          fontSize: '0.75rem'
                        }}
                      >
                        {prod.badge}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        {prod.category}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
                      {prod.name}
                    </h2>
                    <p style={{ fontSize: '1.05rem', fontWeight: 600, color: prod.accent, marginBottom: '16px' }}>
                      {prod.tagline}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.68, marginBottom: '24px', fontSize: '0.96rem' }}>
                      {prod.description}
                    </p>

                    {/* Feature Checkpoints */}
                    <div style={{ marginBottom: '28px' }}>
                      <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        Key Capabilities &amp; Architecture:
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {prod.features.map((feat, fIdx) => (
                          <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={prod.accent} strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                      {prod.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            background: 'rgba(0,0,0,0.04)',
                            border: '1px solid rgba(0,0,0,0.06)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <Link href={prod.demoUrl} className="btn-primary-hero" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
                        <span>Explore Technical Specs</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>

                      {prod.appStoreUrl && (
                        <a
                          href={prod.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary-hero"
                          style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                        >
                          <span>Android App &rarr;</span>
                        </a>
                      )}

                      <Link href="/contact" className="btn-secondary-hero" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
                        <span>Request Demo</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Live Telemetry & Metrics Card */}
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.65)',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '18px',
                      padding: '28px',
                      boxShadow: '0 8px 24px -8px rgba(0,0,0,0.06)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '14px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="badge-dot" style={{ background: prod.accent }} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                          System Telemetry
                        </span>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-green)', background: 'rgba(34, 197, 94, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                        LIVE ONLINE
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                      {prod.stats.map((stat, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            background: '#ffffff',
                            border: '1px solid rgba(0,0,0,0.06)',
                            borderRadius: '12px',
                            padding: '16px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                          }}
                        >
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                            {stat.label}
                          </div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        marginTop: '20px',
                        background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.05), rgba(99, 91, 255, 0.05))',
                        border: '1px dashed rgba(0, 102, 255, 0.2)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          Enterprise Sandbox Ready
                        </span>
                      </div>
                      <Link href="/contact" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', textDecoration: 'none' }}>
                        Launch POC &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Call to Action */}
      <section className="section wrap" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="about-cta-banner spotlight-card reveal-up" style={{ textAlign: 'center' }}>
            <div className="cta-banner-content" style={{ maxWidth: '640px', margin: '0 auto' }}>
              <span className="badge-tag">Custom Deployment &amp; Dedicated Pods</span>
              <h2 className="cta-banner-title">
                Need a custom enterprise product or white-label build?
              </h2>
              <p className="cta-banner-desc">
                Our Coimbatore engineering pods design, engineer, and host proprietary platforms tailored to your company's workflows.
              </p>
              <div className="cta-banner-buttons" style={{ justifyContent: 'center' }}>
                <Link href="/contact" className="btn-primary-hero">
                  Speak With Lead Product Architect &rarr;
                </Link>
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="btn-outline-hero">
                  Call: {COMPANY_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
