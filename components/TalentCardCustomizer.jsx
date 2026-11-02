'use client';

import React, { useState, useRef } from 'react';

export default function TalentCardCustomizer() {
  const [theme, setTheme] = useState('obsidian');
  const [activeRole, setActiveRole] = useState('fullstack');
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef(null);

  const roleProfiles = {
    fullstack: {
      title: 'Senior Full-Stack Engineer',
      skills: 'React • Node.js • TypeScript • PostgreSQL • AWS',
    },
    mobile: {
      title: 'Mobile App Engineer (React & Flutter)',
      skills: 'Flutter • React Native • Swift • Kotlin • Firebase',
    },
    va: {
      title: 'Executive Virtual Assistant',
      skills: 'Email/Calendar • CRM Hygiene • Customer Support • Research',
    },
    ai: {
      title: 'AI & Automations Architect',
      skills: 'n8n • Zapier • Make.com • LLMs • WhatsApp Business API',
    },
  };

  const currRole = roleProfiles[activeRole] || roleProfiles.fullstack;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotY = ((x - centerX) / centerX) * 14;
    const rotX = -((y - centerY) / centerY) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlareStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.32) 0%, transparent 65%)`,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlareStyle({ opacity: 0 });
  };

  return (
    <section className="customizer-section" id="talent-visualizer">
      <div className="container">
        <div className="customizer-grid">
          {/* 3D Card Display */}
          <div
            className="card-3d-stage reveal-scale"
            id="card-3d-stage"
            onMouseMove={(e) => {
              setIsHovered(true);
              handleMouseMove(e);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={cardRef}
              className={`virtual-badge-card card-theme-${theme}`}
              id="talent-card"
              style={{
                transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1})`,
                boxShadow: isHovered
                  ? `0 32px 64px rgba(0, 0, 0, 0.35), ${-rotateY * 2}px ${rotateX * 2}px 35px rgba(0, 102, 255, 0.22)`
                  : '0 24px 50px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div className="card-glare" style={glareStyle}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  NEXPROBYTE VERIFIED
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '4px' }}>Assigned Specialist</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700 }} id="card-role-title">
                  {currRole.title}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: '4px' }} id="card-skills">
                  {currRole.skills}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', opacity: 0.6, display: 'block' }}>DEPLOYMENT STATUS</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600 }}>READY IN 48 HOURS</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700 }}>TOP 1%</span>
              </div>
            </div>
          </div>

          {/* Customizer Controls */}
          <div className="reveal-up">
            <div className="badge-tag">Talent Customization</div>
            <h2 className="section-title">Engineered to Match Your Stack</h2>
            <p className="section-subtitle">
              Configure your dedicated specialist profile. Pick your required tech discipline, adjust seniority levels, and preview your deployment pass.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                  Card Color Theme
                </label>
                <div className="palette-picker">
                  <button
                    className={`palette-btn ${theme === 'obsidian' ? 'active' : ''}`}
                    style={{ background: '#141414' }}
                    onClick={() => setTheme('obsidian')}
                    data-theme="obsidian"
                    title="Obsidian"
                  ></button>
                  <button
                    className={`palette-btn ${theme === 'blue' ? 'active' : ''}`}
                    style={{ background: '#09408f' }}
                    onClick={() => setTheme('blue')}
                    data-theme="blue"
                    title="Cobalt"
                  ></button>
                  <button
                    className={`palette-btn ${theme === 'emerald' ? 'active' : ''}`}
                    style={{ background: '#0f4028' }}
                    onClick={() => setTheme('emerald')}
                    data-theme="emerald"
                    title="Emerald"
                  ></button>
                  <button
                    className={`palette-btn ${theme === 'purple' ? 'active' : ''}`}
                    style={{ background: '#442482' }}
                    onClick={() => setTheme('purple')}
                    data-theme="purple"
                    title="Nebula"
                  ></button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                  Specialist Discipline
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    className={`role-select-btn btn-secondary-sm ${activeRole === 'fullstack' ? 'active' : ''}`}
                    onClick={() => setActiveRole('fullstack')}
                    data-role="fullstack"
                  >
                    Full-Stack
                  </button>
                  <button
                    className={`role-select-btn btn-secondary-sm ${activeRole === 'mobile' ? 'active' : ''}`}
                    onClick={() => setActiveRole('mobile')}
                    data-role="mobile"
                  >
                    Mobile (Flutter)
                  </button>
                  <button
                    className={`role-select-btn btn-secondary-sm ${activeRole === 'va' ? 'active' : ''}`}
                    onClick={() => setActiveRole('va')}
                    data-role="va"
                  >
                    Executive VA
                  </button>
                  <button
                    className={`role-select-btn btn-secondary-sm ${activeRole === 'ai' ? 'active' : ''}`}
                    onClick={() => setActiveRole('ai')}
                    data-role="ai"
                  >
                    AI Automations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
