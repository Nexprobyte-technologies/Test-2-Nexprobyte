'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { JOBS } from '@/data/siteContent';

const PERKS = [
  'Competitive salary & yearly reviews',
  'Flexible hours & remote-friendly',
  'Learning budget for courses & tools',
  'Real client work from month one',
  'Friday demos & team builds',
  'Referral & performance bonuses',
];

export default function CareersSection() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJob, setAppliedJob] = useState(null);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateResume, setCandidateResume] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!candidateName.trim() || !candidateEmail.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAppliedJob(null);
      setCandidateName('');
      setCandidateEmail('');
      setCandidatePhone('');
      setCandidateResume('');
    }, 2500);
  };

  return (
    <section className="careers-section" id="careers">
      <div className="container">
        <div className="section-header reveal-up">
          <div className="badge-tag">Join Our Engineering Studio</div>
          <h2 className="section-title">
            Build The Future of <span className="gradient-text">Software &amp; AI</span>
          </h2>
          <p className="section-subtitle">
            We are hiring ambitious engineers, designers, and growth marketers who take immense pride in craft, clean architecture, and rapid shipping.
          </p>
        </div>

        {/* Perks Bar */}
        <div className="careers-perks-card spotlight-card reveal-up">
          <h3 className="perks-heading">Why Engineers &amp; Creators Love Working at Nexprobyte</h3>
          <div className="perks-grid">
            {PERKS.map((perk, idx) => (
              <div key={idx} className="perk-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="careers-jobs-grid stagger-group">
          {JOBS.map((job, idx) => (
            <div key={idx} className="job-card spotlight-card reveal-up">
              <div className="job-header">
                <div>
                  <span className="job-dept-pill">{job.dept}</span>
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-meta-row">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span>{job.location}</span>
                    </span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span className="job-salary-tag">{job.salary}</span>
                  </div>
                </div>
              </div>

              <p className="job-excerpt">{job.excerpt}</p>

              <div className="job-actions-row">
                <button
                  type="button"
                  className="job-view-btn"
                  onClick={() => setSelectedJob(job)}
                >
                  View Details &rarr;
                </button>
                <button
                  type="button"
                  className="btn-primary-hero job-apply-btn"
                  onClick={() => setAppliedJob(job)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link href="/contact" className="btn-primary-hero">
            Explore All 5 Careers &amp; Apply Online &rarr;
          </Link>
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
          <div className="modal-backdrop" onClick={() => setSelectedJob(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="badge-tag">{selectedJob.dept} • {selectedJob.location}</span>
                  <h3 className="modal-title">{selectedJob.title}</h3>
                  <div className="modal-meta">{selectedJob.salary} • {selectedJob.type}</div>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setSelectedJob(null)}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  {selectedJob.excerpt}
                </p>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
                  Key Responsibilities
                </h4>
                <ul className="modal-list">
                  {selectedJob?.responsibilities?.map((r, rIdx) => (
                    <li key={rIdx}>✦ {r}</li>
                  ))}
                </ul>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 12px', color: 'var(--text-primary)' }}>
                  Requirements &amp; Experience
                </h4>
                <ul className="modal-list">
                  {selectedJob?.requirements?.map((req, reqIdx) => (
                    <li key={reqIdx}>✦ {req}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-primary-hero"
                  onClick={() => {
                    setAppliedJob(selectedJob);
                    setSelectedJob(null);
                  }}
                >
                  Apply For This Position &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 1-Click Apply Modal */}
        {appliedJob && (
          <div className="modal-backdrop" onClick={() => setAppliedJob(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
              <div className="modal-header">
                <div>
                  <span className="badge-tag">Quick Application</span>
                  <h3 className="modal-title">Apply for {appliedJob.title}</h3>
                  <div className="modal-meta">{appliedJob.location} • {appliedJob.salary}</div>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setAppliedJob(null)}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'var(--accent-blue-tint)', color: 'var(--accent-blue)', margin: '0 auto 16px' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>Application Received!</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                      Thank you, {candidateName}. Our hiring team in Coimbatore will review your profile and reach out within 48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="John Doe"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        required
                        className="form-input"
                        placeholder="john@example.com"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        required
                        className="form-input"
                        placeholder="+91 98765 43210"
                        value={candidatePhone}
                        onChange={(e) => setCandidatePhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">LinkedIn or Portfolio / GitHub Link</label>
                      <input
                        type="url"
                        required
                        className="form-input"
                        placeholder="https://linkedin.com/in/... or github.com/..."
                        value={candidateResume}
                        onChange={(e) => setCandidateResume(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn-primary-hero" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                      Submit Application &rarr;
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
