import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Monis Workspace Designer — Build Your Perfect Setup',
  description:
    'Design your dream Bali workspace rental. Pick your desk, chair, accessories, and lifestyle extras. Real-time visual preview. Book in seconds.',
  keywords: ['workspace rental', 'Bali coworking', 'desk rental', 'Monis', 'workspace designer'],
  openGraph: {
    title: 'Monis Workspace Designer',
    description: 'Design your perfect workspace setup in Bali',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-[var(--font-inter)] antialiased bg-slate-950 text-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
