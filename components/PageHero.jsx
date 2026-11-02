'use client';

import React from 'react';
import Link from 'next/link';

export default function PageHero({ num, label, title, sub, media, children }) {
  const titles = Array.isArray(title) ? title : [title];

  return (
    <section className={`page-hero-wrap ${media ? 'has-media' : ''}`}>
      <div className="page-hero-bg">
        <div className="page-hero-grid-pattern" />
        <div className="page-hero-orb page-hero-orb-1" />
        <div className="page-hero-orb page-hero-orb-2" />
      </div>

      <div className="container">
        <div className={media ? 'page-hero-grid' : ''}>
          <div className={media ? 'page-hero-left' : ''}>
            <div className="page-hero-badge">
              <span className="page-hero-badge-dot" />
              {num && <span className="page-hero-num">{num}</span>}
              {num && label && <span className="page-hero-sep">/</span>}
              {label && <span className="page-hero-label">{label}</span>}
            </div>

            <h1 className="page-title h-display">
              {titles.map((t, idx) => (
                <span key={idx} style={{ display: 'block' }}>
                  {t}
                </span>
              ))}
            </h1>

            {sub && <p className="page-sub">{sub}</p>}

            {children}
          </div>

          {media && <div className="page-hero-right">{media}</div>}
        </div>
      </div>
    </section>
  );
}

