'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function HeroCords() {
  const stageRef = useRef(null);
  const animFrameRef = useRef(null);
  const [turboMode, setTurboMode] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Squircle specifications
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
        anchorY: 0,
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
          // Mobile (< 768px): Neatly placed in outer gutters
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
        cord.anchorY = 0;

        if (cord.px === 0 && cord.py === 0) {
          cord.px = targetX;
          cord.py = targetY;
        }

        if (cord.mountEl) {
          cord.mountEl.style.left = `${cord.anchorX}px`;
        }
      });
    }

    // Attach drag & drop pointer listeners to each squircle badge
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
        cord.py = Math.max(70, e.clientY - stageRect.top - cord.grabOffsetY);
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
        const ay = cord.anchorY;
        const bx = cord.px;
        const by = cord.py - 26; // attach ring at top edge of squircle

        // Quadratic Bezier midpoint control curvature with inertia sag
        const ctrlX = (ax + bx) * 0.5 + (cord.px - cord.anchorX) * 0.08;
        const ctrlY = (ay + by) * 0.5 + 12;

        cord.pathEl.setAttribute('d', `M ${ax.toFixed(1)},${ay.toFixed(1)} Q ${ctrlX.toFixed(1)},${ctrlY.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)}`);
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
      {/* 1. Hanging cord stage required for verification and turbo switch */}
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
              <stop offset="0%" stopColor="rgba(148, 163, 184, 0.35)" />
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

        {/* 7 Ceiling Mount Fixtures */}
        <div className="tech-cord-mount" id="tech-cord-mount-0" aria-hidden="true"><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-1" aria-hidden="true"><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-2" aria-hidden="true"><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-3" aria-hidden="true"><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-4" aria-hidden="true"><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-5" aria-hidden="true"><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-6" aria-hidden="true"><span className="mount-dot"></span></div>

        {/* 7 Suspended 3D Glossy Squircles with Tech Icons */}
        
        {/* 0: Top-Center (Purple - ERP & Analytics) */}
        <div className="tech-cord-squircle squircle-purple" id="tech-badge-0" role="button" tabIndex={0} aria-label="ERP & Analytics Technology Discipline" data-index="0">
          <div className="squircle-connector-ring" aria-hidden="true"></div>
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              {/* Analytics Pie Chart Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10h-10V2z"/>
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
              {/* React Atom Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="1.8">
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
                <circle cx="12" cy="12" r="2" fill="#61dafb" />
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
              {/* AI Sparkle Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12 2L14.39 8.26L21 9.27L16.5 14.14L17.77 21L12 17.77L6.23 21L7.5 14.14L3 9.27L9.61 8.26L12 2Z" opacity="0.9" />
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

        {/* 3: Bottom-Left (Mint Emerald - Virtual Assistants Top 1%) */}
        <div className="tech-cord-squircle squircle-mint" id="tech-badge-3" role="button" tabIndex={0} aria-label="Virtual Assistance Technology Discipline" data-index="3">
          <div className="squircle-connector-ring" aria-hidden="true"></div>
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              {/* Executive / Smartphone Flutter Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
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

        {/* 4: Top-Right (Electric Green - Dedicated Dev Teams Code </>) */}
        <div className="tech-cord-squircle squircle-green" id="tech-badge-4" role="button" tabIndex={0} aria-label="Dedicated Remote Teams Discipline" data-index="4">
          <div className="squircle-connector-ring" aria-hidden="true"></div>
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              {/* Code </> Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
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

        {/* 5: Mid-Right (Cobalt Blue - DevOps & Cloud APIs) */}
        <div className="tech-cord-squircle squircle-blue" id="tech-badge-5" role="button" tabIndex={0} aria-label="DevOps and API Integration Discipline" data-index="5">
          <div className="squircle-connector-ring" aria-hidden="true"></div>
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              {/* AWS / Cloud Upload Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
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

        {/* 6: Bottom-Right (Lime Green - E-Commerce Management Shopify) */}
        <div className="tech-cord-squircle squircle-lime" id="tech-badge-6" role="button" tabIndex={0} aria-label="E-Commerce Support Discipline" data-index="6">
          <div className="squircle-connector-ring" aria-hidden="true"></div>
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              {/* Shopify / Shopping Bag Icon */}
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
