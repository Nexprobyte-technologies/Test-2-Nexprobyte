'use client';

import React from 'react';
import Link from 'next/link';

const COMPANY_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Careers', to: '/careers' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' }
];

const BUSINESS_LINKS = [
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'Mobile App Development', to: '/services/mobile-app-development' },
  { label: 'Application Development', to: '/services/application-development' },
  { label: 'UI/UX Design', to: '/services/ui-ux-design' },
  { label: 'Branding & Identity', to: '/services/branding-identity' },
  { label: 'Digital Marketing & Ads', to: '/services/digital-marketing' },
  { label: 'SEO Services', to: '/services/seo-services' },
  { label: 'Social Media Marketing', to: '/services/social-media-marketing' },
  { label: 'Dedicated Remote Developers', to: '/services/dedicated-developers' },
  { label: 'AI & Workflow Automation', to: '/services/ai-automation' },
  { label: 'Custom ERP & Software', to: '/services/custom-software' },
  { label: 'Virtual Assistance', to: '/services/virtual-assistance' }
];

const SOCIALS = [
  { key: 'f', label: 'Facebook', href: 'https://www.facebook.com/nexprobyte' },
  { key: 'X', label: 'X (Twitter)', href: 'https://twitter.com/nexprobyte' },
  { key: 'in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/nextprobytetechnologies' },
  { key: 'ig', label: 'Instagram', href: 'https://www.instagram.com/nexprobyte' }
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-ambient-glow" />
      <div className="wrap">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src="/images/nxtpro-logo.png"
                alt="Nexprobyte Logo"
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p className="f-desc">
              Nexprobyte Technologies is a digital marketing agency and software development company in Coimbatore. We help startups and SMEs grow with website development, SEO, social media marketing and AI-powered automation.
            </p>
            <div className="socials">
              {SOCIALS.map((t) => (
                <a
                  key={t.key}
                  href={t.href}
                  target={t.href.startsWith('http') ? '_blank' : undefined}
                  rel={t.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="social"
                  aria-label={`${t.label} profile`}
                >
                  {t.key}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Company Links */}
          <div>
            <h4>Company</h4>
            <ul>
              {COMPANY_LINKS.map((t) => (
                <li key={t.label}>
                  <Link href={t.to}>{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Business Services */}
          <div>
            <h4>Business</h4>
            <ul>
              {BUSINESS_LINKS.map((t) => (
                <li key={t.label}>
                  <Link href={t.to}>{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Get In Touch */}
          <div>
            <h4>Get In Touch</h4>
            <ul style={{ gap: 10 }}>
              <li>
                <a
                  href="https://maps.google.com/?q=+10.9994017,76.9686834"
                  target="_blank"
                  rel="noreferrer"
                  style={{ lineHeight: 1.45, fontSize: '13px' }}
                >
                  1st Floor, Nanjiammal Complex, Above City Bakery, Maniyakarampalayam, Coimbatore, Tamil Nadu 641006
                </a>
              </li>
              <li>
                <a href="mailto:info@nexprobyte.com">info@nexprobyte.com</a>
              </li>
              <li>
                <a href="tel:+919500042426">+91 95000 42426</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Center Pill Divider Badge: Coimbatore Wikipedia Emblem */}
        <div className="footer-divider-badge-wrap">
          <a
            href="https://en.wikipedia.org/wiki/Coimbatore"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-divider-badge"
            title="Explore Coimbatore on Wikipedia"
            aria-label="Coimbatore Wikipedia"
          >
            <img
              src="/assets/cropped-cbe-blue-logo-5.png"
              alt="Coimbatore Emblem"
              className="footer-center-emblem"
            />
          </a>
        </div>

        {/* Base Copyright & Location Credit */}
        <div className="base">
          <span style={{ alignSelf: 'center' }}>
            Copyright © 2026 <strong style={{ fontWeight: 700 }}>Nexprobyte Technologies</strong>. All rights reserved.
          </span>
          <span style={{ alignSelf: 'center' }}>Made with Motion in Coimbatore</span>
        </div>
      </div>
    </footer>
  );
}
