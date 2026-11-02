import './globals.css';

export const metadata = {
  title: 'Nexprobyte Technologies | Dedicated Tech Teams, Virtual Assistance & AI Automation',
  description:
    'Nexprobyte Technologies: Unified talent and intelligent automation ecosystem. Dedicated remote developers, executive virtual assistants, AI workflow pipelines, and custom software.',
  icons: {
    icon: '/assets/logo-transparent.png',
    shortcut: '/assets/logo-transparent.png',
    apple: '/assets/logo-transparent.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/assets/logo-transparent.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
