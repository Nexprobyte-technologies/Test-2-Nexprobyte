import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { COMPANY_INFO } from '@/data/siteContent';

export const metadata = {
  title: 'Industries — Nexprobyte Technologies | Vertical Enterprise Solutions',
  description:
    'Specialized enterprise technology and operations solutions across Retail, Healthcare, Education, Hospitality, Transport & Logistics, Manufacturing, Real Estate, and Government.',
  keywords:
    'Nexprobyte industries, software solutions for healthcare, retail digital transformation, logistics software, manufacturing ERP, real estate tech, edtech Coimbatore',
};

const INDUSTRIES_PAGE_DATA = [
  {
    id: 'retail',
    name: 'Retail',
    badge: 'High-Conversion Commerce',
    headline: 'Sub-Second Storefronts & Omnichannel POS Architecture',
    desc: 'Empower modern retail and direct-to-consumer brands with ultra-fast headless storefronts, multi-warehouse inventory synchronization, automated checkout pipelines, and WhatsApp customer re-engagement.',
    features: [
      'Headless Shopify & Custom Next.js Storefronts',
      'Multi-Warehouse Inventory & Real-Time Stock Sync',
      'Frictionless UPI, Cards & EMI Payment Gateways',
      'Automated WhatsApp Cart Recovery & Order Tracking',
    ],
    metric: '38% Avg Lift in Mobile Conversion',
    tag: 'Commerce & D2C',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    badge: 'HIPAA & Telehealth Ready',
    headline: 'Intelligent Patient Portals & Clinical Workflow Platforms',
    desc: 'Secure digital infrastructure for hospitals, clinics, and healthtech startups. Streamline appointment scheduling, electronic medical records (EMR) integration, lab telemetry, and HIPAA-compliant patient communication.',
    features: [
      'Telemedicine & Video Consultation Web/Mobile Apps',
      'Automated Patient Appointment & Reminder Engine',
      'Encrypted Health Records & Diagnostic Lab Sync',
      'HIPAA & ISO 27001 Data Security Architecture',
    ],
    metric: '99.99% Secure Uptime & Compliance',
    tag: 'HealthTech & Clinics',
  },
  {
    id: 'education',
    name: 'Education',
    badge: 'Modern EdTech Ecosystems',
    headline: 'Interactive Learning Management & Institutional Portals',
    desc: 'Scalable EdTech platforms, automated grading engines, live classroom infrastructure, and student information systems engineered for universities, coaching academies, and corporate training.',
    features: [
      'Custom LMS & Live Video Streaming Classrooms',
      'Automated Quiz, Exam & Assessment Engines',
      'Fee Collection, Invoicing & Student ERP Sync',
      'Gamified Student Engagement & Progress Dashboards',
    ],
    metric: '100k+ Concurrent Learners Supported',
    tag: 'EdTech & Academies',
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    badge: 'Guest Experience & Booking Engines',
    headline: 'Contactless Guest Systems & Automated Reservation Engines',
    desc: 'Transform hotels, resorts, and restaurant chains with real-time room booking engines, contactless QR digital menus, automated concierge bots, and centralized revenue management.',
    features: [
      'Direct Direct-Booking Engines with Zero Commission',
      'Contactless QR Order & Kitchen Display Systems',
      'Automated Guest Concierge via WhatsApp & SMS',
      'Housekeeping & Facility Management Dashboards',
    ],
    metric: '2.8x Faster Check-In & Table Turns',
    tag: 'Hotels, Resorts & Dining',
  },
  {
    id: 'transport-logistics',
    name: 'Transport & Logistics',
    badge: 'Fleet Telemetry & Supply Chain',
    headline: 'End-to-End Fleet Tracking & Dynamic Dispatch Optimization',
    desc: 'Real-time GPS fleet tracking, automated route dispatching, warehouse inventory management, and digital proof-of-delivery software for 3PL providers, freight forwarders, and logistics operators.',
    features: [
      'Live GPS Tracking & Predictive Route Optimization',
      'Automated E-Way Bill & Dispatch Documentation',
      'Driver Mobile App with Digital Proof-of-Delivery',
      'Warehouse Cargo Ingestion & Barcode/RFID Tracking',
    ],
    metric: '22% Fuel & Route Cost Reduction',
    tag: 'Fleet, Freight & 3PL',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    badge: 'Smart Factory Operations',
    headline: 'Shop Floor Intelligence & Production ERP Integration',
    desc: 'Eliminate fragmented paper logs with connected operator tablets, machine utilization tracking, inventory batch audits, and automated dispatch workflows tailored for precision engineering and factory lines.',
    features: [
      'Batch & Raw Material Traceability (Trace-to-Heat)',
      'Shop Floor Operator Touchscreens & Spindle Logs',
      'Automated Machine Downtime & Maintenance Alerts',
      'Dispatched Goods & GST E-Invoice ERP Automation',
    ],
    metric: '40% Faster Production Cycle Times',
    tag: 'Precision Eng & Factories',
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    badge: 'PropTech & MLS Integration',
    headline: 'Property Showcase Portals & Automated Lead Pipeline CRM',
    desc: 'High-converting property listing engines, 3D interactive virtual tours, automated buyer follow-up bots, and executive virtual assistants to coordinate MLS feeds, site visits, and escrow paperwork.',
    features: [
      'MLS / IDX Feed Auto-Sync & Search Filters',
      'Automated WhatsApp & Email Lead Qualification Bots',
      'Virtual Site Tour & Floorplan Interactive Viewers',
      'Dedicated Real Estate Virtual Assistant Support Pods',
    ],
    metric: '3.4x More Site Visit Bookings',
    tag: 'PropTech & Brokerages',
  },
  {
    id: 'government',
    name: 'Government',
    badge: 'Public Sector & Civic Tech',
    headline: 'Citizen Portals, Grievance Workflows & Secure Public Infrastructure',
    desc: 'High-availability, WCAG-accessible digital portals for public services, automated grievance management, municipal permit applications, and tamper-evident administrative records with strict compliance.',
    features: [
      'WCAG 2.1 AA Compliant Accessible Citizen Portals',
      'Automated Grievance Redressal & SLA Escalations',
      'Multi-Language Citizen Self-Service Dashboards',
      'Role-Based Encrypted Audit Trails & State Cloud Sync',
    ],
    metric: '100% Data Sovereignty & Audit Compliance',
    tag: 'Civic Tech & Public Services',
  },
];

