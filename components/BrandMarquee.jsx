import React from 'react';

export default function BrandMarquee() {
  const brands = [
    { symbol: '◆', name: 'VERTEX LABS' },
    { symbol: '■', name: 'NOVA SYSTEMS' },
    { symbol: '▲', name: 'HYPERION HEALTH' },
    { symbol: '★', name: 'CLOUDFORGE' },
    { symbol: '●', name: 'QUANTUM CAPITAL' },
    { symbol: '⬤', name: 'APEX COMMERCE' },
  ];

  return (
    <section className="marquee-section">
      <div className="marquee-label">Trusted by scaling startups, agencies &amp; enterprises</div>
      <div className="marquee-track">
        <div className="marquee-group">
          {brands.map((b, idx) => (
            <div key={idx} className="marquee-item">
              <span>{b.symbol}</span> {b.name}
            </div>
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {brands.map((b, idx) => (
            <div key={`dup-${idx}`} className="marquee-item">
              <span>{b.symbol}</span> {b.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
