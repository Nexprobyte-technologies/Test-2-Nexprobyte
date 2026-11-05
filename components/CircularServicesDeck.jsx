'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, MoveVertical } from 'lucide-react';
import { SERVICES } from '@/data/siteContent';
import './CircularServicesDeck.css';

// Rich metadata enhancement mapping for all 12 services
const SERVICE_THEME_CONFIG = {
  'website-development': {
    theme: 'theme-cobalt',
    kicker: 'CORE DISCIPLINE · 01',
    badge: 'LIGHTHOUSE 100',
    metric: '< 0.4s FCP',
    accentColor: '#0066ff',
  },
  'application-development': {
    theme: 'theme-mint',
    kicker: 'ENGINEERING · 02',
    badge: '99.98% SLA',
    metric: 'React / Node / Cloud',
    accentColor: '#00d6b2',
  },
  'mobile-app-development': {
    theme: 'theme-berry',
    kicker: 'MOBILE SUITE · 03',
    badge: '60 FPS FLUID',
    metric: 'iOS & Android Native',
    accentColor: '#635bff',
  },
  'digital-marketing': {
    theme: 'theme-fire',
    kicker: 'PERFORMANCE · 04',
    badge: '10X ROAS',
    metric: 'Full-Funnel CRO',
    accentColor: '#ff6b1a',
  },
  'seo-services': {
    theme: 'theme-sapphire',
    kicker: 'SEARCH VISIBILITY · 05',
    badge: '#1 RANKING',
    metric: 'Google Authority & Rank',
    accentColor: '#0284c7',
  },
  'social-media-marketing': {
    theme: 'theme-cyan',
    kicker: 'BRAND REACH · 06',
    badge: '+340% REACH',
    metric: 'Viral Social Loops',
    accentColor: '#06b6d4',
  },
  'ui-ux-design': {
    theme: 'theme-iris',
    kicker: 'EXPERIENCE DESIGN · 07',
    badge: 'FIGMA MASTER',
    metric: 'Design Systems & UX',
    accentColor: '#8b5cf6',
  },
  'branding-identity': {
    theme: 'theme-amber',
    kicker: 'BRAND STRATEGY · 08',
    badge: 'TIMELESS',
    metric: 'Logo & Visual Identity',
    accentColor: '#f59e0b',
  },
  'dedicated-developers': {
    theme: 'theme-cobalt',
    kicker: 'ENGINEERING TALENT · 09',
    badge: '48H ONBOARDING',
    metric: 'Senior Full-Stack Pods',
    accentColor: '#0066ff',
  },
  'ai-automation': {
    theme: 'theme-mint',
    kicker: 'AUTONOMOUS TECH · 10',
    badge: '24/7 AUTONOMOUS',
    metric: 'n8n & Custom AI Agents',
    accentColor: '#00d6b2',
  },
  'custom-software': {
    theme: 'theme-berry',
    kicker: 'ENTERPRISE TECH · 11',
    badge: '99.99% UPTIME',
    metric: 'Bespoke ERP & Cloud',
    accentColor: '#635bff',
  },
  'virtual-assistance': {
    theme: 'theme-coral',
    kicker: 'EXECUTIVE OPERATIONS · 12',
    badge: '25+ HRS SAVED',
    metric: 'Top 1% Remote Assistants',
    accentColor: '#f43f5e',
  },
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function ArcCard({
  service,
  config,
  slot,
  width,
  motion,
  isHovered,
  onHoverChange,
  onChoose,
}) {
  // Mathematics of the circular arc deck from Kexsio
  const theta = ((-20 + slot * 10.5) * Math.PI) / 180;
  const radius = width * 1.868;
  const centerX = -width * 1.322;
  const centerY = width * 0.812;
  const x = centerX + radius * Math.cos(theta);
  const y = centerY + radius * Math.sin(theta);

  // Cards fade & blur at viewport edges
  const edge = Math.max(0, Math.abs(slot - 2) - 3.15);
  const visible = slot > -2.2 && slot < 6.2;
  const isCenter = Math.abs(slot - 2) < 0.45;

  // Secondary tactile motion during drag / spin
  const side = clamp(Math.abs(slot - 2) / 2.6, 0, 1);
  const travel = clamp(motion, -1, 1);
  const travelStrength = Math.abs(travel) * (0.34 + side * 0.66);
  const slipX = travel * width * 0.009 * side;
  const peelY = -travelStrength * width * 0.014;
  const counterRotation = travel * (slot < 2 ? -1 : 1) * (0.7 + side * 1.8);
  const travelScale = 1 + travelStrength * 0.012;

  return (
    <article
      className={`arc-deck-card ${config.theme} ${isCenter ? 'is-center' : ''}`}
      aria-label={service.title}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onClick={onChoose}
      style={{
        opacity: visible ? clamp(1 - edge * 0.52, 0, 1) : 0,
        filter: `blur(${edge * (2.5 + Math.abs(travel) * 1.4)}px)`,
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: isHovered ? 1000 : Math.round((slot + 3) * 10),
        transform: `translate3d(${x}px,${y}px,0) translate(-50%,-50%) rotate(${theta}rad)`,
      }}
    >
      <div
        className="arc-deck-card-motion"
        style={{
          transform: `translate3d(${slipX}px,${peelY}px,0) rotate(${counterRotation}deg) scale(${travelScale})`,
        }}
      >
        <div className="arc-deck-card-surface">
          {/* Header */}
          <div className="arc-deck-card-header">
            <div className="arc-deck-kicker">
              <span className="arc-deck-kicker-dot" />
              <span>{config.kicker}</span>
            </div>
            <span className="arc-deck-serial">NEX / {service.num}</span>
          </div>

          {/* Body */}
          <div className="arc-deck-card-body">
            <h3 className="arc-deck-card-title">{service.title}</h3>
            <span className="arc-deck-card-serif">{service.serif}</span>
          </div>

          {/* Artwork & Deliverables Bar */}
          <div className="arc-deck-card-art">
            <div className="arc-deck-badge-pill">
              <Sparkles size={11} color={config.accentColor} />
              <span>{config.badge}</span>
            </div>

            <div className="arc-deck-art-metrics">
              <span className="arc-deck-art-tag">{config.metric}</span>
            </div>

            <Link
              href={`/services/${service.slug}`}
              className="arc-deck-explore-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Explore</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CircularServicesDeck() {
  const router = useRouter();
  const stageRef = useRef(null);
  const containerRef = useRef(null);

  // Physics animation state references
  const value = useRef(-1);
  const target = useRef(-1);
  const velocity = useRef(0);
  const visualMotion = useRef(0);
  const lastFrameValue = useRef(-1);
  const manual = useRef(false);
  const dragging = useRef(false);
  const dragged = useRef(false);
  const startY = useRef(0);
  const startValue = useRef(0);
  const lastWheel = useRef(0);

  const [position, setPosition] = useState(-1);
  const [motion, setMotion] = useState(0);
  const [stageWidth, setStageWidth] = useState(480);
  const [hoveredCard, setHoveredCard] = useState(null);

  const servicesCount = SERVICES.length;

  // Responsive stage measurement
  useEffect(() => {
    const measure = () => {
      if (stageRef.current) {
        setStageWidth(stageRef.current.clientWidth || 480);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (stageRef.current) observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  // Frame simulation loop with physics dampening
  useEffect(() => {
    let frame = 0;
    const started = performance.now();

    const tick = (now) => {
      if (!manual.current) {
        // Idle gentle float between cards
        const time = ((now - started) % 6500) / 1000;
        let next = -1;
        if (time < 2.5) next = -1 + easeInOutCubic(time / 2.5);
        else if (time < 4.2) next = 0;
        else next = -easeInOutCubic((time - 4.2) / 2.3);
        value.current = next;
      } else if (!dragging.current) {
        // Velocity inertia and target snapping
        const delta = target.current - value.current;
        velocity.current = (velocity.current + delta * 0.105) * 0.72;
        value.current += velocity.current;

        if (Math.abs(delta) < 0.0005 && Math.abs(velocity.current) < 0.0005) {
          value.current = target.current;
          velocity.current = 0;
        }

        // Seamless wrap around service count
        if (Math.abs(value.current) > servicesCount) {
          const cycle = Math.round(value.current / servicesCount) * servicesCount;
          value.current -= cycle;
          target.current -= cycle;
        }
      }

      let frameDelta = value.current - lastFrameValue.current;
      frameDelta -= Math.round(frameDelta / servicesCount) * servicesCount;
      lastFrameValue.current = value.current;

      const requestedMotion = clamp(frameDelta * 28, -1, 1);
      const motionResponse =
        Math.abs(requestedMotion) > Math.abs(visualMotion.current) ? 0.38 : 0.115;
      visualMotion.current += (requestedMotion - visualMotion.current) * motionResponse;
      if (Math.abs(visualMotion.current) < 0.0005) visualMotion.current = 0;

      setPosition(value.current);
      setMotion(visualMotion.current);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [servicesCount]);

  // User control hooks
  const takeControl = useCallback(() => {
    manual.current = true;
    target.current = value.current;
  }, []);

  const moveOne = useCallback(
    (direction) => {
      takeControl();
      target.current = Math.round(target.current) + direction;
    },
    [takeControl]
  );

  // Support horizontal trackpad gestures without trapping natural vertical page scrolling
  const onWheel = useCallback(
    (event) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && Math.abs(event.deltaX) > 8) {
        event.preventDefault();
        const now = performance.now();
        if (now - lastWheel.current < 200) return;
        lastWheel.current = now;
        moveOne(event.deltaX > 0 ? -1 : 1);
      }
    },
    [moveOne]
  );

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  // Pointer drag interactions
  const onPointerDown = (event) => {
    takeControl();
    dragging.current = true;
    dragged.current = false;
    startY.current = event.clientY;
    startValue.current = value.current;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch (e) {
      // Ignored for environments where pointerCapture isn't supported
    }
  };

  const onPointerMove = (event) => {
    if (!dragging.current) return;
    const delta = event.clientY - startY.current;
    if (Math.abs(delta) > 5) dragged.current = true;
    value.current = startValue.current + delta / (stageWidth * 0.35);
    target.current = value.current;
  };

  const onPointerUp = (event) => {
    if (!dragging.current) return;
    dragging.current = false;
    target.current = Math.round(value.current);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch (e) {
      // Ignored
    }
  };

  // Keyboard navigation when user interacts with deck
  const onKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      moveOne(1);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveOne(-1);
    }
  };

  // 25 logical card slots to ensure seamless coverage across all visible angles
  const logicalCards = useMemo(
    () => Array.from({ length: 25 }, (_, index) => index - 10),
    []
  );

  // Determine current active focal card (at slot 2)
  const currentActiveIndex = useMemo(() => {
    const rawIndex = Math.round(2 - position);
    return ((rawIndex % servicesCount) + servicesCount) % servicesCount;
  }, [position, servicesCount]);

  const activeService = SERVICES[currentActiveIndex] || SERVICES[0];

  return (
    <section className="circular-deck-section" id="services-deck" ref={containerRef}>
      {/* Background ambient lighting */}
      <div className="deck-ambient-glow deck-ambient-glow--left" />
      <div className="deck-ambient-glow deck-ambient-glow--right" />

      {/* Section Header */}
      <div className="circular-deck-header reveal-up">
        <div className="circular-deck-badge">
          <span className="circular-deck-badge-dot" />
          <span>Complete Production Disciplines</span>
        </div>
        <h2 className="circular-deck-title">
          Engineered for Scale. <br />
          <span className="gradient-text">Interactive Services Deck</span>
        </h2>
        <p className="circular-deck-subtitle">
          Spin through our 12 production disciplines. Drag up or down, scroll over the deck, or click any card to bring it into focus and explore deliverables.
        </p>
      </div>

      {/* Circular Arc Deck Scene */}
      <div className="circular-deck-scene">
        <div
          ref={stageRef}
          className="circular-deck-stage"
          tabIndex={0}
          role="region"
          aria-label="Interactive services arc deck"
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {logicalCards.map((logical) => {
            const dataIndex = ((logical % servicesCount) + servicesCount) % servicesCount;
            const slot = logical + position;
            const service = SERVICES[dataIndex];
            const config = SERVICE_THEME_CONFIG[service.slug] || SERVICE_THEME_CONFIG['website-development'];

            return (
              <ArcCard
                key={logical}
                service={service}
                config={config}
                slot={slot}
                width={stageWidth}
                motion={motion}
                isHovered={hoveredCard === logical}
                onHoverChange={(hovered) => setHoveredCard(hovered ? logical : null)}
                onChoose={() => {
                  if (!dragged.current) {
                    const diff = 2 - Math.round(slot);
                    if (Math.abs(diff) > 0) {
                      moveOne(diff);
                    } else {
                      // Already center card — navigate to detail
                      router.push(`/services/${service.slug}`);
                    }
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="circular-deck-controls">
        <div className="deck-control-group">
          <button
            type="button"
            className="deck-nav-btn"
            title="Previous Service"
            aria-label="Previous Service"
            onClick={() => moveOne(1)}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            className="deck-nav-btn"
            title="Next Service"
            aria-label="Next Service"
            onClick={() => moveOne(-1)}
          >
            <ChevronRight size={22} />
          </button>

          {/* Active Card Pill Indicator */}
          <div className="deck-active-indicator">
            <span className="deck-active-counter">
              {activeService.num} / {String(servicesCount).padStart(2, '0')}
            </span>
            <span className="deck-active-separator" />
            <span className="deck-active-name">{activeService.title}</span>
          </div>
        </div>

        {/* Tactile Gestures Hint */}
        <div className="deck-hint-pill">
          <MoveVertical size={13} color="#38bdf8" />
          <span>SWIPE / DRAG</span>
          <span className="deck-hint-sep" />
          <span>CLICK TO CENTER</span>
        </div>

        {/* View All Services Link */}
        <Link href="/services" className="deck-view-all-link">
          <span>View All 12 Disciplines</span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
