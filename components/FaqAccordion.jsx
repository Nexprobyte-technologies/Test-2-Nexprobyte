'use client';

import React, { useState } from 'react';

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How quickly can we onboard a developer or VA?',
      a: 'Most virtual assistants and dedicated developers are vetted and ready to join your team within 24 to 48 hours. We maintain an active bench of pre-interviewed, top 1% talent ready for immediate deployment.',
    },
    {
      q: 'How do you vet your developers and assistants?',
      a: 'Every candidate undergoes a strict 5-stage vetting protocol: English proficiency screening, live technical coding challenges / live administrative problem solving, reference verification, and a culture-fit assessment. Only top 1% applicants are accepted.',
    },
    {
      q: 'What time zones do your teams support?',
      a: 'We provide full time-zone overlap with US (EST, CST, PST), UK (GMT/BST), European (CET), and Australian (AEST) business hours. Your dedicated talent attends your daily standups and communicates live throughout your work day.',
    },
    {
      q: 'Who owns the intellectual property and code?',
      a: 'You do — 100%. All code, documentation, credentials, workflows, and intellectual property produced by our developers or virtual assistants belong entirely to your company under strict confidentiality and international NDA agreements.',
    },
    {
      q: 'Can we swap or scale team members easily?',
      a: 'Yes. If a team member is ever not the exact right fit, or if your project requirements change, we provide a replacement within 48 hours at zero additional cost. You can also ramp team sizes up or down with 7 days notice.',
    },
    {
      q: 'What automation tools and stacks do you support?',
      a: 'We work across Zapier, Make.com, n8n, OpenAI, Claude, LangChain, WhatsApp Business API, HubSpot, Salesforce, Airtable, Shopify, and custom Python/Node automation scripts.',
    },
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-split">
          {/* Support Card */}
          <div className="faq-card-support spotlight-card reveal-up">
            <div className="badge-tag">Got Questions?</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Talk to Our Solutions Architect
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Have a custom requirement, specialized stack, or large manpower requirement? We reply in under two hours with a tailored proposal.
            </p>
            <a
              href="#contact"
              className="btn-primary-hero"
              style={{ fontSize: '0.9rem', padding: '12px 24px', justifyContent: 'center' }}
            >
              Schedule Discovery Call
            </a>
          </div>

          {/* Accordion List */}
          <div className="faq-accordion-list stagger-group" id="faq-accordion">
            {faqs.map((faq, idx) => {
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
                    <span>{faq.q}</span>
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
                      maxHeight: isOpen ? '200px' : '0px',
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
