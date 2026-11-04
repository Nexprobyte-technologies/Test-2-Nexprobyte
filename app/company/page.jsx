import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { STUDIO_VALUES, STUDIO_STATS, COMPANY_INFO } from '@/data/siteContent';

export const metadata = {
  title: 'Company — Nexprobyte Technologies | Coimbatore Digital & Software Studio',
  description: 'Nexprobyte Technologies is an enterprise digital solutions and engineering company headquartered in Coimbatore, Tamil Nadu. Learn about our founding mission, engineering values, and multidisciplinary team.',
  keywords: 'Nexprobyte company, software company Coimbatore, digital agency Tamil Nadu, Nexprobyte team, IT company Coimbatore',
};

export default function CompanyPage() {
  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Company' }]} />
      </div>

      <PageHero
        num="01"
        label="Company Profile"
        title={['Built for Scale,', 'Rooted in Coimbatore']}
        sub="Nexprobyte Technologies is an enterprise technology and digital growth partner for high-velocity startups and established businesses across India, GCC, UK, and the US."
      />

      {/* Stats Band */}
      <section className="section wrap" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="about-stats-grid stagger-group">
            {STUDIO_STATS.map((s, idx) => (
              <div key={idx} className="about-stat-card spotlight-card reveal-up">
                <div className="stat-number gradient-text">{s.value}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Story & Identity */}
      <section className="section wrap">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-left reveal-up">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>FOUNDING MISSION &amp; PHILOSOPHY</span>
              </div>
              <h2 className="section-title">
                Engineering Discipline Meets <span className="gradient-text">High-Velocity Growth</span>
              </h2>
              <div className="about-story-prose">
                <p>
                  Nexprobyte was founded with a clear directive: deliver enterprise-grade software engineering, dedicated remote developers, autonomous AI agents, and executive virtual assistance to businesses worldwide without the overhead and bloat of legacy IT conglomerates.
                </p>
                <p>
                  Rooted in Coimbatore — the manufacturing capital and premier engineering talent hub of South India — we blend industrial precision with modern cloud-native architectures. Every system we ship is measured by real business outcomes: lower customer acquisition costs, higher uptime, and automated operational efficiency.
                </p>
                <p>
                  From building multi-tenant SaaS architectures and mission-critical ERP solutions to deploying dedicated development pods and autonomous AI customer support copilots, our commitment is absolute craftsmanship and continuous accountability.
                </p>
              </div>

              <div className="about-actions-row" style={{ marginTop: '30px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn-primary-hero">
                  <span>Partner With Our Company</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
                <Link href="/services" className="btn-secondary-hero">
                  <span>Explore All Services &rarr;</span>
                </Link>
              </div>
            </div>

            <div className="about-story-right reveal-up">
              <div className="about-media-stack">
                <div className="about-media-card">
                  <img
                    src="/images/about-workspace.jpg"
                    alt="Nexprobyte Engineering Workspace Coimbatore"
                    className="about-media-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="about-media-caption">
                    <span>Engineering Studio • Coimbatore, TN</span>
                  </div>
                </div>
                <div className="about-media-card" style={{ marginTop: '20px' }}>
                  <img
                    src="/images/about-team.jpg"
                    alt="Nexprobyte Collaborative Team"
                    className="about-media-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="about-media-caption">
                    <span>In-House Cross-Functional Specialists</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Studio Principles */}
      <section className="section wrap" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-head reveal-up">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>CORE VALUES</span>
            </div>
            <h2 className="section-title">The Principles Guiding Our Work</h2>
            <p className="section-subtitle">
              The four foundational commitments that govern our technology delivery and client partnerships.
            </p>
          </div>

          <div className="values-grid stagger-group">
            {STUDIO_VALUES.map((v) => (
              <div key={v.id} className="value-card spotlight-card reveal-up">
                <div className="value-card-top">
                  <span className="value-num">{v.num}</span>
                  <span className="value-tag">Nexprobyte Standard</span>
                </div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Location & Contact Banner */}
      <section className="section wrap">
        <div className="container">
          <div className="about-cta-banner spotlight-card reveal-up">
            <div className="cta-banner-content">
              <span className="badge-tag">Visit Our Coimbatore Studio</span>
              <h2 className="cta-banner-title">
                Ready to accelerate your company with dedicated talent &amp; AI?
              </h2>
              <p className="cta-banner-desc">
                {COMPANY_INFO.address}
              </p>
              <div className="cta-banner-buttons">
                <Link href="/contact" className="btn-primary-hero">
                  Book a Consultation &rarr;
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
