'use client';

import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Statement from '../components/Statement';
import BrandMarquee from '../components/BrandMarquee';
import PlatformOverview from '../components/PlatformOverview';
import AllServices from '../components/AllServices';
import AICopilot from '../components/AICopilot';
import EcosystemTour from '../components/EcosystemTour';
import RoiCalculator from '../components/RoiCalculator';
import TalentCardCustomizer from '../components/TalentCardCustomizer';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FaqAccordion from '../components/FaqAccordion';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    // Reveal animation observer on scroll
    const reveals = document.querySelectorAll('.reveal, .reveal-up, .reveal-scale, .reveal-fade');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.08 }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <Statement />
      <BrandMarquee />
      <PlatformOverview />
      <AllServices />
      <AICopilot />
      <EcosystemTour />
      <RoiCalculator />
      <TalentCardCustomizer />
      <Pricing />
      <Testimonials />
      <FaqAccordion />
      <ContactForm />
      <Footer />
    </main>
  );
}
