import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JOBS } from '@/data/siteContent';

export const metadata = {
  title: 'Careers at Nexprobyte — Join Our Engineering Studio in Coimbatore',
  description: 'Join Nexprobyte Technologies in Coimbatore. Open positions for Frontend Developers, Full Stack Engineers, UI/UX Designers, Digital Marketing Specialists, and SEO Analysts.',
};

export default function CareersPage() {
  const perks = [
    'Competitive salary & yearly performance reviews',
    'Flexible hours & remote-friendly options',
    'Dedicated learning budget for courses & engineering tools',
    'Direct high-impact client work from month one',
    'Weekly engineering demos & rapid prototyping builds',
    'Referral & quarterly performance bonuses',
  ];

  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Careers' }]} />
      </div>

      <PageHero
        num="Join Us"
        label="Coimbatore Studio & Remote"
        title={['Work on Things', 'That Matter']}
        sub="We are a small, focused team building modern web applications, scalable cloud backends, digital brands, and revenue-focused marketing engines."
      />

      {/* Perks Grid */}
      <section className="section wrap" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="careers-perks-box spotlight-card">
            <div className="perks-header">
              <span className="badge-tag">LIFE AT NEXPROBYTE</span>
              <h2 className="perks-title">Why Builders Choose Our Studio</h2>
              <p className="perks-sub">
                We believe in autonomy, deep focus time, zero bureaucratic layers, and honest compensation for great craft.
              </p>
            </div>

            <div className="perks-items-grid">
              {perks.map((p, idx) => (
                <div key={idx} className="perk-item-box">
                  <div className="perk-check">✓</div>
                  <span className="perk-label">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Openings Section */}
      <section className="section wrap">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>CURRENT OPENINGS</span>
            </div>
            <h2 className="section-title">Explore Active Positions</h2>
            <p className="section-subtitle">
              Ready to work with a team that values clean code, thoughtful design, and tangible business results?
            </p>
          </div>

          <div className="careers-jobs-list">
            {JOBS.map((job) => (
              <div key={job.slug} className="career-job-card spotlight-card">
                <div className="job-card-top-row">
                  <div>
                    <span className="job-dept-pill">{job.dept}</span>
                    <h3 className="job-card-title">
                      <Link href={`/careers/${job.slug}`}>{job.title}</Link>
                    </h3>
                    <div className="job-card-meta">
                      <span>📍 {job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                      <span>•</span>
                      <span className="job-card-salary">{job.salary}</span>
                    </div>
                  </div>

                  <div className="job-card-action-btns">
                    <Link href={`/careers/${job.slug}`} className="btn-outline-hero">
                      View Role Scope &rarr;
                    </Link>
                    <Link
                      href={`/careers/apply?job=${encodeURIComponent(job.title)}`}
                      className="btn-primary-hero"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>

                <p className="job-card-excerpt">{job.excerpt}</p>
              </div>
            ))}
          </div>

          {/* Spontaneous Application Box */}
          <div className="spontaneous-card spotlight-card" style={{ marginTop: '40px' }}>
            <div>
              <h3 className="spontaneous-title">Don't see your exact role?</h3>
              <p className="spontaneous-desc">
                We are always excited to meet brilliant software engineers, QA specialists, and product managers. Submit your resume for future opportunities.
              </p>
            </div>
            <Link href="/careers/apply" className="btn-primary-hero">
              Submit General Application &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
