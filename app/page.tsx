'use client';

import { useMode } from '@/store/workspaceStore';
import Header from '@/components/layout/Header';
import HeroBanner from '@/components/layout/HeroBanner';
import HowItWorks from '@/components/layout/HowItWorks';
import CatalogSection from '@/components/catalog/CatalogSection';
import BuilderSection from '@/components/builder/BuilderSection';
import CheckoutDrawer from '@/components/checkout/CheckoutDrawer';
import Footer from '@/components/layout/Footer';

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
