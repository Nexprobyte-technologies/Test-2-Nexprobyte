'use client';

import React, { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    if (typeof console !== 'undefined' && console.error) {
      console.error('Nexprobyte Root Application Boundary caught error:', error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#0a0a0a', color: '#ffffff' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '520px', padding: '40px 32px', background: '#141414', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0066ff', marginBottom: '12px' }}>
              Nexprobyte System Recovery
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 16px', color: '#ffffff' }}>
              Application Recovered
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '28px' }}>
              A transient browser state or cache synchronization issue was automatically isolated. Click below to refresh your view smoothly.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  if (typeof reset === 'function') reset();
                  else if (typeof window !== 'undefined') window.location.reload();
                }}
                style={{ padding: '12px 28px', borderRadius: '999px', background: '#0066ff', color: '#ffffff', fontWeight: 600, fontSize: '0.9rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,102,255,0.3)' }}
              >
                Restore Session
              </button>
              <a
                href="/"
                style={{ padding: '12px 28px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', color: '#ffffff', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
