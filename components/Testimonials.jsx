import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        '"Nexprobyte onboarded a senior React and Flutter developer for our mobile app in under 48 hours. They hit the ground running on day one with clean pull requests."',
      avatar: 'MC',
      avatarBg: '#0066ff',
      name: 'Marcus Chen',
      role: 'CTO, Hyperion Logistics',
    },
    {
      quote:
        '"Our executive VA from Nexprobyte completely transformed our daily operations. Calendar, customer tickets, and invoice reconciliation happen like clockwork."',
      avatar: 'SL',
      avatarBg: '#12a150',
      name: 'Sarah Lindqvist',
      role: 'Founder, Apex Commerce',
    },
    {
      quote:
        '"The n8n and WhatsApp automations built by Nexprobyte eliminated 15 hours of manual data entry every single week. Best ROI of any software investment."',
      avatar: 'DK',
      avatarBg: '#635bff',
      name: 'David Kalu',
      role: 'Head of Ops, Orbit Global',
    },
    {
      quote:
        '"They built our entire custom CRM and billing portal from scratch in 6 weeks. Rock-solid code, excellent communication, and zero bugs."',
      avatar: 'ER',
      avatarBg: '#ff6b1a',
      name: 'Elena Rossi',
      role: 'COO, Brightwave Media',
    },
    {
      quote:
        '"As a digital marketing agency, Nexprobyte\'s white-label development manpower has allowed us to take on 5x more client website builds without hiring locally."',
      avatar: 'TH',
      avatarBg: '#00d6b2',
      name: 'Tyler Hayes',
      role: 'Managing Director, NovaScale',
    },
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container" style={{ marginBottom: '40px' }}>
        <div className="section-header reveal-up" style={{ marginBottom: 0 }}>
          <div className="badge-tag">Verified Client Proof</div>
          <h2 className="section-title">Loved by High-Growth Companies</h2>
          <p className="section-subtitle">
            4.9 out of 5 stars from over 150+ funded startups, agencies, and e-commerce enterprises.
          </p>
        </div>
      </div>

      <div className="testimonials-track reveal-fade">
        <div className="testimonials-group">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: t.avatarBg }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-group" aria-hidden="true">
          {testimonials.map((t, idx) => (
            <div key={`dup-${idx}`} className="testimonial-card">
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: t.avatarBg }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
