import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

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
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
