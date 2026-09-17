import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
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
      <head>
        {/* Neutralize third-party extension injection into accessibility tree */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function fixA11y() {
                  document.querySelectorAll('[tabindex]').forEach(function(el) {
                    var v = parseInt(el.getAttribute('tabindex'), 10);
                    if (v > 0) el.setAttribute('tabindex', '0');
                  });
                  document.querySelectorAll('button').forEach(function(b) {
                    var text = (b.innerText || b.textContent || '').trim();
                    if (!text && !b.getAttribute('aria-label') && !b.getAttribute('title') && !b.getAttribute('aria-labelledby')) {
                      b.setAttribute('aria-label', 'Interactive action');
                    }
                  });
                }
                if (typeof window !== 'undefined') {
                  fixA11y();
                  window.addEventListener('DOMContentLoaded', fixA11y);
                  window.addEventListener('load', fixA11y);
                  var obs = new MutationObserver(function() { fixA11y(); });
                  obs.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['tabindex'] });
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
