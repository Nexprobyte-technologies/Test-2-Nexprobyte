import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SERVICES, COMPANY_INFO } from '@/data/siteContent';

export function generateStaticParams() {
  return SERVICES.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found — Nexprobyte' };

  return {
    title: `${service.title} in Coimbatore — Nexprobyte Technologies | Digital Agency`,
    description: service.blurb,
    keywords: `${service.title} Coimbatore, ${service.title} services, software company Coimbatore, Nexprobyte`,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  const heroMedia = (
    <div className="service-hero-card">
      <div className="service-hero-image-wrap">
        <img
          src={service.image || '/images/srv-web.jpg'}
          alt={service.title}
          className="service-hero-img"
          decoding="async"
          fetchPriority="high"
        />
        <div className="service-hero-badge service-badge-top">
          <span>Discipline {service.num}</span>
          <span className="badge-dot" />
          <span>{service.serif}</span>
        </div>
        <div className="service-hero-badge service-badge-bottom">
          <span>In-House Engineering • Coimbatore</span>
        </div>
      </div>
    </div>
  );

  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Services', to: '/services' },
            { label: service.title },
          ]}
        />
      </div>

      <PageHero
        num={`Discipline ${service.num}`}
        label={service.serif}
        title={[service.title, 'That Ships']}
        sub={service.blurb}
        media={heroMedia}
      />

      {/* Scope & Execution Details */}
      <section className="section wrap" style={{ paddingTop: '50px' }}>
        <div className="container">
          <div className="service-scope-grid">
            <div className="service-scope-left reveal-up">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>EXCELLENCE IN EXECUTION</span>
              </div>
              <h2 className="service-scope-headline">{service.headline}</h2>
              <p className="service-scope-overview">{service.overview}</p>

              <div className="scope-features-block">
                <h3 className="scope-subtitle">Core Technical &amp; Operational Features</h3>
                <div className="scope-features-grid stagger-group">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="scope-feature-item reveal-up">
                      <div className="feature-icon-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="feature-text">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="scope-deliverables-block">
                <h3 className="scope-subtitle">Turnkey Project Deliverables</h3>
                <div className="scope-deliverables-grid stagger-group">
                  {service.deliverables.map((del, idx) => (
                    <div key={idx} className="scope-deliverable-card spotlight-card reveal-up">
                      <span className="del-num">{`DEL-0${idx + 1}`}</span>
                      <h4 className="del-name">{del}</h4>
                      <p className="del-guarantee">Production Ready • Full Source &amp; IP Ownership</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Inquiry Card */}
            <div className="service-scope-sidebar reveal-up">
              <div className="service-inquiry-card spotlight-card">
                <span className="inquiry-tag">DIRECT STUDIO ACCESS</span>
                <h3 className="inquiry-title">Ready to launch {service.title}?</h3>
                <p className="inquiry-desc">
                  Speak directly with our senior technical lead in Coimbatore. We provide documented scopes, fixed turnaround milestones, and weekly demo staging.
                </p>

                <div className="inquiry-points">
                  <div className="inquiry-point">✦ Rapid sprint kickoff (under 5 days)</div>
                  <div className="inquiry-point">✦ Direct Slack/WhatsApp engineer access</div>
                  <div className="inquiry-point">✦ 3 months guaranteed post-launch support</div>
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="btn-primary-hero"
                  style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}
                >
                  Initiate Project Scope &rarr;
                </Link>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="btn-outline-hero"
                  style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}
                >
                  Call: {COMPANY_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-linking other services */}
      <section className="section wrap" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-head reveal-up">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>COMPLEMENTARY CAPABILITIES</span>
            </div>
            <h2 className="section-title">Explore Other Disciplines</h2>
          </div>

          <div className="other-services-grid stagger-group">
            {otherServices.map((os) => (
              <div key={os.slug} className="other-service-card spotlight-card reveal-up">
                <div className="os-meta">
                  <span>{os.num}</span>
                  <span>{os.serif}</span>
                </div>
                <h3 className="os-title">
                  <Link href={`/services/${os.slug}`}>{os.title}</Link>
                </h3>
                <p className="os-blurb">{os.blurb}</p>
                <Link href={`/services/${os.slug}`} className="os-link">
                  Explore Scope &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

