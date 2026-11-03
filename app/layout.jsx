import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NexiChatbot from '@/components/NexiChatbot';
import FloatingCallButton from '@/components/FloatingCallButton';
import ScrollRevealManager from '@/components/ScrollRevealManager';

export const metadata = {
  metadataBase: new URL('https://nexprobyte.com'),
  title: 'Nexprobyte Technologies — Digital Marketing & Software Company in Coimbatore',
  description:
    'Nexprobyte Technologies is a leading digital marketing agency and software development company in Coimbatore. We offer web development, SEO, social media marketing, app development, dedicated tech teams & AI automation to help businesses grow online. Get a free consultation.',
  keywords:
    'digital marketing agency Coimbatore, software company Coimbatore, web development company Coimbatore, SEO services Coimbatore, digital marketing services Tamil Nadu, software development company Coimbatore, app development Coimbatore, social media marketing Coimbatore, backlink building services, link building agency, website development company Coimbatore, Nexprobyte Technologies',
  authors: [{ name: 'Nexprobyte Technologies' }],
  creator: 'Nexprobyte Technologies',
  publisher: 'Nexprobyte Technologies',
  robots: 'index, follow, max-image-preview:large',
  icons: {
    icon: '/assets/logo-transparent.png',
    shortcut: '/assets/logo-transparent.png',
    apple: '/assets/logo-transparent.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Nexprobyte Technologies',
    title: 'Nexprobyte — Digital Marketing & Software Company in Coimbatore',
    description:
      'Digital marketing agency & software development company in Coimbatore. Web development, SEO, social media marketing, app development & AI automation. Get a free consultation.',
    url: 'https://nexprobyte.com/',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexprobyte Technologies Coimbatore',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexprobyte — Digital Marketing & Software Company in Coimbatore',
    description:
      'Digital marketing agency & software company in Coimbatore. Web development, SEO, social media marketing, app development & AI automation.',
    images: ['/images/hero.jpg'],
  },
  other: {
    'geo.region': 'IN-TN',
    'geo.placename': 'Coimbatore',
    'geo.position': '10.9994;76.9687',
    ICBM: '10.9994, 76.9687',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#12385F',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Nexprobyte Technologies',
  alternateName: 'Nexprobyte',
  url: 'https://nexprobyte.com/',
  logo: 'https://nexprobyte.com/images/nxtpro-logo.png',
  image: 'https://nexprobyte.com/images/hero.jpg',
  description:
    'Digital marketing agency and software development company in Coimbatore offering web development, SEO, social media marketing, app development and AI automation.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1st Floor, Nanjiammal Complex, Above City Bakery, Maniyakarampalayam',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    postalCode: '641006',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 10.9994,
    longitude: 76.9687,
  },
  telephone: '+919500042426',
  email: 'info@nexprobyte.com',
  priceRange: '₹₹',
  openingHours: 'Mo-Sa 09:00-19:00',
  sameAs: ['https://www.linkedin.com/in/nextprobytetechnologies'],
  areaServed: ['Coimbatore', 'Tamil Nadu', 'India', 'USA', 'UK', 'UAE', 'Qatar'],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Services' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Marketing' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Application Development' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Virtual Assistance' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI & Automation Pipelines' } },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/assets/logo-transparent.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <ScrollRevealManager />
        <Navbar />
        {children}
        <Footer />
        <NexiChatbot />
        <FloatingCallButton />
      </body>
    </html>
  );
}
