import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px 20px',
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
            background: 'var(--accent-blue)',
            display: 'inline-block',
            marginRight: '8px',
          }}
        />
        Error 404 • Resource Not Located
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          marginBottom: '16px',
          lineHeight: 1.15,
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          maxWidth: '520px',
          marginBottom: '32px',
          lineHeight: 1.65,
        }}
      >
        The page you are looking for does not exist or has been relocated within our architecture.
      </p>
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn-primary-hero">
          Return to Studio Home &rarr;
        </Link>
        <Link href="/services" className="btn-secondary-hero">
          Explore All Services
        </Link>
      </div>
    </div>
  );
}
