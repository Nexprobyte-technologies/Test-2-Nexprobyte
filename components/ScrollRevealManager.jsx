'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Reveal Animations Observer
    const reveals = document.querySelectorAll(
      '.reveal, .reveal-up, .reveal-scale, .reveal-fade'
    );

    if (reveals.length > 0) {
      if (!('IntersectionObserver' in window)) {
        reveals.forEach((el) => el.classList.add('is-revealed'));
      } else {
        const observer = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
        );

        reveals.forEach((el) => {
          const rect = el.getBoundingClientRect();
          // Reveal immediately if already in viewport
          if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
            el.classList.add('is-revealed');
          } else {
            observer.observe(el);
          }
        });

        // Safety fallback: ensure any element not yet revealed after 1.2s gets revealed
        const timer = setTimeout(() => {
          reveals.forEach((el) => el.classList.add('is-revealed'));
        }, 1200);

        return () => {
          observer.disconnect();
          clearTimeout(timer);
        };
      }
    }
  }, [pathname]);

  useEffect(() => {
    // 2. Spotlight Card Cursor Glow Tracker
    const cards = document.querySelectorAll(
      '.spotlight-card, .platform-card, .service-card, .pricing-card, .feature-folder-card'
    );

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMouseMove, { passive: true });
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove);
      });
    };
  }, [pathname]);

  return null;
}

