import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JOBS, COMPANY_INFO } from '@/data/siteContent';

export function generateStaticParams() {
  return JOBS.map((j) => ({
    slug: j.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = JOBS.find((j) => j.slug === slug);
  if (!job) return { title: 'Position Not Found — Nexprobyte' };

  return {
    title: `${job.title} — Careers | Nexprobyte Technologies Coimbatore`,
    description: job.excerpt,
    keywords: `${job.title} job Coimbatore, software jobs Coimbatore, tech careers Tamil Nadu, Nexprobyte careers`,
  };
}

export default async function JobDetailPage({ params }) {
  const { slug } = await params;
  const job = JOBS.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const otherJobs = JOBS.filter((j) => j.slug !== slug).slice(0, 2);

  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Careers', to: '/careers' },
            { label: job.title },
          ]}
        />
      </div>

      <PageHero
        num={job.dept}
        label={`${job.location} · ${job.type}`}
        title={[job.title]}
        sub={job.excerpt}
      />

      {/* Job Details Grid */}
      <section className="section wrap" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="job-detail-layout">
            <div className="job-detail-main">
              {/* Top Meta Bar */}
              <div className="job-meta-bar spotlight-card">
                <div className="job-meta-pill-group">
                  <span className="job-pill-primary">{job.salary}</span>
                  <span className="job-pill-secondary">📍 {job.location}</span>
                  <span className="job-pill-secondary">🕒 {job.type}</span>
                  <span className="job-pill-secondary">🏢 {job.dept}</span>
                </div>
                <Link
                  href={`/careers/apply?job=${encodeURIComponent(job.title)}`}
                  className="btn-primary-hero"
                >
                  Apply For This Position &rarr;
                </Link>
              </div>

              {/* Responsibilities */}
              <div className="job-detail-section spotlight-card" style={{ marginTop: '24px' }}>
                <h2 className="detail-section-title">What You'll Be Doing</h2>
                <ul className="detail-bullets-list">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="detail-bullet-item">
                      <div className="detail-check">✦</div>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="job-detail-section spotlight-card" style={{ marginTop: '24px' }}>
                <h2 className="detail-section-title">What We Are Looking For</h2>
                <ul className="detail-bullets-list">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="detail-bullet-item">
                      <div className="detail-check">✦</div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Application Callout */}
              <div className="job-apply-banner spotlight-card" style={{ marginTop: '30px' }}>
                <div>
                  <h3 className="apply-banner-title">Ready to work with us?</h3>
                  <p className="apply-banner-desc">
                    Applications are reviewed within 48 business hours by our engineering lead in Coimbatore.
                  </p>
                </div>
                <Link
                  href={`/careers/apply?job=${encodeURIComponent(job.title)}`}
                  className="btn-primary-hero"
                >
                  Complete Application Form &rarr;
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="job-detail-sidebar">
              <div className="sidebar-studio-card spotlight-card">
                <span className="sidebar-tag">STUDIO LOCATION</span>
                <h4 className="sidebar-heading">Coimbatore Hub</h4>
                <p className="sidebar-text">
                  {COMPANY_INFO.address}
                </p>
                <div className="sidebar-info-row">
                  <span>Working Hours:</span>
                  <b>{COMPANY_INFO.hours}</b>
                </div>
                <div className="sidebar-info-row">
                  <span>Questions?</span>
                  <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
                </div>
              </div>

              <div className="sidebar-other-jobs spotlight-card" style={{ marginTop: '20px' }}>
                <span className="sidebar-tag">OTHER OPENINGS</span>
                <div className="other-jobs-list">
                  {otherJobs.map((oj) => (
                    <div key={oj.slug} className="other-job-item">
                      <h5 className="other-job-title">
                        <Link href={`/careers/${oj.slug}`}>{oj.title}</Link>
                      </h5>
                      <span className="other-job-salary">{oj.salary}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
