'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('va');
  const [teamSize, setTeamSize] = useState('1');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState('Message sent successfully! Our team will contact you in 2 hours.');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastText(`Thank you, ${name.trim()}! Our solutions team will reach out within 2 hours.`);
      setToastVisible(true);
      setName('');
      setEmail('');
      setMessage('');

      setTimeout(() => {
        setToastVisible(false);
      }, 4500);
    }, 700);
  };

  return (
    <>
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-box spotlight-card reveal-scale">
            {/* Left Info */}
            <div className="contact-info">
              <div>
                <div className="badge-tag" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
                  Get In Touch
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#fff', margin: '18px 0' }}>
                  Talk to a Real Person.
                </h2>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', maxWidth: '440px' }}>
                  Tell us what team members or automations your business needs, and we'll craft a customized ramp-up proposal. No pushy sales, just straightforward answers.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Replies in under two hours
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Free onboarding &amp; sprint roadmap help
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    14-day risk-free satisfaction guarantee
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '40px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                Prefer direct email? <br />
                <a href="mailto:contact@nexprobyte.com" style={{ color: '#fff', fontWeight: 600, textDecoration: 'underline' }}>
                  contact@nexprobyte.com
                </a>
              </div>
            </div>

            {/* Right Form */}
            <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  type="text"
                  id="contact-name"
                  className="form-input"
                  placeholder="Alex Morgan"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Work Email</label>
                <input
                  type="email"
                  id="contact-email"
                  className="form-input"
                  placeholder="alex@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-service">Service Interested In</label>
                <select
                  id="contact-service"
                  className="form-select"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="va">1. Virtual Assistant Services</option>
                  <option value="dev">2. Software Development Manpower</option>
                  <option value="ai">3. AI &amp; Business Automation VA</option>
                  <option value="web">4. Website &amp; E-Commerce Technical Support</option>
                  <option value="custom">5. CRM, Software &amp; Business Solutions</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-team-size">Target Team Size</label>
                <select
                  id="contact-team-size"
                  className="form-select"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                >
                  <option value="1">1 Dedicated Specialist</option>
                  <option value="2-3">2 - 3 Specialists (Pod)</option>
                  <option value="4-10">4 - 10 Dedicated Engineers</option>
                  <option value="enterprise">Full Enterprise Team (10+)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">How can we help?</label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  rows={3}
                  placeholder="Tell us about your project requirements or tech stack..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn-submit" id="contact-submit-btn" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Toast Notification Modal */}
      <div className={`toast-modal ${toastVisible ? 'show' : ''}`} id="toast-modal" style={{ display: toastVisible ? 'flex' : 'none' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span id="toast-message">{toastText}</span>
      </div>
    </>
  );
}
