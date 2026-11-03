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
    // PART A: SUSPENDED 7-CORD SQUIRCLE ARCHITECTURE
    // -------------------------------------------------------------
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
        sub: 'Scale Engineering On-Demand →',
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

    // Shared AudioContext for low latency click sounds
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
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } catch (_) {}
    }

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

    function updateLayout() {
      stageWidth = stage.clientWidth || window.innerWidth;
      const centerX = stageWidth * 0.5;
      const isMobile = stageWidth < 768;
      const isTablet = stageWidth >= 768 && stageWidth < 1024;
      const isDesktop = stageWidth >= 1024;

      if (isMobile) {
        // -------------------------------------------------------------
        // Mobile View (< 768px): 100% Exact Match to sarofinance.framer.website!
        // 7 hanging threads staggered in a graceful smiling arc directly
        // above the hero status badge, evenly spanning across the screen:
        // Left to Right: Orange -> Mint -> Obsidian -> Purple -> Green -> Lime -> Blue
        // -------------------------------------------------------------
        const isSmall = stageWidth < 375;
        const outerMargin = isSmall ? 22 : 28;
        const totalSpan = stageWidth - (outerMargin * 2);
        const pitch = totalSpan / 6;

        // Vertical heights staggered to match reference screenshot:
        // High (Obsidian & Green): ~92px
        // Mid (Purple, Orange, Blue): ~116px
        // Low (Mint & Lime): ~150px
        const yHigh = isSmall ? 82 : 92;
        const yMid = isSmall ? 104 : 116;
        const yLow = isSmall ? 134 : 150;

        const mobilePositions = {
          2: { x: centerX - 3 * pitch, y: yMid },  // 1: Orange (outer left)
          3: { x: centerX - 2 * pitch, y: yLow },  // 2: Mint (mid left - low)
          1: { x: centerX - 1 * pitch, y: yHigh }, // 3: Obsidian (inner left - high)
          0: { x: centerX,             y: yMid },  // 4: Purple (center - mid)
          4: { x: centerX + 1 * pitch, y: yHigh }, // 5: Green (inner right - high)
          6: { x: centerX + 2 * pitch, y: yLow },  // 6: Lime (mid right - low)
          5: { x: centerX + 3 * pitch, y: yMid },  // 7: Blue (outer right - mid)
        };

        cords.forEach((cord) => {
          const pos = mobilePositions[cord.id] || { x: centerX, y: yMid };
          cord.restX = pos.x;
          cord.restY = pos.y;
          cord.anchorX = pos.x;
          cord.anchorY = 0;

          if (cord.px === 0 && cord.py === 0) {
            cord.px = pos.x;
            cord.py = pos.y;
          }
        });
      } else if (isTablet) {
        const maxOffset = Math.min(stageWidth * 0.44, 380);
        const radius = 22;
        cords.forEach((cord) => {
          let targetX = centerX;
          let targetY = 100;
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
          cord.restX = targetX;
          cord.restY = targetY;
          cord.anchorX = targetX;
          cord.anchorY = 0;
          if (cord.px === 0 && cord.py === 0) {
            cord.px = targetX;
            cord.py = targetY;
          }
        });
      } else {
        // Desktop (>= 1024px)
        const radius = 28;
        cords.forEach((cord) => {
          let targetX = centerX;
          let targetY = 110;
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
          cord.restX = targetX;
          cord.restY = targetY;
          cord.anchorX = targetX;
          cord.anchorY = 0;
          if (cord.px === 0 && cord.py === 0) {
            cord.px = targetX;
            cord.py = targetY;
          }
        });
      }
    }

    // Pointer event bindings for squircle cords
    cords.forEach((cord) => {
      const badge = cord.badgeEl;
      if (!badge) return;

      badge.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        cord.isDragging = true;
        cord.pointerId = e.pointerId;
        try {
          badge.setPointerCapture(e.pointerId);
        } catch (_) {}
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

          cord.vx = (cord.restX - cord.px) * 0.22;
          cord.vy = (cord.restY - cord.py) * 0.22;
          emitCordSparks(cord);
          playSquirclePing(cord.freq + 120);
        }
      };

      badge.addEventListener('pointerup', onPointerEnd);
      badge.addEventListener('pointercancel', onPointerEnd);
    });

    // -------------------------------------------------------------
    // PART B: INTERACTIVE HANGING PULL-THREAD (TURBO SWITCH)
    // -------------------------------------------------------------
    const pullStage = document.getElementById('hanging-cord-stage');
    const pullCordPath = document.getElementById('cord-path');
    const pullCordPathGlow = document.getElementById('cord-path-glow');
    const pullBead1 = document.getElementById('cord-bead-1');
    const pullBead2 = document.getElementById('cord-bead-2');
    const pullBob = document.getElementById('cord-bob');
    const pullBobTag = document.getElementById('bob-tag');
    const pullBobState = document.getElementById('bob-state');
    const pullSparksContainer = document.getElementById('cord-sparks');

    const pullAnchorX = 80;
    const pullAnchorY = 0;
    const pullRestLength = 170;
    const PULL_THRESHOLD = 50;
    const MAX_STRETCH = 85;

    let pullPx = pullAnchorX;
    let pullPy = pullRestLength;
    let pullVx = 0;
    let pullVy = 0;
    let isPullDragging = false;
    let isPrimed = false;
    let pullPointerId = null;
    let pullMagneticX = 0;
    let pullMagneticY = 0;

    let pullStartPointerX = 0;
    let pullStartPointerY = 0;
    let pullStartTime = 0;
    let pullHasMovedFar = false;

    function bezierPoint(p0, p1, p2, p3, t) {
      const mt = 1 - t;
      const mt2 = mt * mt;
      const mt3 = mt2 * mt;
      const t2 = t * t;
      const t3 = t2 * t;
      return {
        x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
        y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
      };
    }

    function playPullClick() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(1180, now);
        osc1.frequency.exponentialRampToValueAtTime(320, now + 0.025);
        gain1.gain.setValueAtTime(0.08, now);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.025);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(440, now + 0.02);
        osc2.frequency.exponentialRampToValueAtTime(130, now + 0.06);
        gain2.gain.setValueAtTime(0.06, now + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.02);
        osc2.stop(now + 0.06);
      } catch (_) {}
    }

    function emitPullSparks() {
      if (!pullSparksContainer) return;
      const count = 12;
      const colors = ['#0066ff', '#ff6b1a', '#00d6b2', '#ffd166', '#ffffff'];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const distance = 28 + Math.random() * 42;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        const spark = document.createElement('span');
        spark.className = 'cord-spark-particle';
        spark.style.setProperty('--dx', `${dx.toFixed(1)}px`);
        spark.style.setProperty('--dy', `${dy.toFixed(1)}px`);
        spark.style.backgroundColor = colors[i % colors.length];
        spark.style.boxShadow = `0 0 6px ${colors[i % colors.length]}`;

        pullSparksContainer.appendChild(spark);
        setTimeout(() => spark.remove(), 600);
      }
    }

    function toggleTurbo() {
      setTurboMode((prev) => {
        const next = !prev;
        if (pullBobState) pullBobState.textContent = next ? 'TURBO ACTIVE' : 'READY';
        if (pullBobTag) pullBobTag.textContent = next ? 'TURBO' : 'PULL';
        return next;
      });
      playPullClick();
      emitPullSparks();
    }

    function updatePullPointerCoords(e) {
      if (!pullStage) return;
      const rect = pullStage.getBoundingClientRect();
      const scaleX = rect.width > 0 ? rect.width / 160 : 1;
      const scaleY = rect.height > 0 ? rect.height / 340 : 1;
      const rawX = (e.clientX - rect.left) / scaleX;
      const rawY = (e.clientY - rect.top) / scaleY;

      const moveDist = Math.hypot(e.clientX - pullStartPointerX, e.clientY - pullStartPointerY);
      if (moveDist > 8) {
        pullHasMovedFar = true;
      }

      const dx = rawX - pullAnchorX;
      const dy = Math.max(20, rawY - pullAnchorY);
      const dist = Math.hypot(dx, dy);

      let effectiveDist = dist;
      if (dist > pullRestLength) {
        const excess = dist - pullRestLength;
        const resistedExcess = MAX_STRETCH * Math.tanh(excess / MAX_STRETCH);
        effectiveDist = pullRestLength + resistedExcess;
      }

      const angle = Math.max(-Math.PI / 2.6, Math.min(Math.PI / 2.6, Math.atan2(dx, dy)));
      pullPx = pullAnchorX + Math.sin(angle) * effectiveDist;
      pullPy = pullAnchorY + Math.cos(angle) * effectiveDist;

      const pullDelta = pullPy - pullRestLength;
      if (pullDelta >= PULL_THRESHOLD) {
        if (!isPrimed) {
          isPrimed = true;
          if (pullStage) pullStage.classList.add('is-primed');
          if (pullBobTag) pullBobTag.textContent = 'RELEASE ⚡';
        }
      } else {
        if (isPrimed) {
          isPrimed = false;
          if (pullStage) pullStage.classList.remove('is-primed');
          if (pullBobTag) pullBobTag.textContent = 'PULL';
        }
      }
    }

    if (pullBob) {
      pullBob.addEventListener('pointerdown', (e) => {
        if (e.button && e.button !== 0) return;
        isPullDragging = true;
        pullPointerId = e.pointerId;
        try {
          pullBob.setPointerCapture(e.pointerId);
        } catch (_) {}
        pullBob.classList.add('is-dragging');
        pullMagneticX = 0;
        pullMagneticY = 0;
        pullStartPointerX = e.clientX;
        pullStartPointerY = e.clientY;
        pullStartTime = performance.now();
        pullHasMovedFar = false;
        updatePullPointerCoords(e);
      });

      const onPullPointerEnd = () => {
        if (!isPullDragging) return;
        isPullDragging = false;
        pullBob.classList.remove('is-dragging');
        try {
          if (pullPointerId !== null) pullBob.releasePointerCapture(pullPointerId);
        } catch (_) {}
        pullPointerId = null;

        const pullDelta = pullPy - pullRestLength;
        const duration = performance.now() - pullStartTime;
        const isQuickTap = !pullHasMovedFar && duration < 350;

        if (isQuickTap) {
          pullPy = pullRestLength + PULL_THRESHOLD + 12;
          isPrimed = true;
          if (pullStage) pullStage.classList.add('is-primed');
          setTimeout(() => {
            toggleTurbo();
            pullVy = -20;
            pullVx = (Math.random() - 0.5) * 8;
            isPrimed = false;
            if (pullStage) pullStage.classList.remove('is-primed');
          }, 120);
          return;
        }

        if (isPrimed || pullDelta >= PULL_THRESHOLD) {
          toggleTurbo();
          pullVy = -Math.min(24, pullDelta * 0.32);
          pullVx = (pullAnchorX - pullPx) * 0.3;
        } else {
          pullVy = -(pullDelta * 0.22);
          pullVx = (pullAnchorX - pullPx) * 0.25;
        }

        isPrimed = false;
        if (pullStage) pullStage.classList.remove('is-primed');
      };

      pullBob.addEventListener('pointerup', onPullPointerEnd);
      pullBob.addEventListener('pointercancel', onPullPointerEnd);

      pullBob.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pullPy = pullRestLength + PULL_THRESHOLD + 14;
          isPrimed = true;
          if (pullStage) pullStage.classList.add('is-primed');
          setTimeout(() => {
            toggleTurbo();
            pullVy = -22;
            isPrimed = false;
            if (pullStage) pullStage.classList.remove('is-primed');
          }, 120);
        }
      });
    }

    // Window level cursor listeners (Mouse parallax disabled per user request so cursor shake does not move threads)
    const handleMouseMove = (e) => {
      targetParallaxX = 0;
      targetParallaxY = 0;

      if (isPullDragging) {
        updatePullPointerCoords(e);
      } else if (pullStage) {
        const rect = pullStage.getBoundingClientRect();
        const scaleX = rect.width > 0 ? rect.width / 160 : 1;
        const scaleY = rect.height > 0 ? rect.height / 340 : 1;
        const pointerX = (e.clientX - rect.left) / scaleX;
        const pointerY = (e.clientY - rect.top) / scaleY;
        const dist = Math.hypot(pointerX - pullPx, pointerY - pullPy);
        if (dist < 100) {
          pullMagneticX = (pointerX - pullPx) * 0.08;
          pullMagneticY = Math.min(10, Math.max(0, (pointerY - pullPy) * 0.08));
        } else {
          pullMagneticX = 0;
          pullMagneticY = 0;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateLayout);
    updateLayout();

    // IntersectionObserver to pause physics loop when hero is off-screen (Massive Performance Boost)
    let isHeroVisible = true;
    let heroObserver = null;
    if (typeof IntersectionObserver !== 'undefined') {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          isHeroVisible = entry.isIntersecting;
          if (isHeroVisible && !animFrameRef.current) {
            animFrameRef.current = requestAnimationFrame(renderLoop);
          }
        },
        { threshold: 0.05 }
      );
      heroObserver.observe(stage);
    }

    // -------------------------------------------------------------
    // PART C: UNIFIED HIGH-PERFORMANCE PHYSICS ANIMATION LOOP
    // -------------------------------------------------------------
    const SPRING_K = 0.075;
    const DAMPING = 0.86;

    function renderLoop(time) {
      if (!isHeroVisible) {
        animFrameRef.current = null;
        return;
      }

      currentParallaxX = 0;
      currentParallaxY = 0;

      const tSec = time * 0.0015;
      const isMobile = stageWidth < 768;
      const isTablet = stageWidth >= 768 && stageWidth < 1024;
      const squircleHalf = isMobile ? 16 : isTablet ? 21 : 28;

      // 1. Update 7 suspended squircle cords
      cords.forEach((cord) => {
        if (!cord.badgeEl || !cord.pathEl) return;

        if (!cord.isDragging) {
          const targetX = cord.restX;
          const targetY = cord.restY;

          const fx = (targetX - cord.px) * SPRING_K;
          const fy = (targetY - cord.py) * SPRING_K;

          cord.vx = (cord.vx + fx) * DAMPING;
          cord.vy = (cord.vy + fy) * DAMPING;

          if (Math.abs(cord.vx) < 0.005 && Math.abs(cord.vy) < 0.005 && Math.abs(targetX - cord.px) < 0.05 && Math.abs(targetY - cord.py) < 0.05) {
            cord.px = targetX;
            cord.py = targetY;
            cord.vx = 0;
            cord.vy = 0;
          } else {
            cord.px += cord.vx;
            cord.py += cord.vy;
          }
        }

        const tiltAngle = Math.max(-18, Math.min(18, (cord.px - cord.anchorX) * 0.12));
        cord.badgeEl.style.transform = `translate3d(${cord.px - squircleHalf}px, ${cord.py - squircleHalf}px, 0) rotate(${tiltAngle}deg)`;

        const ax = cord.anchorX;
        const ay = 0;
        const bx = cord.px;
        const by = cord.py - (squircleHalf - 2);

        const ctrlX = (ax + bx) * 0.5 + (cord.px - cord.anchorX) * 0.08;
        const ctrlY = (ay + by) * 0.5 + 12;

        cord.pathEl.setAttribute('d', `M ${ax.toFixed(1)},0 Q ${ctrlX.toFixed(1)},${ctrlY.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)}`);
      });

      // 2. Update interactive hanging pull-cord
      if (pullCordPath && pullBob) {
        if (!isPullDragging) {
          const ambientSway = Math.sin(tSec * 1.1) * 3.6 + Math.cos(tSec * 2.2) * 1.2;
          const curTargetX = pullAnchorX + ambientSway + pullMagneticX;
          const curTargetY = pullRestLength + pullMagneticY;

          const dxFromTarget = curTargetX - pullPx;
          const dyFromTarget = curTargetY - pullPy;

          const angle = Math.atan2(pullPx - pullAnchorX, pullPy - pullAnchorY);
          const pendulumRestoreX = -Math.sin(angle) * 0.85;

          const ax = dxFromTarget * 0.045 + pendulumRestoreX;
          const ay = dyFromTarget * 0.07;

          pullVx = (pullVx + ax) * 0.965;
          pullVy = (pullVy + ay) * 0.91;

          pullPx += pullVx;
          pullPy += pullVy;
        }

        const dx = pullPx - pullAnchorX;
        const dy = pullPy - pullAnchorY;
        const len = Math.hypot(dx, dy);
        const sag = Math.max(0, 16 * (1 - Math.min(1, len / pullRestLength)));
        const lagX = -pullVx * 0.08;

        const cp1 = {
          x: pullAnchorX + dx * 0.33 + lagX,
          y: pullAnchorY + dy * 0.33 + sag,
        };
        const cp2 = {
          x: pullAnchorX + dx * 0.66 + lagX * 0.7,
          y: pullAnchorY + dy * 0.66 + sag * 0.4,
        };

        const pathData = `M ${pullAnchorX},${pullAnchorY} C ${cp1.x.toFixed(1)},${cp1.y.toFixed(1)} ${cp2.x.toFixed(1)},${cp2.y.toFixed(1)} ${pullPx.toFixed(1)},${pullPy.toFixed(1)}`;
        pullCordPath.setAttribute('d', pathData);
        if (pullCordPathGlow) {
          pullCordPathGlow.setAttribute('d', pathData);
        }

        if (pullBead1) {
          const b1 = bezierPoint({ x: pullAnchorX, y: pullAnchorY }, cp1, cp2, { x: pullPx, y: pullPy }, 0.33);
          pullBead1.setAttribute('cx', b1.x.toFixed(1));
          pullBead1.setAttribute('cy', b1.y.toFixed(1));
        }
        if (pullBead2) {
          const b2 = bezierPoint({ x: pullAnchorX, y: pullAnchorY }, cp1, cp2, { x: pullPx, y: pullPy }, 0.66);
          pullBead2.setAttribute('cx', b2.x.toFixed(1));
          pullBead2.setAttribute('cy', b2.y.toFixed(1));
        }

        const angleRad = Math.atan2(dx, dy);
        const angleDeg = (angleRad * (180 / Math.PI) * 0.65).toFixed(1);
        const offsetX = (pullPx - pullAnchorX).toFixed(1);
        const offsetY = (pullPy - pullRestLength).toFixed(1);

        pullBob.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${angleDeg}deg)`;
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    }

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateLayout);
      if (heroObserver) heroObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* 1. Hanging pull thread for 48H / Turbo toggle (Always visible, responsive across all viewports) */}
      <div
        className={`hero-hanging-cord-stage ${turboMode ? 'turbo-active' : ''}`}
        id="hanging-cord-stage"
        aria-label="Interactive Cord Switch"
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
        </svg>
        <div
          className="cord-bob-handle"
          id="cord-bob"
          role="button"
          tabIndex={0}
          aria-label="Pull thread to toggle Turbo Acceleration Mode"
          aria-pressed={turboMode}
        >
          <div className="bob-capsule">
            <div className="bob-led" id="bob-led">
              <span className="led-core"></span>
              <span className="led-ping"></span>
            </div>
            <div className="bob-content">
              <span className="bob-tag" id="bob-tag">PULL</span>
              <span className="bob-state" id="bob-state">{turboMode ? 'TURBO ACTIVE' : 'READY'}</span>
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
            {/* Vibrant Thread Gradients matching each squircle's authentic theme colors */}
            {/* 0: Center (Purple) */}
            <linearGradient id="tech-cord-grad-0" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="55%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            {/* 1: Top-Left (Dark Obsidian) */}
            <linearGradient id="tech-cord-grad-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="55%" stopColor="#3f3f46" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>
            {/* 2: Mid-Left (Vibrant Sunset Orange) */}
            <linearGradient id="tech-cord-grad-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="55%" stopColor="#ff7b1a" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            {/* 3: Bottom-Left (Mint Emerald) */}
            <linearGradient id="tech-cord-grad-3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="55%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            {/* 4: Top-Right (Electric Growth Green) */}
            <linearGradient id="tech-cord-grad-4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="55%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            {/* 5: Mid-Right (Cobalt Royal Blue) */}
            <linearGradient id="tech-cord-grad-5" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="55%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            {/* 6: Bottom-Right (Neon Lime) */}
            <linearGradient id="tech-cord-grad-6" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="55%" stopColor="#a3e635" />
              <stop offset="100%" stopColor="#84cc16" />
            </linearGradient>
            {/* Base Saro fallback */}
            <linearGradient id="tech-cord-line-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <path id="tech-cord-path-0" className="tech-cord-path tech-cord-0" stroke="url(#tech-cord-grad-0)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-1" className="tech-cord-path tech-cord-1" stroke="url(#tech-cord-grad-1)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-2" className="tech-cord-path tech-cord-2" stroke="url(#tech-cord-grad-2)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-3" className="tech-cord-path tech-cord-3" stroke="url(#tech-cord-grad-3)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-4" className="tech-cord-path tech-cord-4" stroke="url(#tech-cord-grad-4)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-5" className="tech-cord-path tech-cord-5" stroke="url(#tech-cord-grad-5)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path id="tech-cord-path-6" className="tech-cord-path tech-cord-6" stroke="url(#tech-cord-grad-6)" strokeWidth="2" strokeLinecap="round" fill="none" />
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
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2.5C6.75 2.5 2.5 6.75 2.5 12s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5H12V2.5z" fill="#ffffff"/>
                <path d="M14.5 2.5V9.5H21.5C21.5 5.63 18.37 2.5 14.5 2.5Z" fill="#ffffff" fillOpacity="0.8"/>
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
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2">
                <circle cx="12" cy="7.5" r="4" strokeLinecap="round"/>
                <circle cx="7.5" cy="15.5" r="4" strokeLinecap="round"/>
                <circle cx="16.5" cy="15.5" r="4" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="1.5" fill="#ffffff" stroke="none"/>
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
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 14 12 8 6 14" />
                <polyline points="18 19 12 13 6 19" />
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

        {/* 3: Bottom-Left (Mint Emerald - Executive Virtual Assistance) */}
        <div className="tech-cord-squircle squircle-mint" id="tech-badge-3" role="button" tabIndex={0} aria-label="Virtual Assistance Technology Discipline" data-index="3">
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
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

        {/* 4: Top-Right (Electric Green - Dedicated Dev Teams) */}
        <div className="tech-cord-squircle squircle-green" id="tech-badge-4" role="button" tabIndex={0} aria-label="Dedicated Remote Teams Discipline" data-index="4">
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>Dedicated Dev Teams</strong>
              <span>Scale Engineering On-Demand &rarr;</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-4" aria-hidden="true"></div>
        </div>

        {/* 5: Mid-Right (Cobalt Blue - DevOps & Cloud APIs Toggle) */}
        <div className="tech-cord-squircle squircle-blue" id="tech-badge-5" role="button" tabIndex={0} aria-label="DevOps and API Integration Discipline" data-index="5">
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2.5" y="6.5" width="19" height="11" rx="5.5" stroke="#ffffff" strokeWidth="2.4"/>
                <circle cx="8" cy="12" r="3.2" fill="#ffffff"/>
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

        {/* 6: Bottom-Right (Lime Green - E-Commerce & Growth) */}
        <div className="tech-cord-squircle squircle-lime" id="tech-badge-6" role="button" tabIndex={0} aria-label="E-Commerce Support Discipline" data-index="6">
          <div className="squircle-body">
            <div className="squircle-sheen" aria-hidden="true"></div>
            <div className="squircle-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
          </div>
          <div className="squircle-tooltip" role="tooltip">
            <span className="tooltip-indicator"></span>
            <div className="tooltip-text">
              <strong>E-Commerce Management</strong>
              <span>Shopify, Growth &amp; Ops &rarr;</span>
            </div>
          </div>
          <div className="squircle-sparks" id="tech-sparks-6" aria-hidden="true"></div>
        </div>
      </div>
    </>
  );
}
