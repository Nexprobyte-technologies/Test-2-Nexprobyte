import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { STUDIO_VALUES, STUDIO_STATS, COMPANY_INFO } from '@/data/siteContent';

export const metadata = {
  title: 'About Nexprobyte — Digital Studio in Coimbatore | Our Story & Team',
  description: "Nexprobyte Technologies is a Coimbatore-based digital solutions studio helping startups and SMEs grow with web development, mobile apps, technical SEO, and AI automation.",
};

export default function AboutPage() {
  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Studio' }]} />
      </div>

      <PageHero
        num="01"
        label="Studio Overview"
        title={['Crafted in Coimbatore,', 'Tamil Nadu']}
        sub="We're a Coimbatore-based digital solutions studio helping startups and SMEs grow with technology, design and marketing — since day one, strategy first."
      />

      {/* Stats Band */}
      <section className="section wrap" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="about-stats-grid">
            {STUDIO_STATS.map((s, idx) => (
              <div key={idx} className="about-stat-card spotlight-card">
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
            <div className="about-story-left">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>FOUNDING MISSION</span>
              </div>
              <h2 className="section-title">
                Digital Firepower for <span className="gradient-text">Growing Businesses</span>
              </h2>
              <div className="about-story-prose">
                <p>
                  Nexprobyte was founded with a simple belief: small and mid-sized businesses deserve the same digital firepower as enterprises. We bridge that gap with a senior, honest team that ships.
                </p>
                <p>
                  Rooted in Coimbatore — the industrial heart and engineering hub of South India — we bring textile and manufacturing discipline into modern software architecture. No buzzwords, no bloated timelines, just clean engineering and measurable revenue growth.
                </p>
                <p>
                  Whether we are architecting multi-tenant SaaS platforms, building enterprise ERPs for Tirupur textile mills, or optimizing SEO funnels to dominate search results across Tamil Nadu, our mission remains unchanged: solve real problems with uncompromising craft.
                </p>
              </div>

              <div className="about-actions-row" style={{ marginTop: '30px' }}>
                <Link href="/contact" className="btn-primary-hero">
                  Work With Our Studio &rarr;
                </Link>
                <Link href="/careers" className="btn-outline-hero">
                  Join Our Coimbatore Team
                </Link>
              </div>
            </div>

            <div className="about-story-right">
              <div className="about-media-stack">
                <div className="about-media-card">
                  <img
                    src="/images/about-workspace.jpg"
                    alt="Nexprobyte Engineering Workspace Coimbatore"
                    className="about-media-img"
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
      <section className="section wrap" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>CORE VALUES</span>
            </div>
            <h2 className="section-title">How We Work Every Day</h2>
            <p className="section-subtitle">
              The four foundational principles that govern our delivery commitments and client partnerships.
            </p>
          </div>

          <div className="values-grid">
            {STUDIO_VALUES.map((v) => (
              <div key={v.id} className="value-card spotlight-card">
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
          <div className="about-cta-banner spotlight-card">
            <div className="cta-banner-content">
              <span className="badge-tag">Visit Our Coimbatore Studio</span>
              <h2 className="cta-banner-title">
                Ready to take your digital presence to the next level?
              </h2>
              <p className="cta-banner-desc">
                {COMPANY_INFO.address}
              </p>
              <div className="cta-banner-buttons">
                <Link href="/contact" className="btn-primary-hero">
                  Book a Studio Consultation &rarr;
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
