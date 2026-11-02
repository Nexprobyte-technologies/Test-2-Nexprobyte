'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function RoiCalculator() {
  const [role, setRole] = useState('dev');
  const [count, setCount] = useState(2);
  const [displaySavings, setDisplaySavings] = useState(180000);
  const [displayInhouse, setDisplayInhouse] = useState(240000);
  const [displayNex, setDisplayNex] = useState(60000);

  const rates = {
    dev: { inhouse: 120000, nex: 30000 },
    mobile: { inhouse: 125000, nex: 32000 },
    va: { inhouse: 65000, nex: 18000 },
    ai: { inhouse: 135000, nex: 35000 },
    web: { inhouse: 80000, nex: 22000 },
    custom: { inhouse: 150000, nex: 40000 },
  };

  const animRef = useRef(null);

  useEffect(() => {
    const curRate = rates[role] || rates.dev;
    const targetInhouse = curRate.inhouse * count;
    const targetNex = curRate.nex * count;
    const targetSavings = targetInhouse - targetNex;

    const startSavings = displaySavings;
    const startInhouse = displayInhouse;
    const startNex = displayNex;
    const startTime = performance.now();
    const duration = 500;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setDisplaySavings(Math.round(startSavings + (targetSavings - startSavings) * ease));
      setDisplayInhouse(Math.round(startInhouse + (targetInhouse - startInhouse) * ease));
      setDisplayNex(Math.round(startNex + (targetNex - startNex) * ease));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    };

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(step);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [role, count]);

  return (
    <section style={{ padding: '100px 0', background: '#fff' }} id="roi-calculator">
      <div className="container">
        <div className="section-header reveal-up">
          <div className="badge-tag">ROI &amp; Savings Calculator</div>
          <h2 className="section-title">Calculate Your Annual Cost Savings</h2>
          <p className="section-subtitle">
            See the direct monetary difference between hiring local in-house talent vs deploying dedicated Nexprobyte remote pods.
          </p>
        </div>

        <div
          className="spotlight-card reveal-scale"
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-2xl)',
            padding: '48px',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
            {/* Left Controls */}
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.95rem', display: 'block', marginBottom: '8px' }}>
                Select Team Role:
              </label>
              <select
                id="calc-role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%', color: 'var(--text-primary)', background: '#fff', marginBottom: '24px' }}
              >
                <option value="dev">Senior Full-Stack Developer</option>
                <option value="mobile">React &amp; Flutter Mobile Developer</option>
                <option value="va">Executive Virtual Assistant</option>
                <option value="ai">AI &amp; Automation Specialist</option>
                <option value="web">Website &amp; E-Commerce Specialist</option>
                <option value="custom">CRM &amp; Custom Software Architect</option>
              </select>

              <label style={{ fontWeight: 600, fontSize: '0.95rem', display: 'block', marginBottom: '8px' }}>
                Number of Dedicated Specialists:{' '}
                <span id="calc-count-label" style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>
                  {count}
                </span>
              </label>
              <input
                type="range"
                id="calc-range"
                min="1"
                max="10"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value, 10))}
                style={{ width: '100%', marginBottom: '24px', accentColor: 'var(--accent-blue)' }}
              />

              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                &#10003; Full time-zone overlap included<br />
                &#10003; Zero payroll taxes, health insurance or recruiter fees<br />
                &#10003; 14-day risk-free satisfaction guarantee
              </div>
            </div>

            {/* Right Results Box */}
            <div
              style={{
                background: '#141414',
                color: '#fff',
                borderRadius: 'var(--radius-xl)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                  Estimated Annual Savings
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: 'var(--accent-cyan)',
                    margin: '8px 0',
                  }}
                  id="calc-savings"
                >
                  ${displaySavings.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
                  In-House Cost:{' '}
                  <span id="calc-inhouse" style={{ textDecoration: 'line-through', opacity: 0.6 }}>
                    ${displayInhouse.toLocaleString()}/yr
                  </span>
                  <br />
                  Nexprobyte Cost:{' '}
                  <strong style={{ color: '#fff' }} id="calc-nex">
                    ${displayNex.toLocaleString()}/yr
                  </strong>
                </div>
              </div>

              <a href="#contact" className="btn-submit" style={{ marginTop: 0, background: 'var(--accent-blue)', color: '#fff' }}>
                Claim This Team &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
