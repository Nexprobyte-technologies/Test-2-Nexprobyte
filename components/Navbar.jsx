'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always normal near top of page
      if (currentScrollY <= 25) {
        setIsScrolled(false);
      } else {
        const delta = currentScrollY - lastScrollY;
        if (delta > 6 && currentScrollY > 70) {
          // Scrolling down -> minimize header
          setIsScrolled(true);
        } else if (delta < -6) {
          // Scrolling UP -> restore header to normal!
          setIsScrolled(false);
        }
      }

      lastScrollY = currentScrollY;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(currentScrollY / docHeight, 0), 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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

  const whatWeDoServices = [
    {
      title: 'All Services',
      href: '/services',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    {
      title: 'Website Development',
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
      href: '/services/mobile-app-development',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      )
    },
    {
      title: 'Application Development',
      href: '/services/application-development',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      )
    },
    {
      title: 'UI/UX Design',
      href: '/services/ui-ux-design',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      )
    },
    {
      title: 'Branding & Identity',
      href: '/services/branding-identity',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    {
      title: 'Digital Marketing & SEO',
      href: '/services/digital-marketing',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    }
  ];

  const whatWeDoProducts = [
    {
      title: 'GO Drive',
      href: '/services#products',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <polyline points="12 13 12 19" />
          <polyline points="9 16 12 19 15 16" />
        </svg>
      )
    },
    {
      title: 'Download Android App',
      href: 'https://play.google.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )
    },
    {
      title: 'Visit Site',
      href: '/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      )
    }
  ];

  const resourcesCareers = [
    {
      title: 'Explore Opportunities',
      desc: 'Open tech roles & engineering positions',
      href: '/careers',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: 'Apply for a Role',
      desc: 'Join our Coimbatore digital team',
      href: '/careers/apply',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    {
      title: 'Collect Interview Data',
      desc: 'Submit your details for an interview slot',
      href: '/interview-data',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    }
  ];

  const resourcesBlog = [
    {
      title: 'Tech & Case Studies',
      desc: 'Articles, insights & industry stories',
      href: '/blog',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    },
    {
      title: 'Digital Trends',
      desc: 'SEO, AI & Modern Web Development',
      href: '/blog',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
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
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Floating Navigation Dock */}
      <motion.header
        className={`nav-wrapper ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -45, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className={`nav-dock ${isScrolled ? 'scrolled' : ''}`}
          id="main-nav"
        >
          {/* 1. Brand: Logo & Company Name */}
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
                  <span>Home</span>
                  {hoveredNav === 'home' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              </li>

              {/* About */}
              <li className="nav-item">
                <Link
                  href="/about"
                  className="nav-link"
                  onMouseEnter={() => setHoveredNav('about')}
                >
                  <span>About</span>
                  {hoveredNav === 'about' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              </li>

              {/* What We Do Dropdown */}
              <li
                className="nav-item"
                onMouseEnter={() => {
                  setWhatWeDoOpen(true);
                  setResourcesOpen(false);
                  setHoveredNav('what-we-do');
                }}
                onMouseLeave={() => setWhatWeDoOpen(false)}
              >
                <Link
                  href="/services"
                  className="nav-link"
                  onClick={(e) => {
                    if (typeof window !== 'undefined' && window.location.pathname === '/') {
                      setWhatWeDoOpen(!whatWeDoOpen);
                    }
                  }}
                >
                  <span>What We Do</span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    style={{
                      transform: whatWeDoOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      marginLeft: 3
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {hoveredNav === 'what-we-do' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {whatWeDoOpen && (
                    <motion.div
                      className="nav-dropdown nav-dropdown-split"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="dropdown-split-container">
                        {/* Col 1: SERVICES */}
                        <div className="dropdown-split-col">
                          <div className="dropdown-col-heading">SERVICES</div>
                          <div className="dropdown-items-stack">
                            {whatWeDoServices.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="dropdown-item-row"
                                onClick={() => setWhatWeDoOpen(false)}
                              >
                                <div className="dropdown-item-left">
                                  <div className="dropdown-item-icon-box">{item.icon}</div>
                                  <span className="dropdown-item-title">{item.title}</span>
                                </div>
                                <span className="dropdown-item-arrow">→</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Col 2: OUR PRODUCTS */}
                        <div className="dropdown-split-col dropdown-split-col-secondary">
                          <div className="dropdown-col-heading">OUR PRODUCTS</div>
                          <div className="dropdown-items-stack">
                            {whatWeDoProducts.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="dropdown-item-row"
                                onClick={() => setWhatWeDoOpen(false)}
                              >
                                <div className="dropdown-item-left">
                                  <div className="dropdown-item-icon-box">{item.icon}</div>
                                  <span className="dropdown-item-title">{item.title}</span>
                                </div>
                                <span className="dropdown-item-arrow">→</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* Resources Dropdown */}
              <li
                className="nav-item"
                onMouseEnter={() => {
                  setResourcesOpen(true);
                  setWhatWeDoOpen(false);
                  setHoveredNav('resources');
                }}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <Link
                  href="/blog"
                  className="nav-link"
                  onClick={(e) => {
                    if (typeof window !== 'undefined' && window.location.pathname === '/') {
                      setResourcesOpen(!resourcesOpen);
                    }
                  }}
                >
                  <span>Resources</span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    style={{
                      transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      marginLeft: 3
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {hoveredNav === 'resources' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {resourcesOpen && (
                    <motion.div
                      className="nav-dropdown nav-dropdown-split nav-dropdown-resources"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="dropdown-split-container">
                        {/* Col 1: CAREERS */}
                        <div className="dropdown-split-col">
                          <div className="dropdown-col-heading">CAREERS</div>
                          <div className="dropdown-items-stack">
                            {resourcesCareers.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="dropdown-item-row has-desc"
                                onClick={() => setResourcesOpen(false)}
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

                        {/* Col 2: BLOG & INSIGHTS */}
                        <div className="dropdown-split-col dropdown-split-col-secondary">
                          <div className="dropdown-col-heading">BLOG &amp; INSIGHTS</div>
                          <div className="dropdown-items-stack">
                            {resourcesBlog.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="dropdown-item-row has-desc"
                                onClick={() => setResourcesOpen(false)}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* Contact */}
              <li className="nav-item">
                <Link
                  href="/contact"
                  className="nav-link"
                  onMouseEnter={() => setHoveredNav('contact')}
                >
                  <span>Contact</span>
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
            {/* Direct Contact Bar (Hidden when scrolled) */}
            <div className="nav-contact-bar">
              <a
                href="mailto:info@nexprobyte.com"
                className="nav-contact-link"
                title="Send official inquiry email"
              >
                info@nexprobyte.com
              </a>
              <span className="nav-contact-sep">|</span>
              <a
                href="tel:+919500042426"
                className="nav-contact-link"
                title="Direct telephone to Coimbatore studio"
              >
                +91 95000 42426
              </a>
            </div>

            {/* Always visible Primary CTA: Get a Quote */}
            <Link href="/contact" className="nav-cta-btn">
              <span className="cta-shimmer-sweep" />
              <span>Get a Quote</span>
              <svg className="cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            {/* Mobile Hamburger (Only on mobile) */}
            <button
              type="button"
              className={`nav-hamburger ${drawerOpen ? 'open' : ''}`}
              id="nav-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <span className="ham-line ham-top" />
              <span className="ham-line ham-bottom" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Luxurious Frosted Mobile Navigation Drawer */}
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
                    <img src="/assets/logo-transparent.png" alt="Nexprobyte Logo" className="brand-logo-img" width={28} height={18} />
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

              <div className="mobile-drawer-contact-strip">
                <a href="mailto:info@nexprobyte.com" title="Email Nexprobyte">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span>info@nexprobyte.com</span>
                </a>
                <a href="tel:+919500042426" title="Call Nexprobyte">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="2.2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>+91 95000 42426</span>
                </a>
              </div>

              <ul className="drawer-links-list">
                <li>
                  <Link href="/" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <span>Home</span>
                    <span className="drawer-link-num">01</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <span>About Studio</span>
                    <span className="drawer-link-num">02</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <span>What We Do (Services)</span>
                    <span className="drawer-link-num">03</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <span>Resources &amp; Journal</span>
                    <span className="drawer-link-num">04</span>
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <span>Careers</span>
                    <span className="drawer-link-num">05</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="drawer-link-item" onClick={() => setDrawerOpen(false)}>
                    <span>Contact</span>
                    <span className="drawer-link-num">06</span>
                  </Link>
                </li>
              </ul>

              <div className="drawer-cta-wrap">
                <Link
                  href="/contact"
                  className="btn-primary-hero"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setDrawerOpen(false)}
                >
                  Get a Quote &rarr;
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
