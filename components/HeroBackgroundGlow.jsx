'use client';

import React, { useEffect, useRef } from 'react';

/**
 * HeroBackgroundGlow — High-Performance Ambient Bloom & Particle Canvas
 * - Pauses rendering when scrolled out of viewport (0% background CPU usage)
 * - Optimized O(N^2) squared-distance culling (skips unnecessary Math.sqrt)
 * - GPU composited radial blooms
 */
export default function HeroBackgroundGlow() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId = null;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const mouse = {
      x: -9999,
      y: -9999,
      radius: 120,
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const parent = canvas.parentElement || window;
    parent.addEventListener('mousemove', handleMouseMove, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Efficient particle count scaled to screen width
    const particleCount = Math.min(Math.floor((window.innerWidth || 1200) / 45), 28);
    const particles = [];
    const colors = [
      'rgba(0, 102, 255, 0.45)', // --accent-blue
      'rgba(99, 91, 255, 0.38)', // --accent-purple
      'rgba(0, 214, 178, 0.35)', // --accent-cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || 1000),
        y: Math.random() * (height || 600),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 1,
        color: colors[i % colors.length],
      });
    }

    const maxDist = 100;
    const maxDistSq = maxDist * maxDist;
    const mouseRadiusSq = mouse.radius * mouse.radius;

    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return; // Complete halt when off-screen!
      }

      ctx.clearRect(0, 0, width, height);

      // Fast squared-distance particle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 102, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Mouse interactive connections
      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / mouse.radius) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 102, 255, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Particle update and drawing
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 0.7;
            p.y -= (dy / dist) * force * 0.7;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause rendering when hero is out of view
    const observer = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting;
      if (nowVisible && !isVisible) {
        isVisible = true;
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      } else if (!nowVisible) {
        isVisible = false;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    });

    observer.observe(canvas);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="hero-ambient-lights"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.85,
        }}
      />

      <div
        className="ambient-orb ambient-orb-1"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: '540px',
          height: '420px',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.12) 0%, rgba(0, 102, 255, 0) 70%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          willChange: 'transform',
        }}
      />

      <div
        className="ambient-orb ambient-orb-2"
        style={{
          position: 'absolute',
          top: '25%',
          right: '15%',
          width: '460px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(99, 91, 255, 0.1) 0%, rgba(99, 91, 255, 0) 70%)',
          filter: 'blur(70px)',
          borderRadius: '50%',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
