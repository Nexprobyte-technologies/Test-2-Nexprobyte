'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './ProcessFlow.css';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Blueprint',
    desc: 'Deconstructing business objectives, tech debt, and workflow bottlenecks into an actionable architectural blueprint.',
  },
  {
    step: '02',
    title: 'UI/UX & Prototyping',
    desc: 'Interactive design systems, component libraries, and ergonomic user flows calibrated for frictionless conversion.',
  },
  {
    step: '03',
    title: 'Production Engineering',
    desc: 'Type-safe full-stack code, resilient APIs, and modular microservices engineered for high concurrency.',
  },
  {
    step: '04',
    title: 'Rigorous QA & Audit',
    desc: 'Multi-tier automated test suites, penetration testing, performance benchmarks, and strict security compliance.',
  },
  {
    step: '05',
    title: 'Deployment & Scale',
    desc: 'Zero-downtime CI/CD deployment to global edge infrastructure, with real-time observability and 99.98% SLAs.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ProcessFlow() {
  return (
    <section className="process-flow-section" id="methodology-flow" aria-label="Our Engineering Lifecycle">
      <div className="process-flow-container">
        {/* Header matching Nexprobyte modern tech badge aesthetic */}
        <div className="process-flow-header">
          <div className="process-flow-badge">
            <span className="process-flow-dash" />
            <span className="process-flow-eyebrow">OUR DELIVERY LIFECYCLE</span>
          </div>
          <h2 className="process-flow-title">
            From Strategic Blueprint to <span className="gradient-text">Enterprise Scale</span>
          </h2>
          <p className="process-flow-subtitle">
            A disciplined, 5-stage engineering lifecycle engineered to eliminate scope creep and deliver production-grade software on schedule.
          </p>
        </div>

        {/* 5-Step Process Cards Grid */}
        <motion.div
          className="process-flow-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PROCESS_STEPS.map((item) => (
            <motion.div key={item.step} className="process-card" variants={cardVariants}>
              <span className="process-card-step">{item.step}</span>
              <h3 className="process-card-title">{item.title}</h3>
              <p className="process-card-desc">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

