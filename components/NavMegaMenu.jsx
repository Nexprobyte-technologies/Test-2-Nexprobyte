'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable MegaMenu Component for Unified Navigation System (Saro Finance Design System)
 * Used consistently across Services, Products, and Industries dropdowns.
 */
export default function NavMegaMenu({
  isOpen,
  onClose,
  width = '740px',
  columns = [],
  footer,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="nav-megamenu-panel"
          style={{ width, maxWidth: '94vw' }}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="megamenu-body">
            <div
              className="megamenu-grid"
              style={{
                gridTemplateColumns: columns.length > 1 ? `repeat(${columns.length}, 1fr)` : '1fr',
              }}
            >
              {columns.map((col, cIdx) => {
                const badgeColor = col.badgeColor || 'var(--accent-blue)';
                return (
                  <div key={cIdx} className="megamenu-column">
                    <div className="megamenu-col-header">
                      <div>
                        <div className="megamenu-badge-group">
                          <span
                            className="megamenu-badge-dot"
                            style={{
                              background: badgeColor,
                              boxShadow: `0 0 8px ${badgeColor}80`,
                            }}
                          />
                          <span
                            className="megamenu-badge-title"
                            style={{ color: badgeColor }}
                          >
                            {col.title}
                          </span>
                        </div>
                        {col.subtitle && (
                          <span className="megamenu-col-sub">{col.subtitle}</span>
                        )}
                      </div>
                    </div>

                    <div className="megamenu-items-list">
                      {col.items.map((item, iIdx) => (
                        <Link
                          key={iIdx}
                          href={item.href}
                          className="megamenu-item"
                          onClick={() => onClose && onClose()}
                        >
                          <div className="megamenu-item-content">
                            <div className="megamenu-icon-box">{item.icon}</div>
                            <div className="megamenu-item-text">
                              <span className="megamenu-item-title">{item.title}</span>
                              {item.desc && (
                                <span className="megamenu-item-desc">{item.desc}</span>
                              )}
                            </div>
                          </div>
                          <span className="megamenu-item-arrow" aria-hidden="true">
                            &rarr;
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {footer && (
            <div className="megamenu-footer">
              <Link
                href={footer.href}
                className="megamenu-footer-link"
                onClick={() => onClose && onClose()}
              >
                <span>{footer.text}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Nexprobyte Architecture
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

