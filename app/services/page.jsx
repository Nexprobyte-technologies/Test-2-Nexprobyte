import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import AllServices from '@/components/AllServices';
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

      {/* Complete Turnkey Capabilities & 52 PDF Service Catalog */}
      <AllServices />

      {/* Custom Scope Callout */}
      <section className="section wrap" style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '60px 0' }}>
        <div className="container">
          <div className="specialized-callout-card spotlight-card">
            <div className="callout-content">
              <span className="badge-tag">Full-Scale Enterprise Infrastructure</span>
              <h2 className="callout-title">
                Ready to Deploy Dedicated Engineering or Automation?
              </h2>
              <p className="callout-desc">
                Whether you need dedicated full-stack developers, mobile app engineers, technical SEO architecture, or executive virtual assistants — we assemble and onboard vetted talent in 48 hours.
              </p>
              <div className="callout-buttons">
                <Link href="/contact" className="btn-primary-hero">
                  Request Custom Scope Proposal &rarr;
                </Link>
                <a href="tel:+919500042426" className="btn-outline-hero">
                  📞 Call +91 95000 42426
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

