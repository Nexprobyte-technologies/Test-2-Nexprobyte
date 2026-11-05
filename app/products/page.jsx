import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { PRODUCTS, COMPANY_INFO } from '@/data/siteContent';

export const metadata = {
  title: 'Products — Nexprobyte Technologies | Cloud Storage, AI Copilot & ERP',
  description:
    'Explore proprietary software products by Nexprobyte Technologies: GO Drive cloud storage, Nexi AI Enterprise Copilot, Nexprobyte Cloud ERP, and NexApp mobile framework.',
  keywords:
    'Nexprobyte products, GO Drive, AI Copilot, cloud ERP software Coimbatore, mobile framework, software products Tamil Nadu',
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
      <section className="container">
        <div className="telemetry-band spotlight-card reveal-up">
          <div className="telemetry-item">
            <div className="telemetry-val gradient-text">99.99%</div>
            <div className="telemetry-lbl">Cloud SLA Uptime</div>
          </div>

          <div className="telemetry-sep" />

          <div className="telemetry-item">
            <div className="telemetry-val" style={{ color: 'var(--accent-purple)' }}>
              &lt; 14ms
            </div>
            <div className="telemetry-lbl">AI Inference Latency</div>
          </div>

          <div className="telemetry-sep" />

          <div className="telemetry-item">
            <div className="telemetry-val" style={{ color: 'var(--accent-green)' }}>
              AES-256
            </div>
            <div className="telemetry-lbl">Zero-Knowledge Vault</div>
          </div>

          <div className="telemetry-sep" />

          <div className="telemetry-item">
            <div className="telemetry-val" style={{ color: 'var(--accent-orange)' }}>
              14+
            </div>
            <div className="telemetry-lbl">Global Edge Regions</div>
          </div>
        </div>
      </section>

      {/* Main Product Showcase List */}
      <section className="section wrap" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="products-showcase-grid">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.slug}
                id={prod.slug}
                className="product-hero-card spotlight-card reveal-up"
              >
                {/* Decorative Accent Glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    right: '-60px',
                    width: '260px',
                    height: '260px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${prod.accent}14 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                />

                <div className="product-grid-layout">
                  {/* Left Column: Product Info */}
                  <div>
                    <div className="product-meta-row">
                      <span
                        className="product-badge-pill"
                        style={{
                          background: `${prod.accent}14`,
                          color: prod.accent,
                          border: `1px solid ${prod.accent}30`,
                        }}
                      >
                        {prod.badge}
                      </span>
                      <span className="product-category-text">{prod.category}</span>
                    </div>

                    <h2 className="product-title-heading">{prod.name}</h2>
                    <p className="product-tagline-text">{prod.tagline}</p>
                    <p className="product-desc-text">{prod.description}</p>

                    {/* Feature Checkpoints */}
                    <div style={{ marginBottom: '24px' }}>
                      <h4 className="product-features-title">Key Capabilities &amp; Architecture:</h4>
                      <ul className="product-features-list">
                        {prod.features.map((feat, fIdx) => (
                          <li key={fIdx} className="product-feature-item">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={prod.accent}
                              strokeWidth="2.5"
                              style={{ flexShrink: 0 }}
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="product-tech-pills">
                      {prod.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="product-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <Link href={prod.demoUrl} className="btn-primary-hero">
                        <span>Explore Technical Specs</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                        >
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
                        >
                          <span>Android App &rarr;</span>
                        </a>
                      )}

                      <Link href="/contact" className="btn-secondary-hero">
                        <span>Request Demo</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Live Telemetry & Metrics Card */}
                  <div className="product-stats-panel">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid var(--border-subtle)',
                        paddingBottom: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          className="badge-dot"
                          style={{ background: prod.accent, width: 8, height: 8 }}
                        />
                        <span
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          System Telemetry
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: 'var(--accent-green)',
                          background: 'var(--accent-green-light)',
                          padding: '3px 9px',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        LIVE ONLINE
                      </span>
                    </div>

                    <div className="product-stats-grid">
                      {prod.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="product-stat-box">
                          <div className="product-stat-lbl">{stat.label}</div>
                          <div className="product-stat-val">{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        background: 'var(--accent-blue-light)',
                        border: '1px dashed var(--accent-blue-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--accent-blue)"
                          strokeWidth="2.2"
                        >
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        <span
                          style={{
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                          }}
                        >
                          Enterprise Sandbox Ready
                        </span>
                      </div>
                      <Link
                        href="/contact"
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--accent-blue)',
                          textDecoration: 'none',
                        }}
                      >
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
