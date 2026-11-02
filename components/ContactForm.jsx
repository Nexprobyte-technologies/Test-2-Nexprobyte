'use client';

import React, { useState } from 'react';

const TOPICS = [
  'New website',
  'App development',
  'Digital marketing',
  'SEO services',
  'Social media',
  'Dedicated Developers',
  'Virtual Assistants',
  'AI & Automation',
  'Careers / Hiring',
];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organizationType, setOrganizationType] = useState('Company');
  const [topic, setTopic] = useState('New website');
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
      setToastText(`Thank you, ${name.trim()}! Our solutions team in Coimbatore will reach out within 2 hours.`);
      setToastVisible(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');

      setTimeout(() => {
        setToastVisible(false);
      }, 5000);
    }, 600);
  };

  return (
    <>
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-box spotlight-card reveal-scale">
            {/* Left Info: Verified Coimbatore Headquarters & Direct Channels */}
            <div className="contact-info">
              <div>
                <div className="badge-tag" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
                  Coimbatore Headquarters • Global Delivery
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#fff', margin: '18px 0' }}>
                  Talk to a Real Person.
                </h2>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', maxWidth: '440px' }}>
                  Tell us what team members, software platforms, or growth campaigns your business needs, and we&apos;ll craft a tailored proposal. No pushy sales, just straightforward answers.
                </p>

                {/* Verified Address & Contact Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '28px' }}>
                  <a
                    href="https://maps.google.com/?q=10.9994017,76.9686834"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-detail-card"
                  >
                    <span className="contact-icon-badge">📍</span>
                    <div>
                      <div className="contact-card-title">Coimbatore Studio Location</div>
                      <div className="contact-card-val">
                        1st Floor, Nanjiammal Complex, Above City Bakery, Maniyakarampalayam, Coimbatore, Tamil Nadu 641006
                      </div>
                      <span className="contact-open-hint">Open in Google Maps ↗</span>
                    </div>
                  </a>

                  <a href="tel:+919500042426" className="contact-detail-card">
                    <span className="contact-icon-badge">📞</span>
                    <div>
                      <div className="contact-card-title">Direct Telephone</div>
                      <div className="contact-card-val">+91 95000 42426</div>
                    </div>
                  </a>

                  <a href="mailto:info@nexprobyte.com" className="contact-detail-card">
                    <span className="contact-icon-badge">✉️</span>
                    <div>
                      <div className="contact-card-title">Official Inquiries</div>
                      <div className="contact-card-val">info@nexprobyte.com • contact@nexprobyte.com</div>
                    </div>
                  </a>

                  <div className="contact-detail-card" style={{ cursor: 'default' }}>
                    <span className="contact-icon-badge">🕒</span>
                    <div>
                      <div className="contact-card-title">Office Hours</div>
                      <div className="contact-card-val">
                        Mon – Sat · 9:30 AM – 6:30 PM IST (Sunday by appointment)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Full Name</label>
                <input
                  type="text"
                  id="contact-name"
                  className="form-input"
                  placeholder="e.g. Rajesh Kumar"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Work Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    className="form-input"
                    placeholder="you@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-phone">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    className="form-input"
                    placeholder="+91 95000 42426"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Organization Type</label>
                <select
                  className="form-select"
                  value={organizationType}
                  onChange={(e) => setOrganizationType(e.target.value)}
                >
                  <option value="Company">Company / Corporate</option>
                  <option value="Startup">High-Growth Startup / Scaleup</option>
                  <option value="Agency">Digital Agency Partner</option>
                  <option value="Individual">Individual Founder / Enquiry</option>
                </select>
              </div>

              {/* Topic Select Buttons */}
              <div className="form-group">
                <label className="form-label">What do you need?</label>
                <div className="topic-grid">
                  {TOPICS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`topic-pill ${topic === t ? 'is-active' : ''}`}
                      onClick={() => setTopic(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Project Scope &amp; Goals</label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  rows={4}
                  placeholder="Tell us a little about your timeline, tech requirements, target users..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-primary-hero"
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Transmitting Request…' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Floating Confirmation Toast */}
      {toastVisible && (
        <div className="toast-modal" id="toast-modal" role="status">
          <div className="toast-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d6b2" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{toastText}</span>
          </div>
        </div>
      )}
    </>
  );
}
