'use client';

import React from 'react';

const TN_REVIEWS = [
  {
    name: 'Rajesh Kumar',
    company: 'RK Textiles',
    city: 'Tirupur',
    rating: 5,
    initials: 'RK',
    color: '#ff6b1a',
    text: 'Nexprobyte team sema fast da! E-commerce portal 45 days la mudichitanga. En sales 3x increase aayiduchu. Support also super, night 10PM ku kooda reply pannuvanga.',
  },
  {
    name: 'Dr. Priya S.',
    company: 'Care Hospital',
    city: 'Coimbatore',
    rating: 5,
    initials: 'DP',
    color: '#0066FF',
    text: 'Hospital software super-uh irukku. Appointment to billing full automate pannitanga. Staff training also gave properly. Now 25 clinics use same system, no tension.',
  },
  {
    name: 'Arun M.',
    company: 'Spice Route Restaurants',
    city: 'Chennai & Coimbatore',
    rating: 5,
    initials: 'AM',
    color: '#635bff',
    text: 'App sema smooth. Customer order pannina direct kitchen la display varuthu. 10k+ downloads in 3 months! Coimbatore team but Chennai la irundhu work panna easy.',
  },
  {
    name: 'Senthil Velan',
    company: 'Salem Properties',
    city: 'Salem',
    rating: 5,
    initials: 'SV',
    color: '#ff6b1a',
    text: 'Real estate portal la 500+ listings irukku. Clients Google la search panni en site thaan varuthu. SEO work vera level. Lead quality improve aayiduchu, thanks Nexprobyte!',
  },
  {
    name: 'Mohan Babu',
    company: 'Erode Weaving Mills',
    city: 'Erode',
    rating: 5,
    initials: 'MB',
    color: '#00d6b2',
    text: 'Textile ERP nala en 50+ factory management easy aayiduchu. Yarn stock to delivery tracking full digital. Before Excel la thaan, ippo one-click report. Worth every rupee.',
  },
  {
    name: 'Karthik Pandian',
    company: 'Madurai Scholars Academy',
    city: 'Madurai',
    rating: 5,
    initials: 'KP',
    color: '#0066FF',
    text: 'LMS platform la 5000 students padikiranga. Live class, test, doubt section ellam irukku. Parents app la progress pakalam. Students ku pidichirukku, fees collection 2x fast!',
  },
];

const GLOBAL_TESTIMONIALS = [
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

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container" style={{ marginBottom: '40px' }}>
        <div className="section-header reveal-up">
          <div className="badge-tag">Verified Client Proof • Across Tamil Nadu &amp; Global</div>
          <h2 className="section-title">
            What Our Clients Say <br />
            <span className="gradient-text">Across Tamil Nadu &amp; Worldwide</span>
          </h2>
          <p className="section-subtitle">
            4.9 out of 5 stars from over 150+ funded startups, manufacturing hubs, healthcare clinics, and global enterprises.
          </p>
        </div>

        {/* Platform Ratings Strip */}
        <div className="platform-ratings-strip reveal-up">
          <div className="platform-rating-item">
            <span className="platform-name">Google Reviews</span>
            <span className="platform-stars">★★★★★ 4.9/5</span>
            <span className="platform-sub">48+ Local Reviews</span>
          </div>
          <div className="platform-divider" />
          <div className="platform-rating-item">
            <span className="platform-name">Clutch</span>
            <span className="platform-stars">★★★★★ 5.0/5</span>
            <span className="platform-sub">Top Developers 2024</span>
          </div>
          <div className="platform-divider" />
          <div className="platform-rating-item">
            <span className="platform-name">Justdial</span>
            <span className="platform-stars">★★★★★ 4.8/5</span>
            <span className="platform-sub">Verified Business</span>
          </div>
          <div className="platform-divider" />
          <div className="platform-rating-item">
            <span className="platform-name">Facebook</span>
            <span className="platform-stars">★★★★★ 4.9/5</span>
            <span className="platform-sub">Client Recommendation</span>
          </div>
        </div>

        {/* Tamil Nadu Tanglish Reviews Grid */}
        <div className="tn-reviews-grid stagger-group" style={{ marginTop: '32px' }}>
          {TN_REVIEWS.map((rev, idx) => (
            <div key={idx} className="tn-review-card spotlight-card reveal-up">
              <div className="tn-rev-header">
                <div className="tn-rev-avatar" style={{ background: rev.color }}>
                  {rev.initials}
                </div>
                <div>
                  <div className="tn-rev-name">{rev.name}</div>
                  <div className="tn-rev-company">{rev.company} • 📍 {rev.city}</div>
                </div>
              </div>
              <div className="tn-rev-stars">★★★★★</div>
              <p className="tn-rev-text">&ldquo;{rev.text}&rdquo;</p>
              <div className="tn-rev-footer">
                <span className="tn-rev-badge">VERIFIED CLIENT • 2024</span>
                <span className="tn-rev-status">5.0 Star Rating</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Client Marquee Track (Preserving Dual Group for Tests & Seamless Motion) */}
      <div className="testimonials-track reveal-fade">
        <div className="testimonials-group">
          {GLOBAL_TESTIMONIALS.map((t, idx) => (
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
          {GLOBAL_TESTIMONIALS.map((t, idx) => (
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