export default function IndustriesPage() {
  return (
    <main className="subpage-main">
      <div className="container" style={{ paddingTop: '20px' }}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Industries' }]} />
      </div>

      <PageHero
        num="03"
        label="Sector Specialization"
        title={['Vertical Solutions Engineered', 'for Industry-Specific Scale']}
        sub="Discover how Nexprobyte delivers specialized software architecture, autonomous AI pipelines, and dedicated domain talent across 8 high-impact global industries."
      />

      {/* Industries Grid */}
      <section className="section wrap" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="container">
          <div className="industry-grid-section stagger-group">
            {INDUSTRIES_PAGE_DATA.map((ind, idx) => (
              <div
                key={idx}
                id={ind.id}
                className="industry-card spotlight-card reveal-up"
              >
                <div>
                  <div className="industry-card-meta">
                    <span className="industry-badge-pill">{ind.badge}</span>
                    <span className="industry-num-label">0{idx + 1}</span>
                  </div>

                  <h3 className="industry-name-title">{ind.name}</h3>
                  <div className="industry-headline-text">{ind.headline}</div>
                  <p className="industry-desc-text">{ind.desc}</p>

                  <div style={{ marginBottom: '20px' }}>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-muted)',
                        marginBottom: '10px',
                      }}
                    >
                      Domain Capabilities:
                    </div>
                    <ul className="industry-features-list">
                      {ind.features.map((feat, fIdx) => (
                        <li key={fIdx} className="industry-feature-item">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--accent-blue)"
                            strokeWidth="2.5"
                            style={{ flexShrink: 0, marginTop: '3px' }}
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="industry-metric-strip">
                  <div>
                    <div className="industry-metric-val">{ind.metric}</div>
                    <div className="industry-tag-lbl">{ind.tag}</div>
                  </div>
                  <Link
                    href="/contact"
                    className="btn-secondary-hero"
                    style={{ height: '38px', padding: '0 16px', fontSize: '0.84rem' }}
                  >
                    <span>Consult &rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Pre-Footer Call to Action */}
      <section className="section wrap" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="about-cta-banner spotlight-card reveal-up" style={{ textAlign: 'center' }}>
            <div className="cta-banner-content" style={{ maxWidth: '640px', margin: '0 auto' }}>
              <span className="badge-tag">Industry Architecture Review</span>
              <h2 className="cta-banner-title">
                Deploying software or operations in your sector?
              </h2>
              <p className="cta-banner-desc">
                Schedule a 30-minute discovery session with our Coimbatore vertical lead to evaluate compliance, system architecture, and talent deployment.
              </p>
              <div className="cta-banner-buttons" style={{ justifyContent: 'center' }}>
                <Link href="/contact" className="btn-primary-hero">
                  Book Industry Discovery Call &rarr;
                </Link>
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="btn-outline-hero">
                  Direct Line: {COMPANY_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
