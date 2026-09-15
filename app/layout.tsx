import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

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
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
