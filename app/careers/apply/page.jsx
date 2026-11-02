'use client';

import React, { Suspense } from 'react';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import JobApplicationForm from '@/components/JobApplicationForm';

export default function JobApplyGeneralPage() {
  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Careers', to: '/careers' },
            { label: 'Job Application' },
          ]}
        />
      </div>

      <PageHero
        num="Career Portal"
        label="Application Intake"
        title={['Engineering &', 'Studio Applications']}
        sub="Submit your portfolio and profile directly to our hiring engineers in Coimbatore. Fast response guaranteed within 48 business hours."
      />

      <section className="section wrap" style={{ paddingTop: '30px' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <Suspense fallback={<div>Loading form...</div>}>
            <JobApplicationForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
