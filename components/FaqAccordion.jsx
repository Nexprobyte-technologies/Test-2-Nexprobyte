'use client';

import React, { useState } from 'react';

const FAQS = [
  {
    category: 'Delivery & Timelines',
    q: 'How fast can Nexprobyte build and launch our custom platform?',
    a: 'For standard business websites and landing page systems, delivery is typically 7 to 14 business days. For complex web applications, native mobile apps, and enterprise SaaS systems, our agile sprint timeline ranges from 21 to 30 days, complete with weekly review deployments, staging access, and test-driven quality assurance.',
  },
  {
    category: 'Ownership & IP',
    q: 'Do we get 100% full code ownership and intellectual property?',
    a: 'Yes, completely. Upon project handover, full source code repositories (GitHub / GitLab), Figma UI/UX design token files, cloud hosting credentials, and database keys are transferred directly to your organization with zero vendor lock-in or recurring proprietary licensing fees.',
  },
  {
    category: 'Technology & Architecture',
    q: 'What technology stacks and architectures do you specialize in?',
    a: 'Our engineering team specializes in modern React, Next.js 15, Node.js, Python, React Native, and Flutter for mobile apps. For backends and data, we build on PostgreSQL, MongoDB, Redis, and high-availability cloud infrastructures on AWS and DigitalOcean, engineered with 95+ Core Web Vitals performance.',
  },
  {
    category: 'Growth & Marketing',
    q: 'How do your SEO and digital marketing services drive measurable revenue?',
    a: 'We reject vanity metrics. Our SEO campaigns focus on commercial high-intent keyword dominance, schema optimization, and technical speed that Google rewards with top rankings. For performance marketing (Google & Meta Ads), we build custom high-conversion landing page funnels and track full conversion attribution through Google Analytics 4.',
  },
  {
    category: 'Maintenance & Retainers',
    q: 'What post-launch support and ongoing maintenance do you provide?',
    a: 'Every project includes 1 to 3 months of free post-launch bug fixing, performance monitoring, and content assistance. We also offer ongoing monthly retainers for high-growth brands that require continuous feature development, security updates, 24/7 uptime monitoring, and cloud maintenance.',
  },
  {
    category: 'AI & Automation',
    q: 'Can we integrate automated workflows and AI copilots into our existing tools?',
    a: 'Absolutely. We specialize in building custom n8n automated pipelines and proprietary AI assistants that connect over 400+ enterprise APIs, CRM systems (HubSpot, Salesforce, Zoho), WhatsApp Business APIs, and payment gateways (Razorpay, Stripe) to eliminate repetitive manual work.',
  },
  {
    category: 'Dedicated Teams',
    q: 'How quickly can we onboard a developer or VA?',
    a: 'Most virtual assistants and dedicated developers are vetted and ready to join your team within 24 to 48 hours. We maintain an active bench of pre-interviewed, top 1% talent ready for immediate deployment.',
  },
  {
    category: 'Talent Vetting',
    q: 'How do you vet your developers and assistants?',
    a: 'Every candidate undergoes a strict 5-stage vetting protocol: English proficiency screening, live technical coding challenges / live administrative problem solving, reference verification, and a culture-fit assessment. Only top 1% applicants are accepted.',
  },
  {
    category: 'Global Collaboration',
    q: 'What time zones do your teams support?',
    a: 'We provide full time-zone overlap with US (EST, CST, PST), UK (GMT/BST), European (CET), and Australian (AEST) business hours. Your dedicated talent attends your daily standups and communicates live throughout your work day.',
  },
  {
    category: 'Agility & Scaling',
    q: 'Can we swap or scale team members easily?',
    a: 'Yes. If a team member is ever not the exact right fit, or if your project requirements change, we provide a replacement within 48 hours at zero additional cost. You can also ramp team sizes up or down with 7 days notice.',
  },
  {
    category: 'Automation Tools',
    q: 'What automation tools and stacks do you support?',
    a: 'We work across Zapier, Make.com, n8n, OpenAI, Claude, LangChain, WhatsApp Business API, HubSpot, Salesforce, Airtable, Shopify, and custom Python/Node automation scripts.',
  },
  {
    category: 'Satisfaction Guarantee',
    q: 'How does the 14-day risk-free satisfaction guarantee work?',
    a: 'For all dedicated developer and virtual assistant retainers, the first 14 days serve as a risk-free trial. If you are not 100% delighted with their velocity and communication, we cancel the invoice and assign a new specialist immediately.',
  },
];

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Delivery & Timelines', 'Technology & Architecture', 'Growth & Marketing', 'Dedicated Teams', 'AI & Automation'];

  const filteredFaqs = FAQS.filter(
    (f) => activeFilter === 'All' || f.category === activeFilter
  );

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header reveal-up">
          <div className="badge-tag">FREQUENTLY ASKED QUESTIONS • Saro Clarity</div>
          <h2 className="section-title">
            Answers To Help You <span className="gradient-text">Move Faster</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about partnering with Nexprobyte Technologies for custom software engineering, high-performance websites, dedicated talent, and revenue-driven digital marketing.
          </p>
        </div>

        {/* Category Pills */}
        <div className="faq-filter-bar reveal-up">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`faq-cat-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="faq-split" style={{ marginTop: '30px' }}>
          {/* Support Card */}
          <div className="faq-card-support spotlight-card reveal-up">
            <div className="badge-tag">Got Questions?</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', margin: '14px 0' }}>
              Talk to Our Senior Architects
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Have a custom requirement, specialized stack, or large manpower scope? Schedule a 20-minute discovery consultation with our senior engineering architects in Coimbatore.
            </p>
            <div style={{ marginTop: '24px' }}>
              <a
                href="#contact"
                className="btn-primary-hero"
                style={{ fontSize: '0.9rem', padding: '12px 24px', justifyContent: 'center', width: '100%' }}
              >
                Talk with an Architect &rarr;
              </a>
            </div>
            <div style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              📞 Direct Call: +91 95000 42426 <br />
              ✉️ Email: info@nexprobyte.com
            </div>
          </div>

          {/* Accordion List */}
          <div className="faq-accordion-list stagger-group" id="faq-accordion">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`faq-accordion-item reveal-up ${isOpen ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-accordion-trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  >
                    <div>
                      <span className="faq-cat-badge">{faq.category}</span>
                      <span className="faq-q-text">{faq.q}</span>
                    </div>
                    <svg
                      className="faq-icon-rot"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div
                    className="faq-accordion-body"
                    style={{
                      maxHeight: isOpen ? '260px' : '0px',
                      opacity: isOpen ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease, opacity 0.25s ease',
                    }}
                  >
                    <div className="faq-accordion-body-inner">{faq.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
