'use client';

import React from 'react';
import './TechStackMarquee.css';

const TECH_ITEMS = [
  {
    name: 'React',
    color: '#00d8ff',
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
        <g stroke="#00d8ff" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    color: '#000000',
    icon: (
      <svg viewBox="0 0 180 180" fill="none">
        <mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
          <circle cx="90" cy="90" fill="#000000" r="90" />
        </mask>
        <g mask="url(#mask0_next)">
          <circle cx="90" cy="90" data-framer-name="background" fill="#000000" r="90" />
          <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="url(#paint0_linear_next)" />
          <rect fill="url(#paint1_linear_next)" height="72" width="12" x="115" y="54" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_next" x1="109" x2="144.5" y1="116.5" y2="160.5">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_next" x1="121" x2="120.799" y1="54" y2="106.875">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Flutter',
    color: '#02569B',
    icon: (
      <svg viewBox="0 0 166 202" fill="none">
        <path d="M103.545 0L0 103.545L31.7828 135.328L166.428 0H103.545Z" fill="#42A5F5" />
        <path d="M103.175 101.405L50.5186 154.062L82.3013 186.079L166.059 101.405H103.175Z" fill="#02569B" />
        <path d="M82.3013 186.079L103.175 201.761L166.059 201.761L114.284 154.062L82.3013 186.079Z" fill="#0175C2" />
        <path d="M50.5186 154.062L82.3013 186.079L114.284 154.062L82.3013 122.045L50.5186 154.062Z" fill="#29B6F6" />
      </svg>
    ),
  },
  {
    name: 'Laravel',
    color: '#FF2D20',
    icon: (
      <svg viewBox="0 0 24 24" fill="#FF2D20">
        <path d="M8.2 2.5L2 6.1v11.8l6.2 3.6 6.2-3.6V6.1L8.2 2.5zm4.8 14.7l-4.8 2.8-4.8-2.8V7.8l4.8-2.8 4.8 2.8v9.4z" />
        <path d="M15.8 7.3l-1.4.8 3.8 2.2-3.8 2.2 1.4.8 5.2-3-5.2-3z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    color: '#539E43',
    icon: (
      <svg viewBox="0 0 24 24" fill="#539E43">
        <path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2zm0 2.3L4.5 8.6v6.8L12 19.7l7.5-4.3V8.6L12 4.3zm-1 3.7h2v6h-2V8zm0 7h2v2h-2v-2z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    color: '#336791',
    icon: (
      <svg viewBox="0 0 24 24" fill="#336791">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c2.76 0 5 2.24 5 5 0 1.66-.81 3.13-2.05 4.05L16 18h-2.5l-.75-2.5H11.25L10.5 18H8l1.05-3.95C7.81 13.13 7 11.66 7 10c0-2.76 2.24-5 5-5zm0 2c-1.66 0-3 1.34-3 3 0 .96.45 1.82 1.15 2.38l.6.48-.45 1.64h3.4l-.45-1.64.6-.48C14.55 11.82 15 10.96 15 10c0-1.66-1.34-3-3-3z" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    color: '#FF9900',
    icon: (
      <svg viewBox="0 0 24 24" fill="#FF9900">
        <path d="M18.8 13.6c-1.3 1.4-3.5 2.4-6.8 2.4-4.5 0-7.8-1.8-9.9-4.2-.4-.5 0-1 .5-.7 2.3 1.3 5.3 2.1 8.9 2.1 3 0 5.4-.7 7-1.7.5-.3.9.4.3.9zM19.3 11.8c.4-.5 1.5-1.5 2.4-1.7.4-.1.7.2.5.6-.4.9-1.3 2.1-2.1 2.8-.3.3-.7.1-.6-.3l-.2-1.4z" />
        <path d="M8.2 8.5c-.2-.9-.8-1.5-1.8-1.5-1.1 0-1.8.8-1.8 1.8 0 1.2.7 1.8 1.9 1.8.7 0 1.3-.2 1.7-.5v-1.6zm2 2.7c-.5.4-1.4.7-2.3.7-2.3 0-3.7-1.4-3.7-3.6 0-2.1 1.6-3.6 3.8-3.6 1.8 0 2.7.9 3.1 1.8l-1.6.8c-.2-.5-.7-.9-1.5-.9-1.1 0-1.8.8-1.8 1.9 0 1.2.7 1.9 1.8 1.9.7 0 1.3-.3 1.6-.7l.6 1.7z" />
      </svg>
    ),
  },
  {
    name: 'Azure',
    color: '#0089D6',
    icon: (
      <svg viewBox="0 0 24 24" fill="#0089D6">
        <path d="M13.05 4.24l-6.4 12.38 5.76 3.14 8.59-15.52h-7.95zm-2.1 1.24L3 17.62l4.63 2.14 4.56-8.88-1.24-5.4z" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    color: '#2496ED',
    icon: (
      <svg viewBox="0 0 24 24" fill="#2496ED">
        <path d="M22.5 10.5c-.3-1.6-1.5-2.2-2.1-2.3-.2-.5-.7-1.4-1.8-1.9-.3-.1-.6-.2-.9-.2l-.4.3c-.6.4-.9 1.1-.9 1.8-.7.1-1.8.4-2.5 1.2-.2-.1-.5-.2-.8-.2h-8.8v6.5c0 2.2 1.4 4.3 3.9 5.3 4.2 1.6 9.4.5 11.7-2.8 1.4-2 1.8-4.4 1.7-7.7h.9zm-10.2 1.2H10v-1.8h2.3v1.8zm0-2.6H10V7.3h2.3v1.8zm3.2 2.6h-2.3v-1.8h2.3v1.8zm0-2.6h-2.3V7.3h2.3v1.8zm3.2 2.6h-2.3v-1.8h2.3v1.8zm-9.6 0H6.8v-1.8h2.3v1.8zm0-2.6H6.8V7.3h2.3v1.8zm-3.2 2.6H3.6v-1.8h2.3v1.8zm0-2.6H3.6V7.3h2.3v1.8z" />
      </svg>
    ),
  },
  {
    name: 'Kubernetes',
    color: '#326CE5',
    icon: (
      <svg viewBox="0 0 24 24" fill="#326CE5">
        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.3L5.34 8.15v7.7L12 19.7l6.66-3.85v-7.7L12 4.3zm0 3.2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
      </svg>
    ),
  },
  {
    name: 'Python',
    color: '#3776AB',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M11.9 2c-3.1 0-5 .7-5 2.8v2.2h5v.8H4.7c-2 0-3.7 1.4-3.7 3.8s1.6 3.6 3.7 3.6h1.2v-1.7c0-1.7 1.5-3.1 3.2-3.1h4.9c1.4 0 2.5-1.1 2.5-2.5V4.8C16.5 2.7 14.7 2 11.9 2zm-1.4 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" fill="#3776AB" />
        <path d="M12.1 22c3.1 0 5-.7 5-2.8v-2.2h-5v-.8h7.2c2 0 3.7-1.4 3.7-3.8s-1.6-3.6-3.7-3.6h-1.2v1.7c0 1.7-1.5 3.1-3.2 3.1H9.9c-1.4 0-2.5 1.1-2.5 2.5v3.1c0 2.1 1.8 2.8 4.7 2.8zm1.4-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#FFD438" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    icon: (
      <svg viewBox="0 0 24 24" fill="#3178C6">
        <path d="M3 3h18v18H3V3zm8.7 13.5v-6h-2v-.9h5v.9h-2v6h-1zm3.8 0c.9.5 2 .7 3.1.7 1.5 0 2.4-.7 2.4-1.8 0-1-.7-1.5-2-2-.9-.3-1.4-.7-1.4-1.2 0-.6.5-1.1 1.4-1.1.8 0 1.5.3 2 .7l.5-.8c-.6-.5-1.4-.8-2.5-.8-1.4 0-2.3.8-2.3 1.9 0 1 .7 1.5 1.9 1.9.9.3 1.5.7 1.5 1.3 0 .7-.6 1.1-1.6 1.1-.9 0-1.8-.4-2.4-.9l-.6.9z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    color: '#06B6D4',
    icon: (
      <svg viewBox="0 0 24 24" fill="#06B6D4">
        <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2.1-1.3 3.3-1.1 1 .2 1.8 1 2.6 1.8C14.7 11.6 16.2 13 19.5 13c2.4 0 3.9-1.2 4.5-3.6-1 .9-2.1 1.3-3.3 1.1-1-.2-1.8-1-2.6-1.8C16.8 7.4 15.3 6 12 6zm-7.5 7c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2.1-1.3 3.3-1.1 1 .2 1.8 1 2.6 1.8C7.2 18.6 8.7 20 12 20c2.4 0 3.9-1.2 4.5-3.6-1 .9-2.1 1.3-3.3 1.1-1-.2-1.8-1-2.6-1.8C9.3 14.4 7.8 13 4.5 13z" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    color: '#47A248',
    icon: (
      <svg viewBox="0 0 24 24" fill="#47A248">
        <path d="M12 2C11.5 3 7 7.5 7 13c0 3.2 2 6 5 7.8v-7.3c0-.3.2-.5.5-.5s.5.2.5.5v7.3c3-1.8 5-4.6 5-7.8 0-5.5-4.5-10-5-11z" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    color: '#F24E1E',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M8 2h4v4H8a2 2 0 1 1 0-4z" fill="#F24E1E" />
        <path d="M12 2h4a2 2 0 0 1 0 4h-4V2z" fill="#FF7262" />
        <path d="M8 6h4v4H8a2 2 0 1 1 0-4z" fill="#A259FF" />
        <path d="M12 6h4a2 2 0 1 1 0 4h-4V6z" fill="#1ABCFE" />
        <path d="M8 10h4v2a2 2 0 1 1-4 0v-2z" fill="#0ACF83" />
      </svg>
    ),
  },
  {
    name: 'n8n Workflow',
    color: '#EA4B71',
    icon: (
      <svg viewBox="0 0 24 24" fill="#EA4B71">
        <path d="M6 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm12 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-6 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        <path d="M8.5 10h7M8.5 11.5l2.5 3.5M15.5 11.5L13 15" stroke="#EA4B71" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function TechStackMarquee() {
  return (
    <section className="tech-marquee-section" aria-label="Built With Modern Technology">
      {/* Header matching the uploaded design */}
      <div className="tech-marquee-header">
        <span className="tech-marquee-dash" aria-hidden="true" />
        <h3 className="tech-marquee-title">BUILT WITH MODERN TECHNOLOGY</h3>
      </div>

      {/* Viewport with left & right smooth gradient fades */}
      <div className="tech-marquee-viewport">
        <div className="tech-marquee-fade-left" aria-hidden="true" />
        <div className="tech-marquee-fade-right" aria-hidden="true" />

        <div className="tech-marquee-track">
          {/* First Group */}
          <div className="tech-marquee-group">
            {TECH_ITEMS.map((item, idx) => (
              <div key={`tech-1-${idx}`} className="tech-pill">
                <span className="tech-pill-icon">{item.icon}</span>
                <span className="tech-pill-name">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Second Duplicate Group for 100% Seamless Infinite Loop */}
          <div className="tech-marquee-group" aria-hidden="true">
            {TECH_ITEMS.map((item, idx) => (
              <div key={`tech-2-${idx}`} className="tech-pill">
                <span className="tech-pill-icon">{item.icon}</span>
                <span className="tech-pill-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
