'use client';

import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';
import { formatIDR, formatUSD } from '@/data/products';
import { PRESETS } from '@/data/presets';

export default function HeroBanner() {
  const { setMode, applyPreset, setCheckoutOpen } = useWorkspaceStore();
  const currency = useCurrency();

  const handleBuildClick = () => {
    setMode('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCatalogClick = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const formatPrice = (idr: number) => {
    return currency === 'IDR' ? formatIDR(idr) : formatUSD(idr);
  };

  return (
    <>
      {/* ── HERO BANNER (Official Monis.rent style) ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
          padding: '54px 0 40px',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div className="wrap">
          <div style={{ maxWidth: '820px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: '#f3f4f6',
                border: '1px solid #e5e7eb',
                fontSize: '12px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  display: 'inline-block',
                }}
              />
              <span>Next-Day & Same-Day Villa Delivery Across Bali</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(32px, 5vw, 54px)',
                lineHeight: 1.15,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#111827',
                marginBottom: '18px',
              }}
            >
              Rent your remote work setup in Bali.
            </h1>

            <p
              style={{
                fontSize: 'clamp(16px, 2vw, 19px)',
                lineHeight: 1.55,
                color: '#4b5563',
                marginBottom: '28px',
                maxWidth: '680px',
              }}
            >
              Monitors, standing desks, ergonomic chairs, gaming gear, and tech equipment — delivered directly to your villa or coworking space. 100% stress-free setup with zero security deposit.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleBuildClick}
                style={{
                  padding: '13px 26px',
                  borderRadius: '9999px',
                  background: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.15s ease, background 0.15s ease',
                }}
              >
                <span>⚡ Open 2D Studio Configurator</span>
              </button>

              <button
                type="button"
                onClick={handleCatalogClick}
                style={{
                  padding: '13px 24px',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  color: '#111827',
                  border: '1px solid #e5e7eb',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                }}
              >
                <span>Browse All Products</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES BAR (Official Monis.rent style) ── */}
      <div
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '14px 0',
        }}
      >
        <div
          className="wrap"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', fontSize: '13px', fontWeight: 500, color: '#374151' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <rect x="1" y="7" width="15" height="10" />
              <path d="M16 10h4l3 3v4h-7z" />
              <circle cx="6" cy="19" r="1.8" />
              <circle cx="18" cy="19" r="1.8" />
            </svg>
            <span>Same-Day Villa Delivery</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', fontSize: '13px', fontWeight: 500, color: '#374151' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M14.7 6.3a4 4 0 0 1-5.7 5.7L4 17v3h3l5-5a4 4 0 0 1 5.7-5.7z" />
            </svg>
            <span>In-Room Assembly & Testing</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', fontSize: '13px', fontWeight: 500, color: '#374151' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Zero Security Deposit</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', fontSize: '13px', fontWeight: 500, color: '#374151' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M21 11.5a8.4 8.4 0 0 1-8.4 8.4 8.5 8.5 0 0 1-4-1L3 20l1.2-5.6a8.5 8.5 0 0 1-1-4A8.4 8.4 0 0 1 11.6 2 8.4 8.4 0 0 1 21 11.5z" />
            </svg>
            <span>WhatsApp Concierge (8am-9pm)</span>
          </div>
        </div>
      </div>

      {/* ── PRODUCT BUNDLES (Official Monis.rent section) ── */}
      <section
        id="setups"
        style={{
          background: '#f9fafb',
          padding: '60px 0 68px',
          borderBottom: '1px solid #e5e7eb',
          scrollMarginTop: '80px',
        }}
      >
        <div className="wrap">
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#6b7280',
                marginBottom: '6px',
              }}
            >
              Curated Workspaces
            </div>
            <h2
              style={{
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 800,
                color: '#111827',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}
            >
              Product Bundles
            </h2>
            <p style={{ fontSize: '15px', color: '#6b7280', maxWidth: '640px' }}>
              Save more with our curated setups — complete workstations with desks, chairs, monitors and accessories in one click.
            </p>
          </div>

          {/* 4 Bundles Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '20px',
            }}
          >
            {PRESETS.map((preset) => {
              const monthlyRate = Math.round((preset.totalPrice * 30 * 0.7) / 30); // 30% monthly discount
              return (
                <article
                  key={preset.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div>
                    {/* Top Tag & Title */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: '#047857',
                          background: '#d1fae5',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                        }}
                      >
                        Curated Bundle
                      </span>
                      <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>
                        Save 30% Monthly
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#111827',
                        marginBottom: '6px',
                      }}
                    >
                      {preset.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '13.5px',
                        lineHeight: 1.45,
                        color: '#4b5563',
                        marginBottom: '18px',
                      }}
                    >
                      {preset.description}
                    </p>

                    {/* Pricing */}
                    <div
                      style={{
                        padding: '14px',
                        borderRadius: '12px',
                        background: '#f9fafb',
                        border: '1px solid #f3f4f6',
                        marginBottom: '20px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <div>
                          <span style={{ fontSize: '20px', fontWeight: 800, color: '#111827' }}>
                            {formatPrice(preset.totalPrice)}
                          </span>
                          <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '4px' }}>/day</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#047857' }}>
                            {formatPrice(monthlyRate)}/day
                          </span>
                          <span style={{ display: 'block', fontSize: '11px', color: '#6b7280' }}>monthly rate</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        applyPreset(preset.id);
                        setMode('builder');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        width: '100%',
                        padding: '11px',
                        borderRadius: '10px',
                        background: '#000000',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <span>⚡ Customize in Studio</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        applyPreset(preset.id);
                        setCheckoutOpen(true);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        background: 'transparent',
                        color: '#374151',
                        border: '1px solid #e5e7eb',
                        fontSize: '13px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>Book on Monis.rent →</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
