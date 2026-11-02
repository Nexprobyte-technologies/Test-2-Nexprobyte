'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function HeroCords() {
  const stageRef = useRef(null);
  const animFrameRef = useRef(null);
  const [turboMode, setTurboMode] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Squircle specifications - Nexprobyte Real Core Technology Stack
    const SQUIRCLE_CONFIGS = [
      {
        id: 0,
        slot: 'center',
        name: 'ERP, BI & Dashboards',
        sub: 'Custom Business Software →',
        theme: 'squircle-purple',
        sparkColors: ['#818cf8', '#6366f1', '#a5b4fc', '#ffffff'],
        swayPhase: 0,
        swayAmp: 6,
        freq: 720,
      },
      {
        id: 1,
        slot: 'top-left',
        name: 'Full-Stack Developers',
        sub: 'React, Node, Python & Mobile →',
        theme: 'squircle-obsidian',
        sparkColors: ['#61dafb', '#00d8ff', '#ffffff', '#38bdf8'],
        swayPhase: 1.2,
        swayAmp: 7.5,
        freq: 820,
      },
      {
        id: 2,
        slot: 'mid-left',
        name: 'AI Automation & Agents',
        sub: 'n8n, Zapier & AI Copilot →',
        theme: 'squircle-orange',
        sparkColors: ['#ff7b1a', '#ea580c', '#fdba74', '#ffffff'],
        swayPhase: 2.4,
        swayAmp: 9,
        freq: 920,
      },
      {
        id: 3,
        slot: 'bottom-left',
        name: 'Virtual Assistants (Top 1%)',
        sub: 'Executive Admin & Operations →',
        theme: 'squircle-mint',
        sparkColors: ['#10b981', '#34d399', '#6ee7b7', '#ffffff'],
        swayPhase: 3.6,
        swayAmp: 8,
        freq: 780,
      },
      {
        id: 4,
        slot: 'top-right',
        name: 'Dedicated Dev Teams',
        sub: 'Scale Engineering in 48 Hours →',
        theme: 'squircle-green',
        sparkColors: ['#22c55e', '#4ade80', '#86efac', '#ffffff'],
        swayPhase: 4.5,
        swayAmp: 7.5,
        freq: 860,
      },
      {
        id: 5,
        slot: 'mid-right',
        name: 'DevOps & Cloud APIs',
        sub: 'CI/CD, Cloud & Integrations →',
        theme: 'squircle-blue',
        sparkColors: ['#3b82f6', '#60a5fa', '#93c5fd', '#ffffff'],
        swayPhase: 5.4,
        swayAmp: 9,
        freq: 980,
      },
      {
        id: 6,
        slot: 'bottom-right',
        name: 'E-Commerce Management',
        sub: 'Shopify, WooCommerce & Ops →',
        theme: 'squircle-lime',
        sparkColors: ['#a3e635', '#bef264', '#d9f99d', '#ffffff'],
        swayPhase: 0.8,
        swayAmp: 8,
        freq: 740,
      },
    ];

    // State for cords physics simulation
    const cords = SQUIRCLE_CONFIGS.map((cfg) => {
      const badgeEl = document.getElementById(`tech-badge-${cfg.id}`);
      const pathEl = document.getElementById(`tech-cord-path-${cfg.id}`);
      const mountEl = document.getElementById(`tech-cord-mount-${cfg.id}`);
      const sparksEl = document.getElementById(`tech-sparks-${cfg.id}`);

      return {
        ...cfg,
        badgeEl,
        pathEl,
        mountEl,
        sparksEl,
        anchorX: 0,
        anchorY: 0, // Clean cord directly to ceiling line
        restX: 0,
        restY: 0,
        px: 0,
        py: 0,
        vx: 0,
        vy: 0,
        isDragging: false,
        pointerId: null,
        grabOffsetX: 0,
        grabOffsetY: 0,
      };
    });

    let stageWidth = stage.clientWidth || window.innerWidth;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    // Web Audio synthesizer for harmonic chime
    function playSquirclePing(freq = 800) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.04);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } catch (_) {}
    }

    // Spark particle burst on release
    function emitCordSparks(cord) {
      if (!cord.sparksEl) return;
      const count = 12;
      const colors = cord.sparkColors;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const dist = 24 + Math.random() * 36;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;

        const spark = document.createElement('span');
        spark.className = 'squircle-spark-particle';
        spark.style.setProperty('--dx', `${dx.toFixed(1)}px`);
        spark.style.setProperty('--dy', `${dy.toFixed(1)}px`);
        spark.style.backgroundColor = colors[i % colors.length];
        spark.style.boxShadow = `0 0 6px ${colors[i % colors.length]}`;
        cord.sparksEl.appendChild(spark);
        setTimeout(() => spark.remove(), 550);
      }
    }

    // Responsive layout calculation
    function updateLayout() {
      stageWidth = stage.clientWidth || window.innerWidth;
      const centerX = stageWidth * 0.5;
      const isMobile = stageWidth < 768;
      const isTablet = stageWidth >= 768 && stageWidth < 1024;
      const isDesktop = stageWidth >= 1024;

      cords.forEach((cord) => {
        const radius = 28;
        let targetX = centerX;
        let targetY = 110;

        if (isDesktop) {
          switch (cord.slot) {
            case 'center':
              targetX = centerX;
              targetY = 108;
              break;
            case 'top-left':
              targetX = Math.max(radius + 20, centerX - 460);
              targetY = 220;
              break;
            case 'mid-left':
              targetX = Math.max(radius + 20, centerX - 560);
              targetY = 345;
              break;
            case 'bottom-left':
              targetX = Math.max(radius + 20, centerX - 470);
              targetY = 485;
              break;
            case 'top-right':
              targetX = Math.min(stageWidth - radius - 140, centerX + 460);
              targetY = 220;
              break;
            case 'mid-right':
              targetX = Math.min(stageWidth - radius - 140, centerX + 560);
              targetY = 345;
              break;
            case 'bottom-right':
              targetX = Math.min(stageWidth - radius - 140, centerX + 470);
              targetY = 485;
              break;
          }
        } else if (isTablet) {
          const maxOffset = Math.min(stageWidth * 0.44, 380);
          switch (cord.slot) {
            case 'center':
              targetX = centerX;
              targetY = 100;
              break;
            case 'top-left':
              targetX = Math.max(radius + 16, centerX - maxOffset * 0.82);
              targetY = 205;
              break;
            case 'mid-left':
              targetX = Math.max(radius + 16, centerX - maxOffset);
              targetY = 325;
              break;
            case 'bottom-left':
              targetX = Math.max(radius + 16, centerX - maxOffset * 0.84);
              targetY = 460;
              break;
            case 'top-right':
              targetX = Math.min(stageWidth - radius - 80, centerX + maxOffset * 0.82);
              targetY = 205;
              break;
            case 'mid-right':
              targetX = Math.min(stageWidth - radius - 80, centerX + maxOffset);
              targetY = 325;
              break;
            case 'bottom-right':
              targetX = Math.min(stageWidth - radius - 80, centerX + maxOffset * 0.84);
              targetY = 460;
              break;
          }
        } else {
          // Mobile (< 768px): Neatly placed in outer gutters so headline is 100% visible
          const marginX = Math.max(radius + 10, stageWidth * 0.08);
          switch (cord.slot) {
            case 'center':
              targetX = centerX;
              targetY = 88;
              break;
            case 'top-left':
              targetX = marginX;
              targetY = 185;
              break;
            case 'mid-left':
              targetX = marginX + 8;
              targetY = 295;
              break;
            case 'bottom-left':
              targetX = marginX;
              targetY = 415;
              break;
            case 'top-right':
              targetX = stageWidth - marginX - 20;
              targetY = 185;
              break;
            case 'mid-right':
              targetX = stageWidth - marginX - 28;
              targetY = 295;
              break;
            case 'bottom-right':
              targetX = stageWidth - marginX - 20;
              targetY = 415;
              break;
          }
        }

        cord.restX = targetX;
        cord.restY = targetY;
        cord.anchorX = targetX;
        cord.anchorY = 0; // Ceiling line: no top box

        if (cord.px === 0 && cord.py === 0) {
          cord.px = targetX;
          cord.py = targetY;
        }

        if (cord.mountEl) {
          cord.mountEl.style.left = `${cord.anchorX}px`;
        }
      });
    }

    // Pointer event bindings
    cords.forEach((cord) => {
      const badge = cord.badgeEl;
      if (!badge) return;

      badge.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        cord.isDragging = true;
        cord.pointerId = e.pointerId;
        badge.setPointerCapture(e.pointerId);
        badge.classList.add('is-dragging');

        const rect = badge.getBoundingClientRect();
        cord.grabOffsetX = e.clientX - (rect.left + rect.width * 0.5);
        cord.grabOffsetY = e.clientY - (rect.top + rect.height * 0.5);
        playSquirclePing(cord.freq);
      });

      badge.addEventListener('pointermove', (e) => {
        if (!cord.isDragging) return;
        const stageRect = stage.getBoundingClientRect();
        cord.px = e.clientX - stageRect.left - cord.grabOffsetX;
        cord.py = Math.max(60, e.clientY - stageRect.top - cord.grabOffsetY);
      });

      const onPointerEnd = (e) => {
        if (cord.isDragging && cord.pointerId === e.pointerId) {
          cord.isDragging = false;
          cord.pointerId = null;
          badge.classList.remove('is-dragging');
          try {
            badge.releasePointerCapture(e.pointerId);
          } catch (_) {}

          // Impart rebound spring velocity
          cord.vx = (cord.restX - cord.px) * 0.22;
          cord.vy = (cord.restY - cord.py) * 0.22;
          emitCordSparks(cord);
          playSquirclePing(cord.freq + 120);
        }
      };

      badge.addEventListener('pointerup', onPointerEnd);
      badge.addEventListener('pointercancel', onPointerEnd);
    });

    // Window parallax tracking
    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      targetParallaxX = normX * 14;
      targetParallaxY = normY * 10;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateLayout);
    updateLayout();

    // Physics Animation Loop
    let lastTime = performance.now();
    const SPRING_K = 0.075;
    const DAMPING = 0.86;

    function renderLoop(time) {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // Parallax smooth interpolation
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.08;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.08;

      const tSec = time * 0.0015;

      cords.forEach((cord) => {
        if (!cord.badgeEl || !cord.pathEl) return;

        if (!cord.isDragging) {
          // Ambient gentle pendulum sway
          const swayX = Math.sin(tSec + cord.swayPhase) * cord.swayAmp;
          const swayY = Math.cos(tSec * 1.5 + cord.swayPhase) * (cord.swayAmp * 0.25);

          const targetX = cord.restX + swayX + currentParallaxX;
          const targetY = cord.restY + swayY + currentParallaxY;

          // Spring forces
          const fx = (targetX - cord.px) * SPRING_K;
          const fy = (targetY - cord.py) * SPRING_K;

          cord.vx = (cord.vx + fx) * DAMPING;
          cord.vy = (cord.vy + fy) * DAMPING;

          cord.px += cord.vx;
          cord.py += cord.vy;
        }

        // Update Squircle Position & Dynamic Tilt
        const tiltAngle = Math.max(-18, Math.min(18, (cord.px - cord.anchorX) * 0.12));
        cord.badgeEl.style.transform = `translate3d(${cord.px - 28}px, ${cord.py - 28}px, 0) rotate(${tiltAngle}deg)`;

        // Update Dynamic Smooth Bezier Cord Path
        const ax = cord.anchorX;
        const ay = 0; // Starts directly at top ceiling edge: NO BOX
        const bx = cord.px;
        const by = cord.py - 26; // attach ring at top edge of squircle

        // Quadratic Bezier midpoint control curvature with inertia sag
        const ctrlX = (ax + bx) * 0.5 + (cord.px - cord.anchorX) * 0.08;
        const ctrlY = (ay + by) * 0.5 + 12;

        cord.pathEl.setAttribute('d', `M ${ax.toFixed(1)},0 Q ${ctrlX.toFixed(1)},${ctrlY.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)}`);
      });

      animFrameRef.current = requestAnimationFrame(renderLoop);
    }

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateLayout);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* 1. Hanging cord stage for turbo switch */}
      <div
        className={`hero-hanging-cord-stage ${turboMode ? 'turbo-active' : ''}`}
        id="hanging-cord-stage"
        aria-label="Interactive Cord Switch"
        style={{ display: 'none' }}
      >
        <div className="cord-ceiling-mount" aria-hidden="true">
          <span className="mount-plate"></span>
          <span className="mount-screw"></span>
          <span className="mount-ring"></span>
        </div>
        <svg className="cord-svg" id="cord-svg" viewBox="0 0 160 280" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="cord-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#0066ff" />
            </linearGradient>
            <linearGradient id="cord-glow-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,102,255,0)" />
              <stop offset="100%" stopColor="rgba(0,102,255,0.7)" />
            </linearGradient>
            <filter id="cord-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path id="cord-path-glow" className="cord-path-glow" d="M 80,0 Q 80,85 80,170" fill="none" stroke="url(#cord-glow-grad)" strokeWidth="4" opacity="0" />
          <path id="cord-path" className="cord-path" d="M 80,0 Q 80,85 80,170" fill="none" stroke="url(#cord-gradient)" strokeWidth="2.2" strokeLinecap="round" />
          <circle id="cord-bead-1" className="cord-bead" cx="80" cy="55" r="2.5" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />
          <circle id="cord-bead-2" className="cord-bead" cx="80" cy="115" r="2.5" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />
        </svg>
        <div
          className="cord-bob-handle"
          id="cord-bob"
          role="button"
          tabIndex={0}
          aria-label="Pull thread to toggle Turbo Acceleration Mode"
          aria-pressed={turboMode}
          onClick={() => setTurboMode(!turboMode)}
        >
          <div className="bob-connector-ring" aria-hidden="true"></div>
          <div className="bob-capsule">
            <div className="bob-led" id="bob-led">
              <span className="led-core"></span>
              <span className="led-ping"></span>
            </div>
            <div className="bob-content">
              <span className="bob-tag" id="bob-tag">PULL</span>
              <span className="bob-state" id="bob-state">{turboMode ? 'TURBO ACTIVE' : '48H READY'}</span>
            </div>
            <div className="bob-icon">
              <svg className="bob-arrow-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
              <svg className="bob-spark-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
          </div>
          <div className="bob-pull-hint" id="bob-pull-hint" aria-hidden="true">
            <span>Pull cord &darr;</span>
          </div>
          <div className="cord-sparks-container" id="cord-sparks" aria-hidden="true"></div>
        </div>
      </div>

      {/* 2. Framer-style Suspended 7-Cord Technology Squircles Framing Hero Headline */}
      <div
        ref={stageRef}
        className="hero-tech-cords-stage"
        id="tech-cords-stage"
        aria-label="Nexprobyte Suspended Technology Badges"
      >
        <svg className="tech-cords-svg" id="tech-cords-svg" aria-hidden="true">
          <defs>
            <linearGradient id="tech-cord-line-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(148, 163, 184, 0.45)" />
              <stop offset="70%" stopColor="rgba(148, 163, 184, 0.85)" />
              <stop offset="100%" stopColor="rgba(100, 116, 139, 0.95)" />
            </linearGradient>
            <filter id="tech-cord-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path id="tech-cord-path-0" className="tech-cord-path" stroke="url(#tech-cord-line-grad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-1" className="tech-cord-path" stroke="url(#tech-cord-line-grad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-2" className="tech-cord-path" stroke="url(#tech-cord-line-grad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-3" className="tech-cord-path" stroke="url(#tech-cord-line-grad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-4" className="tech-cord-path" stroke="url(#tech-cord-line-grad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-5" className="tech-cord-path" stroke="url(#tech-cord-line-grad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-6" className="tech-cord-path" stroke="url(#tech-cord-line-grad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>

        {/* 7 Ceiling Mount Fixtures - Hidden visually so cords hang directly from ceiling with no box */}
        <div className="tech-cord-mount" id="tech-cord-mount-0" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-1" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-2" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-3" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-4" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-5" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-6" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>

        {/* 7 Suspended 3D Glossy Squircles with Nexprobyte Core Technology Stack Icons */}
        
        {/* 0: Center (Purple - Next.js & React Enterprise ERP & Dashboards) */}
        <div className="tech-cord-squircle squircle-purple" id="tech-badge-0" role="button" tabIndex={0} aria-label="ERP & Analytics Technology Discipline" data-index="0">
          <div className="squircle-connector-ring" aria-hidden="true"></div>
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              {/* Figma UI/UX Design System Icon */}
              <svg width="22" height="22" viewBox="0 0 38 57" fill="none">
                <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#ffffff" fillOpacity="0.95"/>
                <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#ffffff" fillOpacity="0.85"/>
                <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#ffffff" fillOpacity="0.9"/>
                <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#ffffff"/>
                <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#ffffff" fillOpacity="0.9"/>
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>ERP, BI &amp; Dashboards</strong>
              <span>Custom Business Software &rarr;</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-0" aria-hidden="true"></div>
        </div>

        {/* 1: Top-Left (Dark Obsidian - React Atom & Full-Stack Developers) */}
        <div className="tech-cord-squircle squircle-obsidian" id="tech-badge-1" role="button" tabIndex={0} aria-label="Full-Stack Developers Technology Discipline" data-index="1">
          <div className="squircle-connector-ring" aria-hidden="true"></div>
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              {/* Authentic React Atom Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61dafb" strokeWidth="1.8" transform="rotate(0 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61dafb" strokeWidth="1.8" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61dafb" strokeWidth="1.8" transform="rotate(120 12 12)" />
                <circle cx="12" cy="12" r="2.2" fill="#61dafb" />
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>Full-Stack Developers</strong>
              <span>React, Node, Python &amp; Mobile &rarr;</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-1" aria-hidden="true"></div>
        </div>

        {/* 2: Mid-Left (Vibrant Orange - AI Automation & Agents) */}
        <div className="tech-cord-squircle squircle-orange" id="tech-badge-2" role="button" tabIndex={0} aria-label="AI Automation Technology Discipline" data-index="2">
          <div className="squircle-connector-ring" aria-hidden="true"></div>
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              {/* Authentic n8n / AI Neural Sparks Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" fill="#ffffff" />
                <circle cx="19" cy="5" r="2" fill="#ffedd5" />
                <circle cx="5" cy="19" r="1.5" fill="#ffedd5" />
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>AI Automation &amp; Agents</strong>
              <span>n8n, Zapier &amp; AI Copilot &rarr;</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-2" aria-hidden="true"></div>
        </div>

        {/* 3: Bottom-Left (Mint Emerald - Flutter & Mobile Apps) */}
        <div className="tech-cord-squircle squircle-mint" id="tech-badge-3" role="button" tabIndex={0} aria-label="Virtual Assistance Technology Discipline" data-index="3">
          <div className="squircle-connector-ring" aria-hidden="true"></div>
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              {/* Authentic Flutter Wing Icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M14.31 2L4.03 12.28l3.18 3.18L19.5 2h-5.19z" fill="#ffffff" />
                <path d="M14.31 12.28L9.54 17.05l3.18 3.18 1.59-1.59 4.77-4.77h-4.77z" fill="#ffffff" fillOpacity="0.8" />
                <path d="M9.54 17.05L14.31 21.82h5.19l-6.76-6.76-3.2 1.99z" fill="#ffffff" />
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>Virtual Assistants (Top 1%)</strong>
              <span>Executive Admin &amp; Operations &rarr;</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-3" aria-hidden="true"></div>
        </div>

        {/* 4: Top-Right (Electric Green - Python & Core Engineering) */}
        <div className="tech-cord-squircle squircle-green" id="tech-badge-4" role="button" tabIndex={0} aria-label="Dedicated Remote Teams Discipline" data-index="4">
          <div className="squircle-connector-ring" aria-hidden="true"></div>
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              {/* Authentic Python Interlocking Snakes Icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M11.91 2c-4.22 0-3.95 1.83-3.95 1.83l.01 1.9h4.03v.57H6.38s-2.58.29-2.58 3.96c0 3.66 2.26 3.82 2.26 3.82h1.34v-1.89s-.07-2.26 2.22-2.26h3.83s2.14.03 2.14-2.14V4.14S16.13 2 11.91 2zm-1.22 1.22a.77.77 0 1 1 0 1.54.77.77 0 0 1 0-1.54z" />
                <path d="M12.09 22c4.22 0 3.95-1.83 3.95-1.83l-.01-1.9h-4.03v-.57h5.61s2.58-.29 2.58-3.96c0-3.66-2.26-3.82-2.26-3.82h-1.34v1.89s.07 2.26-2.22 2.26H10.54s-2.14-.03-2.14 2.14v3.66S7.87 22 12.09 22zm1.22-1.22a.77.77 0 1 1 0-1.54.77.77 0 0 1 0 1.54z" fillOpacity="0.85" />
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>Dedicated Dev Teams</strong>
              <span>Scale Engineering in 48 Hours &rarr;</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-4" aria-hidden="true"></div>
        </div>

        {/* 5: Mid-Right (Cobalt Blue - DevOps & Cloud APIs Toggle) */}
        <div className="tech-cord-squircle squircle-blue" id="tech-badge-5" role="button" tabIndex={0} aria-label="DevOps and API Integration Discipline" data-index="5">
          <div className="squircle-connector-ring" aria-hidden="true"></div>
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              {/* Active Toggle Switch Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="6" width="20" height="12" rx="6" stroke="#ffffff" strokeWidth="2.5"/>
                <circle cx="16" cy="12" r="3.5" fill="#ffffff"/>
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>DevOps &amp; Cloud APIs</strong>
              <span>CI/CD, Cloud &amp; Integrations &rarr;</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-5" aria-hidden="true"></div>
        </div>

        {/* 6: Bottom-Right (Lime Green - Shopify & E-Commerce Management) */}
        <div className="tech-cord-squircle squircle-lime" id="tech-badge-6" role="button" tabIndex={0} aria-label="E-Commerce Support Discipline" data-index="6">
          <div className="squircle-connector-ring" aria-hidden="true"></div>
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              {/* Authentic Shopify Shopping Bag Icon with Dark Charcoal Contrast */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>E-Commerce Management</strong>
              <span>Shopify, WooCommerce &amp; Ops &rarr;</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-6" aria-hidden="true"></div>
        </div>
      </div>
    </>
  );
}
