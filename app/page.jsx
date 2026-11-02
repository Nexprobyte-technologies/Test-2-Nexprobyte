'use client';

import React from 'react';
import Hero from '../components/Hero';
import EnterpriseTrustStrip from '../components/EnterpriseTrustStrip';
import Statement from '../components/Statement';
import BrandMarquee from '../components/BrandMarquee';
import CorePrinciples from '../components/CorePrinciples';
import PlatformOverview from '../components/PlatformOverview';
import AllServices from '../components/AllServices';
import CapabilitiesShowcase from '../components/CapabilitiesShowcase';
import InternationalClients from '../components/InternationalClients';
import Industries from '../components/Industries';
import Methodology from '../components/Methodology';
import AICopilot from '../components/AICopilot';
import EcosystemTour from '../components/EcosystemTour';
import Portfolio from '../components/Portfolio';
import RoiCalculator from '../components/RoiCalculator';
import TalentCardCustomizer from '../components/TalentCardCustomizer';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import AboutStudio from '../components/AboutStudio';
import BlogInsights from '../components/BlogInsights';
import CareersSection from '../components/CareersSection';
import FaqAccordion from '../components/FaqAccordion';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <EnterpriseTrustStrip />
      <Statement />
      <BrandMarquee />
      <CorePrinciples />
      <PlatformOverview />
      <AllServices />
      <CapabilitiesShowcase />
      <InternationalClients />
      <Industries />
      <Methodology />
      <AICopilot />
      <EcosystemTour />
      <Portfolio />
      <RoiCalculator />
      <TalentCardCustomizer />
      <Pricing />
      <Testimonials />
      <AboutStudio />
      <BlogInsights />
      <CareersSection />
      <FaqAccordion />
      <ContactForm />
    </main>
  );
}
