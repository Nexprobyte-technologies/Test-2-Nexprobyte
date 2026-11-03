'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log error to console without breaking UI
    if (typeof console !== 'undefined' && console.error) {
      console.error('Nexprobyte Application Boundary caught error:', error);
    }
  }, [error]);

  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '48px 24px',
        background: '#ffffff',
        color: '#141414',
        fontFamily: 'system-ui, -apple-system, sans-serif',
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
        Nexprobyte Technologies
      </div>
      <h1
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: '12px',
          color: '#141414',
        }}
      >
        Unable to load requested view
      </h1>
      <p
        style={{
          fontSize: '1rem',
          color: '#64748b',
          maxWidth: '500px',
          marginBottom: '28px',
          lineHeight: 1.6,
        }}
      >
        A transient cache or network module loading issue occurred. You can retry refreshing or return to the main portal.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => {
            if (typeof reset === 'function') reset();
            else if (typeof window !== 'undefined') window.location.reload();
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '12px 26px',
            borderRadius: '999px',
            background: '#0066ff',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 4px 14px rgba(0, 102, 255, 0.25)',
          }}
        >
          Reload Page
        </button>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '12px 26px',
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
      </div>
    </div>
  );
}

