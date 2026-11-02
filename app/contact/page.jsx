'use client';

import React, { useState } from 'react';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { COMPANY_INFO } from '@/data/siteContent';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    topic: 'New website',
    budget: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const topics = [
    'New website',
    'App development',
    'Digital marketing',
    'SEO',
    'Social media',
    'Careers',
    'Something else',
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email (e.g. you@company.com).';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number (10–11 digits).';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please tell us a little about your project.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact Studio' }]} />
      </div>

      <PageHero
        num="Contact"
        label="Coimbatore Studio"
        title={["Let's Build Something", 'Enduring']}
        sub="Tell us where you are — we'll bring the roadmap. We usually reply within one business day."
      />

      <section className="section wrap" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="contact-page-grid">
            {/* Contact Form Card */}
            <div className="contact-form-column">
              {isSubmitted ? (
                <div className="contact-form-success spotlight-card">
                  <div className="success-icon-badge">✓</div>
                  <h3 className="success-heading">Message Dispatched!</h3>
                  <p className="success-message">
                    Thank you, <b>{formData.name}</b>. We have received your inquiry regarding <b>{formData.topic}</b>.
                  </p>
                  <p className="success-sub">
                    Our lead architect in Coimbatore will review your scope and reply to <b>{formData.email}</b> or call you within one business day.
                  </p>
                  <button
                    type="button"
                    className="btn-primary-hero"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        topic: 'New website',
                        budget: '',
                        message: '',
                      });
                    }}
                    style={{ marginTop: '20px' }}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form className="contact-inquiry-form spotlight-card" onSubmit={handleSubmit}>
                  <h2 className="form-heading">Start a Conversation</h2>

                  {/* Topic Selector */}
                  <div className="form-group full-width">
                    <label className="form-label">What can we help you build? *</label>
                    <div className="contact-topic-pills">
                      {topics.map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`contact-topic-pill ${formData.topic === t ? 'is-active' : ''}`}
                          onClick={() => setFormData({ ...formData, topic: t })}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group col-half">
                      <label className="form-label">Your Name *</label>
                      <input
                        type="text"
                        className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Ramesh Sundaram"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <span className="field-error-msg">{errors.name}</span>}
                    </div>

                    <div className="form-group col-half">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <span className="field-error-msg">{errors.email}</span>}
                    </div>

                    <div className="form-group col-half">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="+91 95000 42426"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                    </div>

                    <div className="form-group col-half">
                      <label className="form-label">Company / Brand (Optional)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Your Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">Estimated Budget (Optional)</label>
                      <select
                        className="form-select"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      >
                        <option value="">Select an investment tier...</option>
                        <option value="₹18,999 – ₹38,999 (Essential Launch)">₹18,999 – ₹38,999 (Essential Launch)</option>
                        <option value="₹38,999 – ₹74,999 (Growth Pro)">₹38,999 – ₹74,999 (Growth Pro)</option>
                        <option value="₹75,000+ (Custom Enterprise / App)">₹75,000+ (Custom Enterprise / App)</option>
                        <option value="Monthly Retainer ($1,299 – $5,499/mo)">Monthly Retainer ($1,299 – $5,499/mo)</option>
                      </select>
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">Project Details / Requirements *</label>
                      <textarea
                        className={`form-textarea ${errors.message ? 'is-invalid' : ''}`}
                        rows="4"
                        placeholder="Briefly describe what you're trying to build, key goals, target timeline, or reference websites..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                      {errors.message && <span className="field-error-msg">{errors.message}</span>}
                    </div>
                  </div>

                  <div className="form-submit-row">
                    <button
                      type="submit"
                      className="btn-primary-hero submit-app-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Transmitting Message...' : 'Send Message To Studio &rarr;'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Contact Info */}
            <aside className="contact-sidebar-column">
              <div className="contact-info-card spotlight-card">
                <span className="info-card-badge">HEADQUARTERS</span>
                <h3 className="info-card-title">Coimbatore Studio</h3>
                <p className="info-card-address">{COMPANY_INFO.address}</p>

                <div className="info-card-link-wrap">
                  <a
                    href={COMPANY_INFO.socials.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-card-map-link"
                  >
                    View On Google Maps (10.9994° N, 76.9687° E) &nearr;
                  </a>
                </div>

                <div className="contact-details-list">
                  <div className="contact-item">
                    <span className="contact-item-label">Direct Phone:</span>
                    <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="contact-item-val">
                      {COMPANY_INFO.phone}
                    </a>
                  </div>

                  <div className="contact-item">
                    <span className="contact-item-label">Studio Email:</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="contact-item-val">
                      {COMPANY_INFO.email}
                    </a>
                  </div>

                  <div className="contact-item">
                    <span className="contact-item-label">Studio Hours:</span>
                    <span className="contact-item-val">{COMPANY_INFO.hours}</span>
                  </div>
                </div>
              </div>

              {/* Verified Ratings Box */}
              <div className="contact-ratings-card spotlight-card" style={{ marginTop: '20px' }}>
                <span className="info-card-badge">VERIFIED REPUTATION</span>
                <h4 className="ratings-card-title">Top-Rated Studio in Tamil Nadu</h4>
                <div className="ratings-pills">
                  <span className="rating-pill">⭐ Google 4.9/5</span>
                  <span className="rating-pill">⭐ Clutch 5.0/5</span>
                  <span className="rating-pill">⭐ Justdial 4.8/5</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
