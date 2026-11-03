'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 25);

      // Top scroll progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      setScrollProgress(progress);

      // ScrollSpy active link detection
      const sections = [
        'hero',
        'principles',
        'platform',
        'services',
        'capabilities',
        'industries',
        'work',
        'ai-copilot',
        'approach',
        'tour',
        'pricing',
        'about',
        'blog',
        'careers',
        'faq',
        'contact',
      ];
      const scrollPos = scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  const navLinks = [
    { label: 'About', href: '/about', id: 'about' },
    { label: 'Insights', href: '/blog', id: 'blog' },
    { label: 'Careers', href: '/careers', id: 'careers' },
    { label: 'Onboarding', href: '/interview-data', id: 'interview-data' },
    { label: 'Contact', href: '/contact', id: 'contact' },
  ];

  const mobileNavItems = [
    { label: 'Home', href: '/', badge: 'HQ', num: '01' },
    { label: 'Services Suite', href: '/services', badge: '8 Disciplines', num: '02' },
    { label: 'About Coimbatore Studio', href: '/about', badge: 'Team', num: '03' },
    { label: 'Insights & Technical Journal', href: '/blog', badge: 'Engineering', num: '04' },
    { label: 'Careers & Positions', href: '/careers', badge: '5 Open Roles', num: '05' },
    { label: 'Candidate Onboarding', href: '/interview-data', badge: 'Talent Portal', num: '06' },
    { label: 'Contact Us', href: '/contact', badge: 'Free Consultation', num: '07' },
  ];

  return (
    <>
      {/* Top Viewport Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        id="scroll-progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Floating Navigation Dock with Framer Motion Entrance Animation */}
      <motion.header
        className={`nav-wrapper ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -45, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.nav
          className={`nav-dock ${isScrolled ? 'scrolled' : ''}`}
          id="main-nav"
          animate={{
            scale: isScrolled ? 0.97 : 1,
            y: isScrolled ? -1 : 0,
          }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo with Live Status Indicator */}
          <Link href="/" className="nav-brand" aria-label="Nexprobyte Technologies">
            <div className="brand-icon">
              <img
                src="/assets/logo-transparent.png"
                alt="Nexprobyte Logo"
                className="brand-logo-img"
                width={28}
                height={18}
              />
            </div>
            <div className="brand-text-wrapper">
              <span className="brand-title">NEXPROBYTE</span>
              <span className="brand-live-pill">
                <span className="brand-live-pulse"></span>
                <span className="brand-live-core"></span>
                <span className="brand-live-label">Ready 48h</span>
              </span>
            </div>
          </Link>

          {/* Desktop Links with Framer Sliding Hover Pill */}
          <ul className="nav-links" onMouseLeave={() => setHoveredNav(null)}>
            {/* Services Dropdown */}
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
                className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
                onClick={(e) => {
                  if (typeof window !== 'undefined' && window.location.pathname === '/') {
                    setServicesOpen(!servicesOpen);
                  }
                }}
              >
                <span>Services</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  style={{
                    transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
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
                    className="nav-dropdown"
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ padding: '8px 16px 10px', borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: '8px' }}>
                      <Link
                        href="/services"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          color: 'var(--accent-blue)',
                          fontWeight: 600,
                          fontSize: '0.88rem'
                        }}
                        onClick={() => setServicesOpen(false)}
                      >
                        <span>Explore All 8 Production Disciplines</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                    <Link href="/services#service-va" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">Virtual Assistance (10 Services)</div>
                        <div className="dropdown-desc">Executive, Admin, CRM, Real Estate &amp; E-Commerce VAs</div>
                      </div>
                    </Link>

                    <Link href="/services#service-dev" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="16 18 22 12 16 6"></polyline>
                          <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">Software Development (12 Disciplines)</div>
                        <div className="dropdown-desc">Dedicated Full-Stack, Frontend, Mobile, QA &amp; DevOps Teams</div>
                      </div>
                    </Link>

                    <Link href="/services#service-ai" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">AI &amp; Automation VA (12 Disciplines)</div>
                        <div className="dropdown-desc">n8n, Zapier, Make, Chatbots &amp; Multi-Agent Workflows</div>
                      </div>
                    </Link>

                    <Link href="/services#service-support" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 8v4l3 3"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">Web &amp; E-Commerce Support (10 Services)</div>
                        <div className="dropdown-desc">Shopify, WordPress, Speed &amp; 24/7 Security Maintenance</div>
                      </div>
                    </Link>

                    <Link href="/services#service-custom" className="dropdown-item" onClick={() => setServicesOpen(false)}>
                      <div className="dropdown-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                          <path d="M3 9h18"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="dropdown-title">CRM &amp; Custom Software (8 Solutions)</div>
                        <div className="dropdown-desc">Custom ERP, Billing, SaaS Platforms &amp; API Integrations</div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Standard Nav Items */}
            {navLinks.map((link) => (
              <li
                key={link.id}
                className="nav-item"
                onMouseEnter={() => setHoveredNav(link.id)}
              >
                <Link
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.label}
                  {hoveredNav === link.id && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Action */}
          <div className="nav-actions">
            <a href="tel:+919500042426" className="nav-call-btn" title="Call Coimbatore Studio">
              <span>📞 +91 95000 42426</span>
            </a>
            <Link href="/contact" className="nav-cta-btn">
              <span className="cta-shimmer-sweep"></span>
              <span>Consult Architect</span>
              <svg className="cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>

            {/* Saro-style Animated 2-Bar Hamburger Toggle */}
            <button
              type="button"
              className={`nav-hamburger ${drawerOpen ? 'open' : ''}`}
              id="nav-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <span className="ham-line ham-top"></span>
              <span className="ham-line ham-bottom"></span>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Saro Framer-Style Luxurious Frosted Mobile Navigation Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="mobile-drawer saro-mobile-drawer open"
              id="mobile-drawer"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Drawer Top Header */}
              <div className="mobile-drawer-header">
                <Link href="/" className="mobile-drawer-brand" onClick={() => setDrawerOpen(false)}>
                  <div className="brand-icon">
                    <img src="/assets/logo-transparent.png" alt="Nexprobyte Logo" className="brand-logo-img" width={28} height={18} />
                  </div>
                  <div>
                    <div className="drawer-brand-name">NEXPROBYTE</div>
                    <div className="drawer-brand-sub">Coimbatore • Worldwide Delivery</div>
                  </div>
                </Link>
                <button
                  type="button"
                  className="mobile-drawer-close"
                  id="drawer-close"
                  aria-label="Close menu"
                  onClick={() => setDrawerOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Drawer Staggered Nav List */}
              <div className="mobile-drawer-body">
                <ul className="mobile-nav-list">
                  {mobileNavItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.04, duration: 0.3, ease: 'easeOut' }}
                    >
                      <Link
                        href={item.href}
                        className="saro-mobile-nav-link"
                        onClick={() => setDrawerOpen(false)}
                      >
                        <div className="saro-link-left">
                          <span className="saro-link-num">{item.num}</span>
                          <span className="saro-link-title">{item.label}</span>
                        </div>
                        <div className="saro-link-right">
                          <span className="saro-link-pill">{item.badge}</span>
                          <span className="saro-link-arrow">&rarr;</span>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Direct High-Impact CTAs in Mobile Drawer */}
                <div className="mobile-drawer-footer-actions">
                  <Link
                    href="/contact"
                    className="btn-primary-hero mobile-drawer-cta"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span>Consult Lead Architect</span>
                    <span>&rarr;</span>
                  </Link>
                  <a
                    href="tel:+919500042426"
                    className="btn-secondary-hero mobile-drawer-call"
                  >
                    <span>📞 +91 95000 42426</span>
                    <span className="call-hint">Instant Call</span>
                  </a>
                  <div className="drawer-footer-note">
                    <span>📍 Coimbatore, Tamil Nadu, India</span>
                    <span>•</span>
                    <span>48-Hour Sprint Onboarding</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
