'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function HeroCords() {
  const stageRef = useRef(null);
  const animFrameRef = useRef(null);
  const [turboMode, setTurboMode] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // -------------------------------------------------------------
    // EXACT SARO FINANCE 16-SEGMENT VERLET ROPE PHYSICS ENGINE
    // -------------------------------------------------------------
    const U = 16;         // 16 Verlet segments (17 vertices)
    const GRAVITY = 2600; // Saro gravity acceleration
    const STIFFNESS = 360;// Spring stiffness (kc)
    const DAMPING = 9;    // Spring damping (Ac)
    const DRAG = 0.7;     // Air drag / velocity decay (jc)
    const OFFSET_L = 36;  // Saro length offset (Mc)
    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

    const SQUIRCLE_CONFIGS = [
      {
        id: 0,
        slot: 'center',
        name: 'ERP, BI & Dashboards',
        sub: 'Custom Business Software →',
        theme: 'squircle-purple',
        sparkColors: ['#a855f7', '#8b5cf6', '#c084fc', '#ffffff'],
        freq: 720,
        phase: 0.0,
      },
      {
        id: 1,
        slot: 'top-left',
        name: 'Full-Stack Developers',
        sub: 'React, Node, Python & Mobile →',
        theme: 'squircle-cyan squircle-obsidian',
        sparkColors: ['#38bdf8', '#0ea5e9', '#7dd3fc', '#ffffff'],
        freq: 820,
        phase: 1.25,
      },
      {
        id: 2,
        slot: 'mid-left',
        name: 'AI Automation & Agents',
        sub: 'n8n, Zapier & AI Copilot →',
        theme: 'squircle-orange',
        sparkColors: ['#ff7849', '#ff5722', '#fdba74', '#ffffff'],
        freq: 920,
        phase: 2.5,
      },
      {
        id: 3,
        slot: 'bottom-left',
        name: 'Virtual Assistants (Top 1%)',
        sub: 'Executive Admin & Operations →',
        theme: 'squircle-mint',
        sparkColors: ['#34d399', '#10b981', '#6ee7b7', '#ffffff'],
        freq: 780,
        phase: 3.75,
      },
      {
        id: 4,
        slot: 'top-right',
        name: 'Dedicated Dev Teams',
        sub: 'Scale Engineering On-Demand →',
        theme: 'squircle-rose squircle-green',
        sparkColors: ['#22c55e', '#4ade80', '#bbf7d0', '#ffffff'],
        freq: 860,
        phase: 4.8,
      },
      {
        id: 5,
        slot: 'mid-right',
        name: 'DevOps & Cloud APIs',
        sub: 'CI/CD, Cloud & Integrations →',
        theme: 'squircle-blue',
        sparkColors: ['#60a5fa', '#3b82f6', '#93c5fd', '#ffffff'],
        freq: 980,
        phase: 5.65,
      },
      {
        id: 6,
        slot: 'bottom-right',
        name: 'E-Commerce Management',
        sub: 'Shopify, WooCommerce & Ops →',
        theme: 'squircle-amber squircle-lime',
        sparkColors: ['#a3e635', '#84cc16', '#d9f99d', '#ffffff'],
        freq: 740,
        phase: 0.65,
      },
    ];

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cords = SQUIRCLE_CONFIGS.map((cfg) => {
      const badgeEl = document.getElementById(`tech-badge-${cfg.id}`);
      const pathEl = document.getElementById(`tech-cord-path-${cfg.id}`);
      const mountEl = document.getElementById(`tech-cord-mount-${cfg.id}`);
      const beadEl = document.getElementById(`tech-cord-bead-${cfg.id}`);
      const sparksEl = document.getElementById(`tech-sparks-${cfg.id}`);

      const pts = new Float32Array(34);
      const prev = new Float32Array(34);

      return {
        ...cfg,
        badgeEl,
        pathEl,
        mountEl,
        beadEl,
        sparksEl,
        ax: 0,
        ay: 0,
        bx: 0,
        by: 0,
        restX: 0,
        restY: 0,
        vx: 0,
        vy: 0,
        rot: 0,
        av: 0,
        L: 100,
        L0: 100,
        w: 56,
        pts,
        prev,
        started: prefersReducedMotion,
        startAt: 0,
        isDragging: false,
        pointerId: null,
        drag: {
          on: false,
          tx: 0,
          ty: 0,
          gx: 0,
          gy: 0,
          pvx: 0,
          pvy: 0,
          lx: 0,
          ly: 0,
          lt: 0,
        },
      };
    });

    let sharedAudioCtx = null;
    function getAudioContext() {
      try {
        if (!sharedAudioCtx) {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) sharedAudioCtx = new AudioCtx();
        }
        if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
          sharedAudioCtx.resume().catch(() => {});
        }
        return sharedAudioCtx;
      } catch (_) {
        return null;
      }
    }

    function playSquirclePing(freq = 800) {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.04);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } catch (_) {}
    }

    function emitCordSparks(cord) {
      if (!cord.sparksEl) return;
      const count = 10;
      const colors = cord.sparkColors;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const dist = 20 + Math.random() * 30;
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

    function updateLayout() {
      const stageWidth = stage.clientWidth || window.innerWidth;
      const centerX = stageWidth * 0.5;
      const isMobile = stageWidth < 768;
      const isTablet = stageWidth >= 768 && stageWidth < 1024;
      const now = performance.now();

      cords.forEach((cord) => {
        let targetX = centerX;
        let targetY = 110;
        const radius = cord.badgeEl ? (cord.badgeEl.offsetWidth ? cord.badgeEl.offsetWidth * 0.5 : 28) : 28;
        cord.w = radius * 2;

        if (isMobile) {
          const isSmall = stageWidth < 375;
          const outerMargin = isSmall ? 22 : 28;
          const totalSpan = stageWidth - outerMargin * 2;
          const pitch = totalSpan / 6;

          const yHigh = isSmall ? 82 : 92;
          const yMid = isSmall ? 104 : 116;
          const yLow = isSmall ? 134 : 150;

          const mobilePositions = {
            2: { x: centerX - 3 * pitch, y: yMid },
            3: { x: centerX - 2 * pitch, y: yLow },
            1: { x: centerX - 1 * pitch, y: yHigh },
            0: { x: centerX,             y: yMid },
            4: { x: centerX + 1 * pitch, y: yHigh },
            6: { x: centerX + 2 * pitch, y: yLow },
            5: { x: centerX + 3 * pitch, y: yMid },
          };

          const pos = mobilePositions[cord.id] || { x: centerX, y: yMid };
          targetX = pos.x;
          targetY = pos.y;
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
              targetX = Math.min(stageWidth - radius - 16, centerX + maxOffset * 0.82);
              targetY = 205;
              break;
            case 'mid-right':
              targetX = Math.min(stageWidth - radius - 16, centerX + maxOffset);
              targetY = 325;
              break;
            case 'bottom-right':
              targetX = Math.min(stageWidth - radius - 16, centerX + maxOffset * 0.84);
              targetY = 460;
              break;
          }
        } else {
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
              targetX = Math.min(stageWidth - radius - 20, centerX + 460);
              targetY = 220;
              break;
            case 'mid-right':
              targetX = Math.min(stageWidth - radius - 20, centerX + 560);
              targetY = 345;
              break;
            case 'bottom-right':
              targetX = Math.min(stageWidth - radius - 20, centerX + 470);
              targetY = 485;
              break;
          }
        }

        cord.restX = targetX;
        cord.restY = targetY;
        cord.ax = targetX;
        cord.ay = 0;

        const len = targetY + OFFSET_L;
        cord.L = len;
        cord.L0 = Math.max(20, len - GRAVITY / STIFFNESS);

        if (cord.bx === 0 && cord.by === 0) {
          const normDist = Math.abs(targetX - centerX) / Math.max(1, stageWidth * 0.5);
          cord.startAt = prefersReducedMotion ? now : now + (0.2 + normDist * 0.9) * 1000;

          if (prefersReducedMotion) {
            cord.bx = targetX;
            cord.by = targetY;
            cord.started = true;
            for (let i = 0; i <= U; i++) {
              cord.pts[i * 2] = cord.ax;
              cord.pts[i * 2 + 1] = cord.ay + (cord.by - cord.ay) * (i / U);
              cord.prev[i * 2] = cord.pts[i * 2];
              cord.prev[i * 2 + 1] = cord.pts[i * 2 + 1];
            }
          } else {
            cord.bx = cord.ax + (Math.random() - 0.5) * 30;
            cord.by = cord.ay - 20;
            cord.started = false;
            for (let i = 0; i <= U; i++) {
              cord.pts[i * 2] = cord.ax + (cord.bx - cord.ax) * (i / U);
              cord.pts[i * 2 + 1] = cord.ay + (cord.by - cord.ay) * (i / U);
              cord.prev[i * 2] = cord.pts[i * 2];
              cord.prev[i * 2 + 1] = cord.pts[i * 2 + 1];
            }
          }
        }
      });
    }

    updateLayout();
    window.addEventListener('resize', updateLayout, { passive: true });

    let lastTime = performance.now();
    let isVisible = true;

    function wakeAnimation() {
      if (isVisible && !animFrameRef.current) {
        lastTime = performance.now();
        animFrameRef.current = requestAnimationFrame(renderVerletFrame);
      }
    }

    const cleanups = [];
    cords.forEach((cord) => {
      const badge = cord.badgeEl;
      if (!badge) return;

      const onPointerDown = (e) => {
        if (e.button && e.button !== 0) return;
        e.preventDefault();
        wakeAnimation();
        const stageRect = stage.getBoundingClientRect();
        const pointerX = e.clientX - stageRect.left;
        const pointerY = e.clientY - stageRect.top;

        cord.isDragging = true;
        cord.pointerId = e.pointerId;
        try {
          badge.setPointerCapture(e.pointerId);
        } catch (_) {}
        badge.classList.add('is-dragging');

        cord.drag.on = true;
        cord.drag.gx = pointerX - cord.bx;
        cord.drag.gy = pointerY - cord.by;
        cord.drag.tx = cord.bx;
        cord.drag.ty = cord.by;
        cord.drag.pvx = 0;
        cord.drag.pvy = 0;
        cord.drag.lx = pointerX;
        cord.drag.ly = pointerY;
        cord.drag.lt = performance.now();

        playSquirclePing(cord.freq);
      };

      const onPointerMove = (e) => {
        if (!cord.drag.on) return;
        const stageRect = stage.getBoundingClientRect();
        const pointerX = e.clientX - stageRect.left;
        const pointerY = e.clientY - stageRect.top;
        const now = performance.now();
        const dt = Math.max(8, now - cord.drag.lt) / 1000;

        cord.drag.pvx = cord.drag.pvx * 0.4 + ((pointerX - cord.drag.lx) / dt) * 0.6;
        cord.drag.pvy = cord.drag.pvy * 0.4 + ((pointerY - cord.drag.ly) / dt) * 0.6;
        cord.drag.lx = pointerX;
        cord.drag.ly = pointerY;
        cord.drag.lt = now;
        cord.drag.tx = pointerX - cord.drag.gx;
        cord.drag.ty = pointerY - cord.drag.gy;
      };

      const onPointerEnd = (e) => {
        if (cord.drag.on && (cord.pointerId === null || cord.pointerId === e.pointerId)) {
          cord.drag.on = false;
          cord.isDragging = false;
          cord.pointerId = null;
          badge.classList.remove('is-dragging');
          try {
            badge.releasePointerCapture(e.pointerId);
          } catch (_) {}

          cord.vx = clamp(cord.drag.pvx * 0.6, -1500, 1500);
          cord.vy = clamp(cord.drag.pvy * 0.6, -900, 1500);

          emitCordSparks(cord);
          playSquirclePing(cord.freq + 140);
        }
      };

      // Gentle tug on keyboard Enter / Space without navigating away
      const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          cord.vy = 26;
          playSquirclePing(cord.freq + 100);
          emitCordSparks(cord);
        }
      };

      badge.addEventListener('pointerdown', onPointerDown);
      badge.addEventListener('keydown', onKeyDown);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerup', onPointerEnd, { passive: true });
      window.addEventListener('pointercancel', onPointerEnd, { passive: true });

      cleanups.push(() => {
        badge.removeEventListener('pointerdown', onPointerDown);
        badge.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerEnd);
        window.removeEventListener('pointercancel', onPointerEnd);
      });
    });

    function renderVerletFrame(time) {
      if (!isVisible) {
        animFrameRef.current = null;
        return;
      }

      const dt = Math.min(0.033, Math.max(0.001, (time - lastTime) / 1000));
      lastTime = time;
      const timeSec = time / 1000;

      cords.forEach((cord) => {
        if (!cord.started) {
          if (time < cord.startAt) {
            updateCordVisuals(cord);
            return;
          }
          cord.started = true;
        }

        if (cord.drag.on) {
          let tx = cord.drag.tx;
          let ty = cord.drag.ty;
          const dx = tx - cord.ax;
          const dy = ty - cord.ay;
          const dist = Math.hypot(dx, dy) || 1;
          const maxDist = cord.L0 * 1.06 + 28;

          if (dist > maxDist) {
            const elast = maxDist + (dist - maxDist) * 0.12;
            tx = cord.ax + (dx / dist) * elast;
            ty = cord.ay + (dy / dist) * elast;
          }

          const cx = cord.bx + (tx - cord.bx) * 0.45;
          const cy = cord.by + (ty - cord.by) * 0.45;
          cord.vx = (cx - cord.bx) / dt;
          cord.vy = (cy - cord.by) / dt;
          cord.bx = cx;
          cord.by = cy;
        } else {
          const subDt = dt / 2;
          for (let s = 0; s < 2; s++) {
            let wind = prefersReducedMotion ? 0 : Math.sin(timeSec * 0.8 + cord.phase) * 26;
            let grav = GRAVITY;
            const dx = cord.bx - cord.ax;
            const dy = cord.by - cord.ay;
            const dist = Math.hypot(dx, dy) || 1;
            const nx = dx / dist;
            const ny = dy / dist;

            if (dist > cord.L0) {
              const extension = dist - cord.L0;
              const radVelocity = cord.vx * nx + cord.vy * ny;
              wind -= STIFFNESS * extension * nx + DAMPING * radVelocity * nx;
              grav -= STIFFNESS * extension * ny + DAMPING * radVelocity * ny;
            }

            cord.vx = (cord.vx + wind * subDt) * (1 - DRAG * subDt);
            cord.vy = (cord.vy + grav * subDt) * (1 - DRAG * subDt);
            cord.bx += cord.vx * subDt;
            cord.by += cord.vy * subDt;

            const cdx = cord.bx - cord.ax;
            const cdy = cord.by - cord.ay;
            const cdist = Math.hypot(cdx, cdy) || 1;
            const maxLen = cord.L0 * 1.2 + 40;
            if (cdist > maxLen) {
              cord.bx = cord.ax + (cdx / cdist) * maxLen;
              cord.by = cord.ay + (cdy / cdist) * maxLen;
              const dot = (cord.vx * cdx + cord.vy * cdy) / cdist;
              if (dot > 0) {
                cord.vx -= 1.4 * dot * (cdx / cdist);
                cord.vy -= 1.4 * dot * (cdy / cdist);
              }
            }
          }
        }

        const pts = cord.pts;
        const prev = cord.prev;
        pts[0] = cord.ax;
        pts[1] = cord.ay;
        pts[U * 2] = cord.bx;
        pts[U * 2 + 1] = cord.by;

        for (let i = 1; i < U; i++) {
          const n = i * 2;
          const vx = (pts[n] - prev[n]) * 0.96;
          const vy = (pts[n + 1] - prev[n + 1]) * 0.96;
          prev[n] = pts[n];
          prev[n + 1] = pts[n + 1];
          pts[n] += vx;
          pts[n + 1] += vy + GRAVITY * 0.6 * dt * dt;
        }

        const chordDist = Math.hypot(cord.bx - cord.ax, cord.by - cord.ay);
        const segLen = (chordDist >= cord.L0 ? chordDist * 0.992 : cord.L0) / U;

        const relax = (i) => {
          const p1x = i * 2;
          const p1y = p1x + 1;
          const p2x = p1x + 2;
          const p2y = p1x + 3;
          const rx = pts[p2x] - pts[p1x];
          const ry = pts[p2y] - pts[p1y];
          const d = Math.hypot(rx, ry) || 1;
          const diff = (d - segLen) / d;
          const w1 = i === 0 ? 0 : i + 1 === U ? 1 : 0.5;
          const w2 = i + 1 === U ? 0 : i === 0 ? 1 : 0.5;
          pts[p1x] += rx * diff * w1;
          pts[p1y] += ry * diff * w1;
          pts[p2x] -= rx * diff * w2;
          pts[p2y] -= ry * diff * w2;
        };

        for (let pass = 0; pass < 4; pass++) {
          for (let i = 0; i < U; i++) relax(i);
          for (let i = U - 1; i >= 0; i--) relax(i);
        }

        if (chordDist >= cord.L0) {
          const t = Math.min(1, (chordDist - cord.L0) / 8) * 0.3;
          for (let i = 1; i < U; i++) {
            const r = i / U;
            pts[i * 2] += (cord.ax + (cord.bx - cord.ax) * r - pts[i * 2]) * t;
            pts[i * 2 + 1] += (cord.ay + (cord.by - cord.ay) * r - pts[i * 2 + 1]) * t;
          }
        }

        const uNodeX = pts[(U - 2) * 2];
        const uNodeY = pts[(U - 2) * 2 + 1];
        const f = -Math.atan2(cord.bx - uNodeX, Math.max(4, cord.by - uNodeY));
        const p = -Math.atan2(cord.bx - cord.ax, Math.max(4, cord.by - cord.ay));
        let targetRot = ((f * 0.45 + p * 0.55) * 180) / Math.PI;
        targetRot += clamp(-cord.vx * 0.004, -10, 10);
        targetRot = clamp(targetRot, -55, 55);
        cord.av += ((targetRot - cord.rot) * 110 - cord.av * 13) * dt;
        cord.rot = clamp(cord.rot + cord.av * dt, -70, 70);

        updateCordVisuals(cord);
      });

      animFrameRef.current = requestAnimationFrame(renderVerletFrame);
    }

    function updateCordVisuals(cord) {
      const pts = cord.pts;
      let d = `M ${pts[0].toFixed(1)} ${pts[1].toFixed(1)}`;
      for (let i = 1; i < U; i++) {
        const mx = (pts[i * 2] + pts[i * 2 + 2]) / 2;
        const my = (pts[i * 2 + 1] + pts[i * 2 + 3]) / 2;
        d += ` Q ${pts[i * 2].toFixed(1)} ${pts[i * 2 + 1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
      }
      d += ` L ${cord.bx.toFixed(1)} ${cord.by.toFixed(1)}`;

      if (cord.pathEl) {
        cord.pathEl.setAttribute('d', d);
      }

      if (cord.beadEl) {
        cord.beadEl.setAttribute('cx', cord.bx.toFixed(1));
        cord.beadEl.setAttribute('cy', cord.by.toFixed(1));
      }

      if (cord.badgeEl) {
        const radius = cord.w * 0.5;
        const x = (cord.bx - radius).toFixed(1);
        const y = cord.by.toFixed(1);
        cord.badgeEl.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${cord.rot.toFixed(2)}deg)`;
      }
    }

    // High performance IntersectionObserver: automatically pauses Verlet physics when off-screen
    let stageObserver = null;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      stageObserver = new IntersectionObserver(([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !isVisible) {
          isVisible = true;
          wakeAnimation();
        } else if (!nowVisible) {
          isVisible = false;
          if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
          }
        }
      }, { rootMargin: '80px 0px' });
      stageObserver.observe(stage);
    }

    animFrameRef.current = requestAnimationFrame(renderVerletFrame);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (stageObserver) stageObserver.disconnect();
      window.removeEventListener('resize', updateLayout);
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <>
      <div
        className="hero-hanging-cord-stage"
        id="hanging-cord-stage"
        aria-hidden="true"
        style={{ display: 'none' }}
      >
        <svg id="cord-svg" className="cord-svg" width="160" height="400">
          <path id="cord-path-glow" className="cord-path-glow" d="" />
          <path id="cord-path" className="cord-path" d="" />
          <circle id="cord-bead-1" className="cord-bead" cx="80" cy="55" r="3.2" />
          <circle id="cord-bead-2" className="cord-bead" cx="80" cy="113" r="2.8" />
        </svg>
        <div className="cord-bob-handle" id="cord-bob">
          <div className="bob-capsule">
            <div className="bob-led" id="bob-led">
              <span className="led-core"></span>
              <span className="led-ping"></span>
            </div>
            <div className="bob-content">
              <span className="bob-tag" id="bob-tag">PULL</span>
              <span className="bob-state" id="bob-state">{turboMode ? 'TURBO ACTIVE' : 'READY'}</span>
            </div>
          </div>
          <div className="cord-sparks-container" id="cord-sparks"></div>
        </div>
      </div>

      <div
        ref={stageRef}
        className="hero-tech-cords-stage"
        id="tech-cords-stage"
        aria-label="Nexprobyte Suspended Technology Badges"
      >
        <svg className="tech-cords-svg" id="tech-cords-svg" aria-hidden="true">
          <defs>
            <linearGradient id="tech-cord-grad-0" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" stopOpacity="0" />
              <stop offset="30%" stopColor="#475569" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#1e293b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="tech-cord-grad-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" stopOpacity="0" />
              <stop offset="30%" stopColor="#475569" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#1e293b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="tech-cord-grad-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" stopOpacity="0" />
              <stop offset="30%" stopColor="#475569" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#1e293b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="tech-cord-grad-3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" stopOpacity="0" />
              <stop offset="30%" stopColor="#475569" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#1e293b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="tech-cord-grad-4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" stopOpacity="0" />
              <stop offset="30%" stopColor="#475569" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#1e293b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="tech-cord-grad-5" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" stopOpacity="0" />
              <stop offset="30%" stopColor="#475569" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#1e293b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="tech-cord-grad-6" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" stopOpacity="0" />
              <stop offset="30%" stopColor="#475569" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#1e293b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="tech-cord-line-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" stopOpacity="0" />
              <stop offset="30%" stopColor="#475569" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          <path id="tech-cord-path-0" className="tech-cord-path tech-cord-0" stroke="url(#tech-cord-grad-0)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-1" className="tech-cord-path tech-cord-1" stroke="url(#tech-cord-grad-1)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-2" className="tech-cord-path tech-cord-2" stroke="url(#tech-cord-grad-2)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-3" className="tech-cord-path tech-cord-3" stroke="url(#tech-cord-grad-3)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-4" className="tech-cord-path tech-cord-4" stroke="url(#tech-cord-grad-4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-5" className="tech-cord-path tech-cord-5" stroke="url(#tech-cord-grad-5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-6" className="tech-cord-path tech-cord-6" stroke="url(#tech-cord-grad-6)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          <circle id="tech-cord-bead-0" className="tech-cord-bead" r="2.6" fill="#8a8a8a" />
          <circle id="tech-cord-bead-1" className="tech-cord-bead" r="2.6" fill="#8a8a8a" />
          <circle id="tech-cord-bead-2" className="tech-cord-bead" r="2.6" fill="#8a8a8a" />
          <circle id="tech-cord-bead-3" className="tech-cord-bead" r="2.6" fill="#8a8a8a" />
          <circle id="tech-cord-bead-4" className="tech-cord-bead" r="2.6" fill="#8a8a8a" />
          <circle id="tech-cord-bead-5" className="tech-cord-bead" r="2.6" fill="#8a8a8a" />
          <circle id="tech-cord-bead-6" className="tech-cord-bead" r="2.6" fill="#8a8a8a" />
        </svg>

        <div className="tech-cord-mount" id="tech-cord-mount-0" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-1" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-2" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-3" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-4" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-5" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>
        <div className="tech-cord-mount" id="tech-cord-mount-6" aria-hidden="true" style={{ display: 'none' }}><span className="mount-dot"></span></div>

        {/* 7 Saro Finance Style Suspended 3D Squircles with Authentic Icons (No Section Redirection) */}

        {/* 0: Center (Violet - Saro Orbit) */}
        <div
          className="tech-cord-squircle squircle-purple"
          id="tech-badge-0"
          role="button"
          tabIndex={0}
          aria-label="ERP & Analytics Technology Discipline"
          data-index="0"
        >
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                <path d="M46 12a38 38 0 1 0 42 42H46Z" />
                <path d="M56 4a40 40 0 0 1 40 40H56Z" opacity="0.55" />
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>ERP, BI &amp; Dashboards</strong>
              <span>Custom Business Software</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-0" aria-hidden="true"></div>
        </div>

        {/* 1: Top-Left (Cyan / Obsidian - Saro Knot) */}
        <div
          className="tech-cord-squircle squircle-cyan squircle-obsidian"
          id="tech-badge-1"
          role="button"
          tabIndex={0}
          aria-label="Full-Stack Developers Technology Discipline"
          data-index="1"
        >
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#ffffff" strokeWidth="9">
                  <circle cx="50" cy="33" r="21" />
                  <circle cx="34" cy="62" r="21" />
                  <circle cx="66" cy="62" r="21" />
                </g>
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>Full-Stack Developers</strong>
              <span>React, Node, Python &amp; Mobile</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-1" aria-hidden="true"></div>
        </div>

        {/* 2: Mid-Left (Sunset Orange - Saro Peaks) */}
        <div
          className="tech-cord-squircle squircle-orange"
          id="tech-badge-2"
          role="button"
          tabIndex={0}
          aria-label="AI Automation Technology Discipline"
          data-index="2"
        >
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                <path d="m50 8 40 40-14 14-26-26-26 26-14-14Z" />
                <path d="m50 44 40 40-14 14-26-26-26 26-14-14Z" opacity="0.6" />
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>AI Automation &amp; Agents</strong>
              <span>n8n, Zapier &amp; AI Copilot</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-2" aria-hidden="true"></div>
        </div>

        {/* 3: Bottom-Left (Emerald Mint - Saro Bloom) */}
        <div
          className="tech-cord-squircle squircle-mint"
          id="tech-badge-3"
          role="button"
          tabIndex={0}
          aria-label="Virtual Assistance Technology Discipline"
          data-index="3"
        >
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 6c12 12 12 32 0 44-12-12-12-32 0-44" />
                <path d="M94 50c-12 12-32 12-44 0 12-12 32-12 44 0" />
                <path d="M50 94c-12-12-12-32 0-44 12 12 12 32 0 44" />
                <path d="M6 50c12-12 32-12 44 0-12 12-32 12-44 0" />
                <circle cx="50" cy="50" r="6" />
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>Virtual Assistants (Top 1%)</strong>
              <span>Executive Admin &amp; Operations</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-3" aria-hidden="true"></div>
        </div>

        {/* 4: Top-Right (Electric Green / Rose - Saro Lift) */}
        <div
          className="tech-cord-squircle squircle-rose squircle-green"
          id="tech-badge-4"
          role="button"
          tabIndex={0}
          aria-label="Dedicated Remote Teams Discipline"
          data-index="4"
        >
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 10h60v60L68 48 30 86 14 70l38-38Z" />
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>Dedicated Dev Teams</strong>
              <span>Scale Engineering On-Demand</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-4" aria-hidden="true"></div>
        </div>

        {/* 5: Mid-Right (Royal Blue - Saro Pair) */}
        <div
          className="tech-cord-squircle squircle-blue"
          id="tech-badge-5"
          role="button"
          tabIndex={0}
          aria-label="DevOps and API Integration Discipline"
          data-index="5"
        >
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="36" cy="50" r="28" fill="#ffffff" />
                <circle cx="64" cy="50" r="24" fill="none" stroke="#ffffff" strokeWidth="8" />
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>DevOps &amp; Cloud APIs</strong>
              <span>CI/CD, Cloud &amp; Integrations</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-5" aria-hidden="true"></div>
        </div>

        {/* 6: Bottom-Right (Neon Lime - Saro Leaf) */}
        <div
          className="tech-cord-squircle squircle-amber squircle-lime"
          id="tech-badge-6"
          role="button"
          tabIndex={0}
          aria-label="E-Commerce Support Discipline"
          data-index="6"
        >
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="#111827" xmlns="http://www.w3.org/2000/svg">
                <path d="M90 8C40 8 14 34 14 64c0 9 3 17 8 23 44 1 68-29 68-79" />
                <path stroke="#111827" strokeLinecap="round" strokeWidth="7" d="m10 92 12-12" />
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>E-Commerce Management</strong>
              <span>Shopify, Growth &amp; Ops</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-6" aria-hidden="true"></div>
        </div>
      </div>
    </>
  );
}
