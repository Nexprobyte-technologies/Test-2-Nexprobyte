import React from 'react';
import Hero from '../components/Hero';
import EnterpriseTrustStrip from '../components/EnterpriseTrustStrip';
import Statement from '../components/Statement';
import BrandMarquee from '../components/BrandMarquee';
import PlatformOverview from '../components/PlatformOverview';
import AllServices from '../components/AllServices';
import EcosystemTour from '../components/EcosystemTour';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import InternationalClients from '../components/InternationalClients';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <EnterpriseTrustStrip />
      <Statement />
      <BrandMarquee />
      <PlatformOverview />
      <AllServices />
      <EcosystemTour />
      <Pricing />
      <Testimonials />
      <InternationalClients />
      <ContactForm />
    </main>
  );
}
