import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'monis.rent · Bali workspace rentals',
  description:
    'Standing desks, ergonomic chairs, dual monitors and the rest of a real workspace, delivered and set up the same day you order, in Canggu, Seminyak, Ubud and Uluwatu. No deposit.',
  keywords: [
    'workspace rental Bali',
    'coworking Bali',
    'desk rental Canggu',
    'digital nomad Bali',
    'ergonomic chair rental',
    'monis rent',
    'workspace configurator',
  ],
  openGraph: {
    title: 'monis.rent · Bali workspace rentals',
    description: 'A proper desk, in your villa, by this afternoon. Same-day delivery across South Bali.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
