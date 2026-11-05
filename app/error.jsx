'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
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
        padding: '60px 24px',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      <div className="badge-tag" style={{ marginBottom: '20px' }}>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent-red)',
            display: 'inline-block',
            marginRight: '8px',
          }}
        />
        Application Notice
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: '16px',
          lineHeight: 1.15,
        }}
      >
        Unable to Load Requested View
      </h1>
      <p
        style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '520px',
          marginBottom: '32px',
          lineHeight: 1.65,
        }}
      >
        A transient cache or network module loading issue occurred. You can reload this view or return safely to the home portal.
      </p>
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => {
            if (typeof reset === 'function') reset();
            else if (typeof window !== 'undefined') window.location.reload();
          }}
          className="btn-primary-hero"
        >
          Reload View &rarr;
        </button>
        <Link href="/" className="btn-secondary-hero">
          Return to Studio Home
        </Link>
      </div>
    </div>
  );
}
