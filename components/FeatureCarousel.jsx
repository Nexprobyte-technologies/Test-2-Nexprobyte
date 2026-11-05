'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Bot,
  Zap,
  Cpu,
  Layers,
  Headphones,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import './FeatureCarousel.css';

// Nexprobyte Technologies Official Enterprise Capabilities
export const NEXPROBYTE_FEATURES = [
  {
    id: 'engineering',
    label: 'Dedicated Dev Pods',
    icon: Code2,
    image: '/images/portfolio-1.jpg',
    description: 'Vetted Senior React, Next.js, and Node engineers deployed into your sprint cycles in 48 hours.',
  },
  {
    id: 'ai-agents',
    label: 'Autonomous AI Workflows',
    icon: Bot,
    image: '/images/new-ai.jpg',
    description: 'Custom n8n and LLM agents automating lead qualification, CRM synchronization, and reporting 24/7.',
  },
  {
    id: 'mobile-eng',
    label: 'Mobile App Engineering',
    icon: Zap,
    image: '/images/srv-mobile.jpg',
    description: 'Native iOS, Android, and cross-platform Flutter applications engineered for 60fps fluidity.',
  },
  {
    id: 'cloud-scale',
    label: 'Cloud & DevOps Architecture',
    icon: Cpu,
    image: '/images/new-automation.jpg',
    description: 'Automated CI/CD pipelines, containerized clusters, and 99.98% high-availability SLA.',
  },
  {
    id: 'enterprise-erp',
    label: 'Custom Enterprise SaaS',
    icon: Layers,
    image: '/images/new-software.jpg',
    description: 'Multi-tenant database architectures, automated billing, and role-based access control.',
  },
  {
    id: 'virtual-ops',
    label: 'Executive Assistants',
    icon: Headphones,
    image: '/images/about-workspace.jpg',
    description: 'SOP-trained remote executive assistants saving leadership 25+ hours each week.',
  },
  {
    id: 'security-soc2',
    label: 'Enterprise Security',
    icon: ShieldCheck,
    image: '/images/cyber-marketing.jpg',
    description: 'Bank-grade AES-256 encryption, role permissions, and SOC2 compliant data governance.',
  },
  {
    id: 'smart-automation',
    label: 'Automated Operations',
    icon: Workflow,
    image: '/images/srv-app.jpg',
    description: 'Eliminate manual bottlenecks with end-to-end webhook architecture and multi-system synchronization.',
  },
];

const AUTO_PLAY_INTERVAL = 3200;
const ITEM_HEIGHT = 68;

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function FeatureCarousel({
  features = NEXPROBYTE_FEATURES,
  autoPlayInterval = AUTO_PLAY_INTERVAL,
}) {
  const featureList = features && features.length > 0 ? features : NEXPROBYTE_FEATURES;
  const containerRef = useRef(null);
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const currentIndex =
    ((step % featureList.length) + featureList.length) % featureList.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index) => {
    const diff = (index - currentIndex + featureList.length) % featureList.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '80px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isInView) return;
    const interval = setInterval(nextStep, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, isInView, autoPlayInterval]);

  const getCardStatus = (index) => {
    const diff = index - currentIndex;
    const len = featureList.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return 'active';
    if (normalizedDiff === -1) return 'prev';
    if (normalizedDiff === 1) return 'next';
    return 'hidden';
  };

  return (
    <div ref={containerRef} className="fc-wrapper">
      <div className="fc-shell">
        {/* Left vertical scrolling ticker */}
        <div className="fc-left-panel">
          <div className="fc-left-fade-top" />
          <div className="fc-left-fade-bottom" />

          <div className="fc-ticker-container">
            {featureList.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(featureList.length / 2),
                featureList.length / 2,
                distance
              );

              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: 'fit-content',
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="fc-chip-slot"
                >
                  <button
                    type="button"
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={`fc-chip-btn ${isActive ? 'is-active' : ''}`}
                    aria-label={`Select ${feature.label}`}
                  >
                    <div className="fc-chip-icon">
                      {Icon && <Icon size={18} strokeWidth={2.2} />}
                    </div>

                    <span className="fc-chip-label">{feature.label}</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right 3D stacked cards */}
        <div className="fc-right-panel">
          <div className="fc-stage-box">
            {featureList.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === 'active';
              const isPrev = status === 'prev';
              const isNext = status === 'next';

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className={`fc-card ${isActive ? 'is-active' : ''}`}
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className="fc-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/images/portfolio-1.jpg';
                    }}
                  />

                  {/* Pulsing Live indicator */}
                  <div
                    className="fc-live-badge"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <div className="fc-live-dot" />
                    <span className="fc-live-text">Live Discipline</span>
                  </div>

                  {/* Bottom description banner */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fc-card-bottom"
                      >
                        <div className="fc-badge-pill">
                          0{index + 1} • {feature.label}
                        </div>
                        <p className="fc-card-desc">{feature.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
