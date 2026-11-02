import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SERVICES } from '@/data/siteContent';

export const metadata = {
  title: 'Digital Services — Web, App, SEO & AI Solutions | Nexprobyte Coimbatore',
  description: 'Explore full-spectrum digital services by Nexprobyte Technologies in Coimbatore: Website Development, Mobile Apps, Enterprise Software, SEO, and Performance Marketing.',
};

export default function ServicesPage() {
  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
      </div>

      <PageHero
        num="02"
        label="Production Disciplines"
        title={['Nexprobyte', 'Digital Services']}
        sub="Eight integrated disciplines. One accountable team. Strategy, design, development and marketing that work together instead of in silos."
      />

      {/* Services Grid */}
      <section className="section wrap" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="services-catalog-grid">
            {SERVICES.map((s) => (
              <div key={s.slug} className="service-catalog-card spotlight-card">
                <div className="catalog-card-header">
                  <div className="catalog-meta">
                    <span className="catalog-num">{s.num}</span>
                    <span className="catalog-serif-badge">{s.serif}</span>
                  </div>
                  <h2 className="catalog-title">
                    <Link href={`/services/${s.slug}`} className="catalog-title-link">
                      {s.title}
                    </Link>
                  </h2>
                  <p className="catalog-blurb">{s.blurb}</p>
                </div>

                <div className="catalog-card-body">
                  <h4 className="catalog-features-title">Core Execution Capabilities</h4>
                  <ul className="catalog-features-list">
                    {s.features.map((f, fIdx) => (
                      <li key={fIdx} className="catalog-feature-item">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="catalog-deliverables-box">
                    <span className="deliverables-heading">Deliverables Include:</span>
                    <div className="deliverables-chips">
                      {s.deliverables.map((d, dIdx) => (
                        <span key={dIdx} className="deliverable-chip">
                          ✓ {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="catalog-card-footer">
                  <Link href={`/services/${s.slug}`} className="btn-primary-hero" style={{ width: '100%', textAlign: 'center' }}>
                    View Scope &amp; Deliverables &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 52 PDF Specialized Capabilities Linkage Section */}
      <section className="section wrap" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="container">
          <div className="specialized-callout-card spotlight-card">
            <div className="callout-content">
              <span className="badge-tag">Full-Scale Enterprise Infrastructure</span>
              <h2 className="callout-title">
                Need Dedicated Specialized Engineering or Virtual Teams?
              </h2>
              <p className="callout-desc">
                In addition to our 8 core studio disciplines, Nexprobyte operates 52 turnkey capabilities across Virtual Assistance, Full-Stack Software Engineering, AI Process Automation, Agency Technical Support, and Custom Enterprise Architecture.
              </p>
              <div className="callout-buttons">
                <Link href="/#services" className="btn-primary-hero">
                  Explore All 52 Capabilities &rarr;
                </Link>
                <Link href="/contact" className="btn-outline-hero">
                  Request Custom Scope Proposal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

