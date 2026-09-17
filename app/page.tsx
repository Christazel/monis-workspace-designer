'use client';

import dynamic from 'next/dynamic';
import { useMode } from '@/store/workspaceStore';
import Header from '@/components/layout/Header';
import HeroBanner from '@/components/layout/HeroBanner';
import HowItWorks from '@/components/layout/HowItWorks';
import CatalogSection from '@/components/catalog/CatalogSection';
import Footer from '@/components/layout/Footer';

const BuilderSection = dynamic(() => import('@/components/builder/BuilderSection'), {
  ssr: false,
});
const CheckoutDrawer = dynamic(() => import('@/components/checkout/CheckoutDrawer'), {
  ssr: false,
});

export default function Home() {
  const mode = useMode();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Sticky header always visible */}
      <Header />

      <main>
        {/* ── CATALOG MODE ── */}
        {mode === 'catalog' && (
          <>
            <HeroBanner />
            <HowItWorks />
            <CatalogSection />
            <Footer />
          </>
        )}

        {/* ── BUILDER MODE ── */}
        {mode === 'builder' && <BuilderSection />}
      </main>

      {/* ── CHECKOUT DRAWER ── */}
      <CheckoutDrawer />
    </div>
  );
}
