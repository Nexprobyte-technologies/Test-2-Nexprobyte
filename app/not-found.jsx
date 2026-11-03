'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        background: '#ffffff',
        color: '#141414',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '6px 16px',
          borderRadius: '999px',
          background: 'rgba(0, 102, 255, 0.08)',
          color: '#0066ff',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '16px',
        }}
      >
        Error 404
      </div>
      <h1
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: '12px',
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          fontSize: '1.05rem',
          color: '#666',
          maxWidth: '480px',
          marginBottom: '28px',
          lineHeight: 1.6,
        }}
      >
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '999px',
            background: '#141414',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}
        >
          Return Home &rarr;
        </Link>
        <Link
          href="/services"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '12px 24px',
            borderRadius: '999px',
            background: 'rgba(0, 0, 0, 0.04)',
            color: '#141414',
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          Explore Services
        </Link>
      </div>
    </div>
  );
}

