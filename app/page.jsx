import React from 'react';
import Hero from '../components/Hero';
import EnterpriseTrustStrip from '../components/EnterpriseTrustStrip';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <EnterpriseTrustStrip />
      <Testimonials />
      <ContactForm />
    </main>
  );
}
