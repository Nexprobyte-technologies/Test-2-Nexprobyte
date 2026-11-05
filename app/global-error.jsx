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
      <body style={{ margin: 0, padding: 0, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: '#ffffff', color: '#141414' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '520px', padding: '40px 32px', background: '#ffffff', borderRadius: '20px', border: '1px solid #ebebeb', boxShadow: '0 16px 40px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', background: '#ebf3ff', color: '#0066ff', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0066ff' }} />
              Nexprobyte System Recovery
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 14px', color: '#141414', letterSpacing: '-0.025em' }}>
              Application Recovered
            </h1>
            <p style={{ fontSize: '0.96rem', color: '#5a5d62', lineHeight: 1.65, marginBottom: '28px' }}>
              A transient browser cache or module synchronization issue occurred. You can restore your session or return to the main portal.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  if (typeof reset === 'function') reset();
                  else if (typeof window !== 'undefined') window.location.reload();
                }}
                style={{ padding: '12px 28px', borderRadius: '9999px', background: '#0066ff', color: '#ffffff', fontWeight: 600, fontSize: '0.92rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,102,255,0.25)' }}
              >
                Restore Session &rarr;
              </button>
              <a
                href="/"
                style={{ padding: '12px 28px', borderRadius: '9999px', background: '#f7f7f7', color: '#141414', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none', border: '1px solid #ebebeb' }}
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
