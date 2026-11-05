'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import NavMegaMenu from './NavMegaMenu';

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
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const closeTimeoutRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let ticking = false;
    let cachedDocHeight =
      typeof document !== 'undefined'
        ? document.documentElement.scrollHeight - window.innerHeight
        : 1000;

    const updateDocHeight = () => {
      cachedDocHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    window.addEventListener('resize', updateDocHeight, { passive: true });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 25) {
        setIsScrolled(false);
      } else {
        const delta = currentScrollY - lastScrollY;
        if (delta > 6 && currentScrollY > 70) {
          setIsScrolled(true);
        } else if (delta < -6) {
          setIsScrolled(false);
        }
      }

      lastScrollY = currentScrollY;

      const progress =
        cachedDocHeight > 0 ? Math.min(Math.max(currentScrollY / cachedDocHeight, 0), 1) : 0;
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
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateDocHeight);
    };
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

  const handleDropdownEnter = (name) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(name);
    setHoveredNav(name);
  };

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredNav(null);
    }, 140);
  };

  const closeDropdownNow = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveDropdown(null);
    setHoveredNav(null);
  };

  // 1. Services Dropdown Data
  const servicesColumns = [
    {
      title: 'Information Technology',
      subtitle: 'Software, Web & Mobile Engineering',
      badgeColor: 'var(--accent-blue)',
      items: [
        {
          title: 'Dedicated Dev Teams',
          desc: 'Full-Stack, React, Node & Python',
          href: '/services/dedicated-developers',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          ),
        },
        {
          title: 'Custom Software & ERP',
          desc: 'SaaS, Business Dashboards & APIs',
          href: '/services/custom-software',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          ),
        },
        {
          title: 'Website Development',
          desc: 'Next.js, High Conversion & Speed',
          href: '/services/website-development',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          ),
        },
        {
          title: 'Mobile App Development',
          desc: 'Flutter, React Native, iOS & Android',
          href: '/services/mobile-app-development',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          ),
        },
        {
          title: 'AI & Workflow Automation',
          desc: 'Autonomous Agents, n8n & Copilots',
          href: '/services/ai-automation',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2l2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6L12 2z" />
            </svg>
          ),
        },
        {
          title: 'UI/UX Design & Branding',
          desc: 'Figma Design Systems & Identity',
          href: '/services/ui-ux-design',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ),
        },
      ],
    },
    {
      title: 'Virtual Assistant',
      subtitle: 'Operations, Support & Dedicated Talent',
      badgeColor: 'var(--accent-purple)',
      items: [
        {
          title: 'Virtual Administrative Assistant',
          desc: 'Executive Calendar, Travel & Admin',
          href: '/services/virtual-assistance',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          ),
        },
        {
          title: 'Customer & Live Chat Support',
          desc: '24/7 Omnichannel Helpdesk & Tickets',
          href: '/services#service-va',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          ),
        },
        {
          title: 'E-Commerce Store Management',
          desc: 'Shopify, Amazon & Product Catalog',
          href: '/services#service-va',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          ),
        },
        {
          title: 'CRM & Pipeline Management',
          desc: 'HubSpot, Zoho, Salesforce & Pipeline',
          href: '/services#service-va',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          ),
        },
        {
          title: 'Lead Gen & Market Research',
          desc: 'Prospect Lists & B2B Appointments',
          href: '/services#service-va',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          ),
        },
        {
          title: 'Real Estate Virtual Assistance',
          desc: 'MLS Data, Listings & Follow-Ups',
          href: '/services#service-va',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          ),
        },
      ],
    },
  ];

  // 2. Products Dropdown Data
  const productsColumns = [
    {
      title: 'Cloud & AI Platforms',
      subtitle: 'Proprietary Enterprise Infrastructure',
      badgeColor: 'var(--accent-blue)',
      items: [
        {
          title: 'GO Drive',
          desc: 'Enterprise Cloud Storage & Document Sync Engine',
          href: '/products#go-drive',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
          ),
        },
        {
          title: 'Nexi AI Copilot',
          desc: 'Autonomous Enterprise Support & Sales Agent',
          href: '/products#nexi-ai-copilot',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2l2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6L12 2z" />
            </svg>
          ),
        },
      ],
    },
    {
      title: 'Enterprise Systems',
      subtitle: 'Business Operating Systems',
      badgeColor: 'var(--accent-green)',
      items: [
        {
          title: 'Nexprobyte Cloud ERP',
          desc: 'Modular Business Management & Billing Suite',
          href: '/products#nexprobyte-cloud-erp',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          ),
        },
        {
          title: 'NexApp Framework',
          desc: 'Cross-Platform Mobile Acceleration Engine',
          href: '/products#nexapp-framework',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          ),
        },
      ],
    },
  ];

  // 3. Industries Dropdown Data
  const industriesColumns = [
    {
      title: 'Commerce & Services',
      subtitle: 'Consumer & Institutional Verticals',
      badgeColor: 'var(--accent-blue)',
      items: [
        {
          title: 'Retail',
          desc: 'Sub-Second Storefronts & Omnichannel POS',
          href: '/industries#retail',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          ),
        },
        {
          title: 'Healthcare',
          desc: 'Patient Portals & Telehealth Ready',
          href: '/industries#healthcare',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          ),
        },
        {
          title: 'Education',
          desc: 'Interactive LMS & Institutional Portals',
          href: '/industries#education',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          ),
        },
        {
          title: 'Hospitality',
          desc: 'Contactless Guest & Booking Engines',
          href: '/industries#hospitality',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          ),
        },
      ],
    },
    {
      title: 'Logistics & Enterprise',
      subtitle: 'Industrial & Public Infrastructure',
      badgeColor: 'var(--accent-orange)',
      items: [
        {
          title: 'Transport & Logistics',
          desc: 'Fleet Telemetry & Supply Chain Automation',
          href: '/industries#transport-logistics',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          ),
        },
        {
          title: 'Manufacturing',
          desc: 'Shop Floor Intelligence & Production ERP',
          href: '/industries#manufacturing',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4H2z" />
            </svg>
          ),
        },
        {
          title: 'Real Estate',
          desc: 'Property Showcase Portals & Lead CRM',
          href: '/industries#real-estate',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 21h18" />
              <path d="M19 21v-8a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v8" />
              <path d="M9 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16" />
            </svg>
          ),
        },
        {
          title: 'Government',
          desc: 'Citizen Portals & Civic Infrastructure',
          href: '/industries#government',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          ),
        },
      ],
    },
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
        <nav className={`nav-dock ${isScrolled ? 'scrolled' : ''}`} id="main-nav">
          {/* 1. Brand Logo & Title */}
          <Link href="/" className="nav-brand" aria-label="Nexprobyte Technologies" onClick={closeDropdownNow}>
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

          {/* 2. Middle Navigation Links */}
          <div className="nav-links-container">
            <ul className="nav-links" onMouseLeave={handleDropdownLeave}>
              {/* Home */}
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${pathname === '/' ? 'active-nav-link' : ''}`}
                  onMouseEnter={() => {
                    closeDropdownNow();
                    setHoveredNav('home');
                  }}
                  onClick={closeDropdownNow}
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

              {/* Company */}
              <li className="nav-item">
                <Link
                  href="/company"
                  className={`nav-link ${pathname?.startsWith('/company') || pathname?.startsWith('/about') ? 'active-nav-link' : ''}`}
                  onMouseEnter={() => {
                    closeDropdownNow();
                    setHoveredNav('company');
                  }}
                  onClick={closeDropdownNow}
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

              {/* Services (Unified MegaMenu) */}
              <li
                className="nav-item"
                style={{ position: 'relative' }}
                onMouseEnter={() => handleDropdownEnter('services')}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href="/services"
                  className={`nav-link ${pathname?.startsWith('/services') ? 'active-nav-link' : ''}`}
                  onClick={() => {
                    if (pathname === '/services') {
                      setActiveDropdown(activeDropdown === 'services' ? null : 'services');
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
                      transform: activeDropdown === 'services' ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginLeft: 3,
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

                <NavMegaMenu
                  isOpen={activeDropdown === 'services'}
                  onClose={closeDropdownNow}
                  width="760px"
                  columns={servicesColumns}
                  footer={{
                    text: 'View all 12 Engineering & Operations Disciplines',
                    href: '/services',
                  }}
                />
              </li>

              {/* Products (Unified MegaMenu) */}
              <li
                className="nav-item"
                style={{ position: 'relative' }}
                onMouseEnter={() => handleDropdownEnter('products')}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href="/products"
                  className={`nav-link ${pathname?.startsWith('/products') ? 'active-nav-link' : ''}`}
                  onClick={() => {
                    if (pathname === '/products') {
                      setActiveDropdown(activeDropdown === 'products' ? null : 'products');
                    }
                  }}
                >
                  <NavRollText text="Products" />
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    style={{
                      transform: activeDropdown === 'products' ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginLeft: 3,
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {hoveredNav === 'products' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>

                <NavMegaMenu
                  isOpen={activeDropdown === 'products'}
                  onClose={closeDropdownNow}
                  width="680px"
                  columns={productsColumns}
                  footer={{
                    text: 'Explore all Proprietary Cloud & AI Platforms',
                    href: '/products',
                  }}
                />
              </li>

              {/* Industries (Unified MegaMenu) */}
              <li
                className="nav-item"
                style={{ position: 'relative' }}
                onMouseEnter={() => handleDropdownEnter('industries')}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href="/industries"
                  className={`nav-link ${pathname?.startsWith('/industries') ? 'active-nav-link' : ''}`}
                  onClick={() => {
                    if (pathname === '/industries') {
                      setActiveDropdown(activeDropdown === 'industries' ? null : 'industries');
                    }
                  }}
                >
                  <NavRollText text="Industries" />
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    style={{
                      transform: activeDropdown === 'industries' ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginLeft: 3,
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {hoveredNav === 'industries' && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="nav-hover-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>

                <NavMegaMenu
                  isOpen={activeDropdown === 'industries'}
                  onClose={closeDropdownNow}
                  width="720px"
                  columns={industriesColumns}
                  footer={{
                    text: 'Explore all 8 Specialized Industry Deployments',
                    href: '/industries',
                  }}
                />
              </li>

              {/* Contact */}
              <li className="nav-item">
                <Link
                  href="/contact"
                  className={`nav-link ${pathname?.startsWith('/contact') ? 'active-nav-link' : ''}`}
                  onMouseEnter={() => {
                    closeDropdownNow();
                    setHoveredNav('contact');
                  }}
                  onClick={closeDropdownNow}
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
            <MagneticButton strength={12}>
              <Link href="/contact" className="nav-cta-btn" onClick={closeDropdownNow}>
                <span className="cta-shimmer-sweep" />
                <NavRollText text="Get a Quote" className="nav-roll-cta" />
                <svg
                  className="cta-arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </MagneticButton>

            {/* Mobile Hamburger */}
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
                    <img
                      src="/images/nxtpro-logo.png"
                      alt="Nexprobyte Logo"
                      className="brand-logo-img"
                      width={28}
                      height={18}
                    />
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
                  <Link
                    href="/"
                    className={`drawer-link-item ${pathname === '/' ? 'active' : ''}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <NavRollText text="Home" />
                    <span className="drawer-link-num">01</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/company"
                    className={`drawer-link-item ${pathname?.startsWith('/company') || pathname?.startsWith('/about') ? 'active' : ''}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <NavRollText text="Company" />
                    <span className="drawer-link-num">02</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className={`drawer-link-item ${pathname?.startsWith('/services') ? 'active' : ''}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <NavRollText text="Services" />
                    <span className="drawer-link-num">03</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className={`drawer-link-item ${pathname?.startsWith('/products') ? 'active' : ''}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <NavRollText text="Products" />
                    <span className="drawer-link-num">04</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/industries"
                    className={`drawer-link-item ${pathname?.startsWith('/industries') ? 'active' : ''}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <NavRollText text="Industries" />
                    <span className="drawer-link-num">05</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`drawer-link-item ${pathname?.startsWith('/contact') ? 'active' : ''}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <NavRollText text="Contact" />
                    <span className="drawer-link-num">06</span>
                  </Link>
                </li>
              </ul>

              {/* Direct Studio Contact Cards inside drawer */}
              <div className="mobile-drawer-contact-strip">
                <a
                  href="mailto:info@nexprobyte.com"
                  className="drawer-contact-card"
                  onClick={() => setDrawerOpen(false)}
                >
                  <div className="drawer-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2.2">
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2.2">
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
