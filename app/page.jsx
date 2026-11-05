import React from 'react';
import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import TechStackMarquee from '../components/TechStackMarquee';
import TrustedRatingsSection from '../components/TrustedRatingsSection';

// Code-split below-the-fold sections with SSR for instant initial launch & fast hydration
const CircularServicesDeck = dynamic(() => import('../components/CircularServicesDeck'), {
  ssr: true,
});
const ScrollStackShowcase = dynamic(() => import('../components/ScrollStackShowcase'), {
  ssr: true,
});
const FeatureCarouselSection = dynamic(() => import('../components/FeatureCarouselSection'), {
  ssr: true,
});
const Testimonials = dynamic(() => import('../components/Testimonials'), {
  ssr: true,
});

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStackMarquee />
      <TrustedRatingsSection />
      <CircularServicesDeck />
      <ScrollStackShowcase />
      <FeatureCarouselSection />
      <Testimonials />
    </main>
  );
}
