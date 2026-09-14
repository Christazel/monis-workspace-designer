'use client';

import { useMode } from '@/store/workspaceStore';
import Header from '@/components/layout/Header';
import HeroBanner from '@/components/layout/HeroBanner';
import CatalogSection from '@/components/catalog/CatalogSection';
import BuilderSection from '@/components/builder/BuilderSection';
import CheckoutDrawer from '@/components/checkout/CheckoutDrawer';

export default function Home() {
  const mode = useMode();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Sticky header always visible */}
      <Header />

      <main>
        {/* ── CATALOG MODE ── */}
        {mode === 'catalog' && (
          <>
            <HeroBanner />
            <CatalogSection />
          </>
        )}

        {/* ── BUILDER MODE ── */}
        {mode === 'builder' && <BuilderSection />}
      </main>

      {/* ── CHECKOUT DRAWER (global, overlays everything) ── */}
      <CheckoutDrawer />
    </div>
  );
}
