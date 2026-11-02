'use client';

import React from 'react';
import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  if (!items || !items.length) return null;

  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <span key={idx} className="crumb-segment">
          {idx > 0 && <span className="crumb-sep">/</span>}
          {item.to ? (
            <Link href={item.to} className="crumb-link">
              {item.label}
            </Link>
          ) : (
            <span className="crumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

