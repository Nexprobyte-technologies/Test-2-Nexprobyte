'use client';

import React from 'react';
import Link from 'next/link';
import './TrustedRatingsSection.css';
import { COMPANY_INFO } from '@/data/siteContent';

function StarIcons({ count = 5 }) {
  return (
    <div className="rating-stars-row" aria-label={`${count} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="star-icon"
          viewBox="0 0 24 24"
          fill="#ffb800"
          stroke="#ffb800"
          strokeWidth="1"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const RATINGS_DATA = [
  {
    id: 'google',
    isPrimary: true,
    primaryBadge: 'PRIMARY PLATFORM',
    name: 'Google',
    sub: 'Google Business Reviews',
    score: '5.0',
    stars: 5,
    countLabel: 'Verified Client Reviews',
    viewText: 'View on Google',
    href: COMPANY_INFO?.socials?.maps || 'https://maps.google.com/?q=+10.9994017,76.9686834',
    isExternal: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
        />
      </svg>
    ),
    iconBoxClass: 'google-icon-box',
  },
  {
    id: 'clutch',
    isPrimary: false,
    name: 'Clutch',
    sub: 'B2B Ratings & Reviews',
    score: '5.0',
    stars: 5,
    countLabel: 'Top B2B Agency',
    viewText: 'View on Clutch',
    href: COMPANY_INFO?.socials?.clutch || 'https://clutch.co/profile/nexprobyte',
    isExternal: true,
    icon: <span className="clutch-c">C</span>,
    iconBoxClass: 'clutch-icon-box',
  },
  {
    id: 'justdial',
    isPrimary: false,
    name: 'Justdial',
    sub: 'Business Directory & Reviews',
    score: '4.8',
    stars: 5,
    countLabel: '317 Ratings',
    viewText: 'View on Justdial',
    href: COMPANY_INFO?.socials?.justdial || 'https://www.justdial.com/Coimbatore/Nexprobyte-Technologies',
    isExternal: true,
    icon: <span className="justdial-text">JD</span>,
    iconBoxClass: 'justdial-icon-box',
  },
  {
    id: 'facebook',
    isPrimary: false,
    name: 'Facebook',
    sub: 'Official Page',
    score: '4.8',
    stars: 5,
    countLabel: 'Verified Community',
    viewText: 'View on Facebook',
    href: COMPANY_INFO?.socials?.facebook || 'https://www.facebook.com/nexprobyte',
    isExternal: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    iconBoxClass: 'facebook-icon-box',
  },
  {
    id: 'glassdoor',
    isPrimary: false,
    name: 'Glassdoor',
    sub: 'Employee Reviews',
    score: '5.0',
    stars: 5,
    countLabel: '5 Reviews',
    viewText: 'View on Glassdoor',
    href: '/company',
    isExternal: false,
    icon: <span className="glassdoor-text">G</span>,
    iconBoxClass: 'glassdoor-icon-box',
  },
];

export default function TrustedRatingsSection() {
  return (
    <section className="trusted-ratings-section" id="ratings" aria-labelledby="ratings-title">
      <div className="trusted-ratings-container">
        {/* Section Header */}
        <header className="trusted-ratings-header">
          <h2 id="ratings-title" className="trusted-ratings-title">
            Trusted. Rated. Recommended.
          </h2>
          <p className="trusted-ratings-sub">
            Recognised by customers and professionals across leading platforms.
          </p>
        </header>

        {/* 5 Cards Grid */}
        <div className="trusted-ratings-grid">
          {RATINGS_DATA.map((card) => {
            const cardContent = (
              <>
                {card.isPrimary && (
                  <span className="primary-platform-pill">{card.primaryBadge}</span>
                )}

                <div className="rating-card-top">
                  <div className={`rating-platform-icon-wrap ${card.iconBoxClass}`}>
                    {card.icon}
                  </div>
                  <div className="rating-platform-meta">
                    <span className="rating-platform-name">{card.name}</span>
                    <span className="rating-platform-sub">{card.sub}</span>
                  </div>
                </div>

                <div className="rating-card-body">
                  <div className="rating-score-row">
                    <span className="rating-score-num">{card.score}</span>
                    <div className="rating-stars-wrap">
                      <StarIcons count={card.stars} />
                    </div>
                  </div>
                  <div className="rating-detail-count">{card.countLabel}</div>
                </div>

                <div className="rating-card-footer">
                  <span className="rating-view-link">
                    {card.viewText} <span className="link-arrow">&rarr;</span>
                  </span>
                </div>
              </>
            );

            return card.isExternal ? (
              <a
                key={card.id}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`trusted-rating-card ${card.isPrimary ? 'is-primary' : ''}`}
                aria-label={`${card.name}: ${card.score} rating on ${card.sub}`}
              >
                {cardContent}
              </a>
            ) : (
              <Link
                key={card.id}
                href={card.href}
                className={`trusted-rating-card ${card.isPrimary ? 'is-primary' : ''}`}
                aria-label={`${card.name}: ${card.score} rating on ${card.sub}`}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA Row */}
        <div className="trusted-ratings-bottom">
          <Link href="/company" className="trusted-awards-cta">
            See our full Awards &amp; Recognition <span className="cta-arrow">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
