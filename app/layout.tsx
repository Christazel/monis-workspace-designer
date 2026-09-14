import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Monis Workspace Builder — Design Your Bali Workspace Setup',
  description:
    'Design your perfect Bali workspace rental. Pick a desk, ergonomic chair, monitors, and lifestyle gear. See it all come to life in real-time, then book instantly.',
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
    title: 'Monis Workspace Builder',
    description: 'Design your perfect Bali workspace setup and rent instantly.',
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
      <body className="font-[var(--font-inter)] antialiased bg-[#f5f5f5] text-[#111827] min-h-screen">
        {children}
      </body>
    </html>
  );
}
