'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const SOCIALS = [
  { key: 'in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/nextprobytetechnologies' },
  { key: 'X', label: 'X (Twitter)', href: '#' },
  { key: 'ig', label: 'Instagram', href: '#' },
  { key: 'f', label: 'Facebook', href: '#' },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <>
      {/* Pre-footer CTA Banner */}
      <section className="pre-footer-cta">
        <div className="container">
          <div className="cta-banner reveal-scale">
            <div className="badge-tag" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
              Deploy Today • Global Delivery
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, margin: '16px 0' }}>
              Run Your Business From One Calm Ecosystem.
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.85, maxWidth: '640px' }}>
              Join 150+ teams using Nexprobyte Technologies to engineer custom software, build high-converting websites, hire dedicated developers, deploy executive VAs, and automate workflows.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px' }}>
              <Link href="/contact" className="btn-primary-hero" style={{ background: '#fff', color: '#141414' }}>
                Initiate Project Consultation
              </Link>
              <a href="tel:+919500042426" className="btn-secondary-hero" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                📞 Call +91 95000 42426
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top reveal-up">
            {/* Col 1: Brand & Headquarters */}
            <div style={{ maxWidth: '340px' }}>
              <Link href="/" className="nav-brand footer-brand" aria-label="Nexprobyte Technologies">
                <div className="brand-icon footer-brand-icon">
                  <img src="/assets/logo-transparent.png" alt="Nexprobyte Logo" className="brand-logo-img" width={28} height={18} />
                </div>
                <span>NEXPROBYTE TECHNOLOGIES</span>
              </Link>
              <p className="footer-brand-desc" style={{ marginTop: '14px', fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                Nexprobyte Technologies is an enterprise digital solutions and AI systems company headquartered in Coimbatore. We engineer high-performance web applications, mobile architectures, autonomous automation, and conversion marketing for ambitious businesses worldwide.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="social-btn"
                    aria-label={`${s.label} profile`}
                  >
                    {s.key}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Services Architecture */}
            <div>
              <h4 className="footer-heading">Services Suite</h4>
              <ul className="footer-links">
                <li><Link href="/services" className="footer-link">All 8 Core Disciplines</Link></li>
                <li><a href="/#service-va" className="footer-link">Virtual Assistant Services</a></li>
                <li><a href="/#service-dev" className="footer-link">Software Dev Manpower</a></li>
                <li><a href="/#service-ai" className="footer-link">AI &amp; Automation VA</a></li>
                <li><a href="/#service-support" className="footer-link">E-Commerce Technical Support</a></li>
                <li><a href="/#service-custom" className="footer-link">CRM &amp; Software Solutions</a></li>
                <li><a href="/#capabilities" className="footer-link">SEO &amp; Growth Marketing</a></li>
                <li><a href="/#capabilities" className="footer-link">UI/UX Design Systems</a></li>
              </ul>
            </div>

            {/* Col 3: Company & Insights */}
            <div>
              <h4 className="footer-heading">Company &amp; Work</h4>
              <ul className="footer-links">
                <li><Link href="/about" className="footer-link">About Coimbatore Studio</Link></li>
                <li><Link href="/blog" className="footer-link">Blog &amp; Technical Insights</Link></li>
                <li><Link href="/careers" className="footer-link">Tech Careers (5 Openings)</Link></li>
                <li><Link href="/interview-data" className="footer-link">Candidate Interview Intake</Link></li>
                <li><a href="/#principles" className="footer-link">Core Principles (VAL-01 to 06)</a></li>
                <li><a href="/#approach" className="footer-link">The Nexprobyte Approach</a></li>
                <li><a href="/#industries" className="footer-link">Industries We Empower</a></li>
                <li><a href="/#work" className="footer-link">6 Signature Case Studies</a></li>
                <li><a href="/#faq" className="footer-link">Frequently Asked Questions</a></li>
              </ul>
            </div>

            {/* Col 4: Verified Coimbatore Headquarters & Newsletter */}
            <div>
              <h4 className="footer-heading">Coimbatore Hub</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
                📍 1st Floor, Nanjiammal Complex, Above City Bakery, Maniyakarampalayam, Coimbatore, Tamil Nadu 641006 <br />
                📞 +91 95000 42426 <br />
                ✉️ info@nexprobyte.com
              </p>
              <h4 className="footer-heading" style={{ marginTop: '16px' }}>Newsletter</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Engineering insights, automation blueprints, and hiring playbooks.
              </p>
              <form className="newsletter-form" id="newsletter-form" onSubmit={handleNewsletter} style={{ marginTop: '8px' }}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder={subscribed ? 'Thank you for subscribing!' : 'you@company.com'}
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={subscribed}
                />
                <button type="submit" className="newsletter-btn">
                  {subscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>

          {/* Full Cover Panoramic Banner: Coimbatore Manchester of South India */}
          <div className="footer-coimbatore-cover-wrap" style={{ margin: '36px 0 24px', textAlign: 'center' }}>
            <a
              href="https://en.wikipedia.org/wiki/Coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-coimbatore-cover-link"
              title="Explore Coimbatore — Manchester of South India"
              aria-label="Coimbatore — Manchester of South India"
            >
              <img
                src="/assets/cropped-cbe-blue-logo-5.png"
                alt="Coimbatore Manchester of South India — Nexprobyte Technologies"
                className="footer-coimbatore-cover-img"
                style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)' }}
              />
            </a>
          </div>

          <div className="footer-bottom">
            <div>&copy; 2026 Nexprobyte Technologies. All rights reserved. Registered in Coimbatore, Tamil Nadu, India.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link href="/about" className="footer-link">About Studio</Link>
              <Link href="/blog" className="footer-link">Insights</Link>
              <Link href="/careers" className="footer-link">Careers</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
