'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

function NavRollText({ text, className = '' }) {
  return (
    <span className={`nav-roll ${className}`.trim()}>
      <span className="nav-roll-label">{text}</span>
      <span className="nav-roll-label nav-roll-hover" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const progressBarRef = useRef(null);

  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always normal near top of page
      if (currentScrollY <= 25) {
        setIsScrolled((prev) => (prev ? false : prev));
      } else {
        const delta = currentScrollY - lastScrollY;
        if (delta > 6 && currentScrollY > 70) {
          // Scrolling down -> minimize header
          setIsScrolled((prev) => (!prev ? true : prev));
        } else if (delta < -6) {
          // Scrolling UP -> restore header to normal!
          setIsScrolled((prev) => (prev ? false : prev));
        }
      }

      lastScrollY = currentScrollY;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(currentScrollY / docHeight, 0), 1) : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // Pillar 1: Information Technology (IT) Services
  const servicesIT = [
    {
      title: 'Dedicated Dev Teams',
      desc: 'Full-Stack, React, Node & Python',
      href: '/services/dedicated-developers',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    {
      title: 'Custom Software & ERP',
      desc: 'SaaS, Business Dashboards & APIs',
      href: '/services/custom-software',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
    {
      title: 'Website Development',
      desc: 'Next.js, High Conversion & Speed',
      href: '/services/website-development',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      title: 'Mobile App Development',
      desc: 'Flutter, React Native, iOS & Android',
      href: '/services/mobile-app-development',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      )
    },
    {
      title: 'AI & Workflow Automation',
      desc: 'Autonomous Agents, n8n & Copilots',
      href: '/services/ai-automation',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <path d="M12 2l2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6L12 2z" />
        </svg>
      )
    },
    {
      title: 'UI/UX Design & Branding',
      desc: 'Figma Design Systems & Identity',
      href: '/services/ui-ux-design',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    }
  ];

  // Pillar 2: Virtual Assistant (VA) Services
  const servicesVA = [
    {
      title: 'Virtual Administrative Assistant',
      desc: 'Executive Calendar, Travel & Admin',
      href: '/services/virtual-assistance',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: 'Customer & Live Chat Support',
      desc: '24/7 Omnichannel Helpdesk & Tickets',
      href: '/services#service-va',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    {
      title: 'E-Commerce Store Management',
      desc: 'Shopify, Amazon & Product Catalog',
      href: '/services#service-va',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      )
    },
    {
      title: 'CRM & Pipeline Management',
      desc: 'HubSpot, Zoho, Salesforce & Pipeline',
      href: '/services#service-va',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: 'Lead Gen & Market Research',
      desc: 'Prospect Lists & B2B Appointments',
      href: '/services#service-va',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      )
    },
    {
      title: 'Real Estate Virtual Assistance',
      desc: 'MLS Data, Listings & Follow-Ups',
      href: '/services#service-va',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Top Viewport Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        id="scroll-progress"
        aria-hidden="true"
        ref={progressBarRef}
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Floating Navigation Dock */}
      <header className={`nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <nav
          className={`nav-dock ${isScrolled ? 'scrolled' : ''}`}
          id="main-nav"
        >
          {/* 1. Brand: Logo & Company Name */}
          <Link href="/" className="nav-brand" aria-label="Nexprobyte Technologies">
            <div className="brand-icon">
              <img
                src="/images/nxtpro-logo.png"
                alt="Nexprobyte Logo"
                className="brand-logo-img"
                width={28}
                height={18}
              />
            </div>
            <span className="brand-title">NEXPROBYTE</span>
          </Link>

          {/* 2. Middle Navigation Links (Collapsed when scrolled) */}
          <div className="nav-links-container">
            <ul className="nav-links" onMouseLeave={() => setHoveredNav(null)}>
              {/* Home */}
              <li className="nav-item">
                <Link
                  href="/"
                  className="nav-link"
                  onMouseEnter={() => setHoveredNav('home')}
                >
                  <NavRollText text="Home" />
                  {hoveredNav === 'home' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              </li>

              {/* Company (Replaced About) */}
              <li className="nav-item">
                <Link
                  href="/company"
                  className="nav-link"
                  onMouseEnter={() => setHoveredNav('company')}
                >
                  <NavRollText text="Company" />
                  {hoveredNav === 'company' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              </li>

              {/* Services Dropdown (Information Technology & Virtual Assistant) */}
              <li
                className="nav-item"
                onMouseEnter={() => {
                  setServicesOpen(true);
                  setHoveredNav('services');
                }}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href="/services"
                  className="nav-link"
                  onClick={(e) => {
                    if (typeof window !== 'undefined' && window.location.pathname === '/') {
                      setServicesOpen(!servicesOpen);
                    }
                  }}
                >
                  <NavRollText text="Services" />
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    style={{
                      transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginLeft: 3
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {hoveredNav === 'services' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      className="nav-dropdown nav-dropdown-split"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      style={{ minWidth: '720px' }}
                    >
                      <div className="dropdown-split-container" style={{ gridTemplateColumns: '1.15fr 1fr' }}>
                        {/* Col 1: Information Technology */}
                        <div className="dropdown-split-col">
                          <div className="dropdown-col-heading" style={{ color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="badge-dot" style={{ background: 'var(--accent-blue)', width: 6, height: 6 }} />
                            <span>INFORMATION TECHNOLOGY</span>
                          </div>
                          <div className="dropdown-items-stack">
                            {servicesIT.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="dropdown-item-row has-desc"
                                onClick={() => setServicesOpen(false)}
                              >
                                <div className="dropdown-item-left">
                                  <div className="dropdown-item-icon-box">{item.icon}</div>
                                  <div>
                                    <span className="dropdown-item-title">{item.title}</span>
                                    <span className="dropdown-item-desc">{item.desc}</span>
                                  </div>
                                </div>
                                <span className="dropdown-item-arrow">→</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Col 2: Virtual Assistant */}
                        <div className="dropdown-split-col dropdown-split-col-secondary">
                          <div className="dropdown-col-heading" style={{ color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="badge-dot" style={{ background: 'var(--accent-purple)', width: 6, height: 6 }} />
                            <span>VIRTUAL ASSISTANT</span>
                          </div>
                          <div className="dropdown-items-stack">
                            {servicesVA.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="dropdown-item-row has-desc"
                                onClick={() => setServicesOpen(false)}
                              >
                                <div className="dropdown-item-left">
                                  <div className="dropdown-item-icon-box">{item.icon}</div>
                                  <div>
                                    <span className="dropdown-item-title">{item.title}</span>
                                    <span className="dropdown-item-desc">{item.desc}</span>
                                  </div>
                                </div>
                                <span className="dropdown-item-arrow">→</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Bottom Navigation Bar */}
                      <div
                        style={{
                          marginTop: '16px',
                          paddingTop: '12px',
                          borderTop: '1px solid #edf2f7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.82rem'
                        }}
                      >
                        <span style={{ color: 'var(--text-secondary)' }}>
                          5 Core Pillars • 52 Verified Enterprise Services
                        </span>
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          style={{
                            color: 'var(--accent-blue)',
                            fontWeight: 700,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>Explore All 52 Services &rarr;</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* Products (New Top-Level Header Item) */}
              <li className="nav-item">
                <Link
                  href="/products"
                  className="nav-link"
                  onMouseEnter={() => setHoveredNav('products')}
                >
                  <NavRollText text="Products" />
                  {hoveredNav === 'products' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              </li>

              {/* Careers */}
              <li className="nav-item">
                <Link
                  href="/careers"
                  className="nav-link"
                  onMouseEnter={() => setHoveredNav('careers')}
                >
                  <NavRollText text="Careers" />
                  {hoveredNav === 'careers' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              </li>

              {/* Contact */}
              <li className="nav-item">
                <Link
                  href="/contact"
                  className="nav-link"
                  onMouseEnter={() => setHoveredNav('contact')}
                >
                  <NavRollText text="Contact" />
                  {hoveredNav === 'contact' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Right Action Area */}
          <div className="nav-actions">
            {/* Primary CTA on desktop */}
            <Link href="/contact" className="nav-cta-btn">
              <span className="cta-shimmer-sweep" />
              <NavRollText text="Get a Quote" className="nav-roll-cta" />
              <svg className="cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            {/* Mobile Hamburger (Standard 3-Line Menu, easy tap) */}
            <button
              type="button"
              className={`nav-hamburger ${drawerOpen ? 'open' : ''}`}
              id="nav-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <span className="ham-line ham-1" />
              <span className="ham-line ham-2" />
              <span className="ham-line ham-3" />
            </button>
          </div>
        </nav>
      </header>

      {/* Clean Brand Frosted Mobile Navigation Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="mobile-drawer saro-mobile-drawer open"
              id="mobile-drawer"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mobile-drawer-header">
                <Link href="/" className="mobile-drawer-brand" onClick={() => setDrawerOpen(false)}>
                  <div className="brand-icon">
                    <img src="/images/nxtpro-logo.png" alt="Nexprobyte Logo" className="brand-logo-img" width={28} height={18} />
                  </div>
                  <div>
                    <div className="drawer-brand-name">NEXPROBYTE</div>
                    <div className="drawer-brand-sub">Coimbatore • Global Delivery</div>
                  </div>
                </Link>
                <button
                  type="button"
                  className="mobile-drawer-close"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <ul className="drawer-links-list">
                <li>
                  <Link href="/" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <NavRollText text="Home" />
                    <span className="drawer-link-num">01</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <NavRollText text="About Studio" />
                    <span className="drawer-link-num">02</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <NavRollText text="What We Do (Services)" />
                    <span className="drawer-link-num">03</span>
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <NavRollText text="Our Products" />
                    <span className="drawer-link-num">04</span>
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <NavRollText text="Careers" />
                    <span className="drawer-link-num">05</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <NavRollText text="Blog & Insights" />
                    <span className="drawer-link-num">06</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <NavRollText text="Contact" />
                    <span className="drawer-link-num">07</span>
                  </Link>
                </li>
              </ul>

              {/* Direct Studio Contact Cards inside drawer (Phone & Email inside 3-bar) */}
              <div className="mobile-drawer-contact-strip">
                <a
                  href="mailto:info@nexprobyte.com"
                  className="drawer-contact-card"
                  onClick={() => setDrawerOpen(false)}
                >
                  <div className="drawer-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="drawer-contact-info">
                    <span className="drawer-contact-label">Email Us</span>
                    <span className="drawer-contact-val">info@nexprobyte.com</span>
                  </div>
                  <span className="drawer-contact-arrow">&rarr;</span>
                </a>

                <a
                  href="tel:+919500042426"
                  className="drawer-contact-card"
                  onClick={() => setDrawerOpen(false)}
                >
                  <div className="drawer-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="drawer-contact-info">
                    <span className="drawer-contact-label">Call Coimbatore Studio</span>
                    <span className="drawer-contact-val">+91 95000 42426</span>
                  </div>
                  <span className="drawer-contact-arrow">&rarr;</span>
                </a>
              </div>

              <div className="drawer-cta-wrap">
                <Link
                  href="/contact"
                  className="btn-primary-hero mobile-drawer-cta-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setDrawerOpen(false)}
                >
                  Get a Free Quote &rarr;
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
