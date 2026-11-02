'use client';

import React, { useState } from 'react';

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
              Deploy Today
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700 }}>
              Run Your Business From One Calm Ecosystem.
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '620px' }}>
              Join 150+ teams using Nexprobyte Technologies to hire dedicated developers, deploy executive VAs, and automate workflows.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
              <a href="#contact" className="btn-primary-hero" style={{ background: '#fff', color: '#141414' }}>
                Deploy Dedicated Team
              </a>
              <a href="#pricing" className="btn-secondary-hero" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                View Pricing Plans
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top reveal-up">
            <div>
              <a href="#hero" className="nav-brand footer-brand" aria-label="Nexprobyte Technologies">
                <div className="brand-icon footer-brand-icon">
                  <img src="/assets/logo-transparent.png" alt="Nexprobyte Logo" className="brand-logo-img" width={28} height={18} />
                </div>
                <span>NEXPROBYTE TECHNOLOGIES</span>
              </a>
              <p className="footer-brand-desc">
                Virtual Assistance • Remote Development Teams • AI Automation • Business Software Solutions. The unified partner for high-velocity modern teams.
              </p>
            </div>

            <div>
              <h4 className="footer-heading">Services</h4>
              <ul className="footer-links">
                <li><a href="#service-va" className="footer-link">Virtual Assistant Services</a></li>
                <li><a href="#service-dev" className="footer-link">Software Dev Manpower</a></li>
                <li><a href="#service-ai" className="footer-link">AI &amp; Automation VA</a></li>
                <li><a href="#service-support" className="footer-link">E-Commerce Technical Support</a></li>
                <li><a href="#service-custom" className="footer-link">CRM &amp; Software Solutions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li><a href="#platform" className="footer-link">Platform Overview</a></li>
                <li><a href="#tour" className="footer-link">Ecosystem Tour</a></li>
                <li><a href="#pricing" className="footer-link">Pricing &amp; ROI</a></li>
                <li><a href="#testimonials" className="footer-link">Client Case Studies</a></li>
                <li><a href="#faq" className="footer-link">Frequently Asked Questions</a></li>
                <li><a href="#contact" className="footer-link">Contact Sales</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Newsletter</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Tech team insights, automation blueprints, and hiring playbooks. One email a month.
              </p>
              <form className="newsletter-form" id="newsletter-form" onSubmit={handleNewsletter}>
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

          <div className="footer-bottom">
            <div>&copy; 2026 Nexprobyte Technologies. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Security Protocols</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
