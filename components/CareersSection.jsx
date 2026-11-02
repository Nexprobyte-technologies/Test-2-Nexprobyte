'use client';

import React, { useState } from 'react';

const JOBS = [
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    dept: 'Engineering',
    location: 'Coimbatore / Remote',
    type: 'Full-time',
    salary: '₹3L – ₹6L / year',
    excerpt: 'Turn beautiful designs into fast, accessible interfaces using React and modern CSS. Work across client websites and internal products.',
    responsibilities: [
      'Build responsive UI with React, Next.js and modern CSS',
      'Translate Figma designs into clean, accessible components',
      'Optimise Core Web Vitals and page performance',
      'Collaborate with designers and backend engineers',
      'Participate in code reviews and testing',
    ],
    requirements: [
      '2+ years building production React applications',
      'Strong HTML, CSS and JavaScript fundamentals',
      'Experience with REST APIs and Git workflows',
      'An eye for detail and performance',
      'Bonus: motion/animation libraries, TypeScript',
    ],
  },
  {
    slug: 'fullstack-developer',
    title: 'Full Stack Developer',
    dept: 'Engineering',
    location: 'Coimbatore / Remote',
    type: 'Full-time',
    salary: '₹3.5L – ₹7L / year',
    excerpt: 'Build high-performance web applications, scalable REST APIs, and modern user interfaces using React, Node.js, and modern databases.',
    responsibilities: [
      'Architect and build robust web applications end-to-end',
      'Develop responsive frontends with React, Next.js and modern CSS',
      'Design and maintain scalable RESTful APIs with Node.js & Express',
      'Integrate PostgreSQL, MongoDB, and Redis caching systems',
      'Implement authentication, security best practices, and CI/CD pipelines',
    ],
    requirements: [
      '2+ years experience in full-stack JavaScript / TypeScript development',
      'Strong proficiency in React, Node.js, Express, and modern ES6+',
      'Experience with relational (PostgreSQL) or NoSQL (MongoDB) databases',
      'Proficient in REST API design, state management, and Git workflows',
      'Bonus: Docker, AWS/cloud deployment, Tailwind or Motion libraries',
    ],
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    dept: 'Design',
    location: 'Coimbatore',
    type: 'Full-time',
    salary: '₹3L – ₹6.5L / year',
    excerpt: 'Design intuitive, beautiful interfaces for websites and apps — from whiteboard sketches to polished, hand-off-ready systems.',
    responsibilities: [
      'Own UX flows, wireframes and prototypes',
      'Design high-fidelity UI and design systems',
      'Run user research and usability testing',
      'Partner with developers through delivery',
      'Present and defend design decisions',
    ],
    requirements: [
      'Portfolio of shipped web or mobile products',
      'Strong Figma skills (components, auto-layout)',
      'Solid typography, colour and layout sense',
      'Understanding of HTML/CSS constraints',
      'Motion design experience is a big plus',
    ],
  },
  {
    slug: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    dept: 'Marketing',
    location: 'Coimbatore',
    type: 'Full-time',
    salary: '₹2.5L – ₹5L / year',
    excerpt: 'Plan and run performance campaigns across Google and Meta — and turn the numbers into clear recommendations for clients.',
    responsibilities: [
      'Plan, launch and optimise Google/Meta campaigns',
      'Write ad copy and brief designers on creatives',
      'Track ROI and prepare monthly performance reports',
      'Manage client budgets transparently',
      'Run SEO and content initiatives',
    ],
    requirements: [
      '1.5+ years in performance marketing',
      'Hands-on Google Ads and Meta Ads experience',
      'Comfortable with GA4 and Looker Studio',
      'Strong written communication',
      'Certifications (Google/Bing) are a plus',
    ],
  },
  {
    slug: 'seo-analyst',
    title: 'SEO Analyst',
    dept: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    salary: '₹2L – ₹4.5L / year',
    excerpt: 'Own rankings for a portfolio of client websites — technical fixes, content strategy and link building, all measured with data.',
    responsibilities: [
      'Conduct technical and content audits',
      'Build keyword roadmaps and content briefs',
      'Implement on-page optimisations',
      'Report on rankings, traffic and conversions',
      'Stay current with Google algorithm changes',
    ],
    requirements: [
      '1.5+ years hands-on SEO experience',
      'Comfortable with Search Console, Ahrefs/Semrush',
      'Working knowledge of HTML and schema markup',
      'Analytical and detail-oriented mindset',
      'Local SEO experience is a plus',
    ],
  },
];

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
                    <span>📍 {job.location}</span>
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
                  {selectedJob.responsibilities.map((r, rIdx) => (
                    <li key={rIdx}>✦ {r}</li>
                  ))}
                </ul>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 12px', color: 'var(--text-primary)' }}>
                  Requirements &amp; Experience
                </h4>
                <ul className="modal-list">
                  {selectedJob.requirements.map((req, reqIdx) => (
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
                    <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎉</div>
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
