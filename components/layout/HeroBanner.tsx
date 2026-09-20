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
      {/* ── HERO BANNER ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%)',
          padding: '54px 0 40px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="wrap">
          <div style={{ maxWidth: '820px' }}>
            {/* Status badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'var(--paper-3)',
                border: '1px solid var(--line)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--ink-soft)',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--brass)',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span>Next-Day &amp; Same-Day Villa Delivery Across Bali</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(32px, 5vw, 54px)',
                lineHeight: 1.15,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--ink)',
                marginBottom: '18px',
              }}
            >
              Rent your remote work setup in Bali.
            </h1>

            <p
              style={{
                fontSize: 'clamp(16px, 2vw, 19px)',
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
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
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  border: 'none',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                  transition: 'transform 0.15s ease, opacity 0.15s ease',
                  fontFamily: 'inherit',
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
                  background: 'var(--paper)',
                  color: 'var(--ink)',
                  border: '1px solid var(--line)',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                  fontFamily: 'inherit',
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

      {/* ── TRUST BADGES BAR ── */}
      <div
        style={{
          background: 'var(--paper)',
          borderBottom: '1px solid var(--line)',
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
            flexWrap: 'wrap',
          }}
        >
          {[
            {
              label: 'Same-Day Villa Delivery',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="7" width="15" height="10" />
                  <path d="M16 10h4l3 3v4h-7z" />
                  <circle cx="6" cy="19" r="1.8" />
                  <circle cx="18" cy="19" r="1.8" />
                </svg>
              ),
            },
            {
              label: 'In-Room Assembly & Testing',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a4 4 0 0 1-5.7 5.7L4 17v3h3l5-5a4 4 0 0 1 5.7-5.7z" />
                </svg>
              ),
            },
            {
              label: 'Zero Security Deposit',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
            },
            {
              label: 'WhatsApp Concierge (8am-9pm)',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.4 8.4 0 0 1-8.4 8.4 8.5 8.5 0 0 1-4-1L3 20l1.2-5.6a8.5 8.5 0 0 1-1-4A8.4 8.4 0 0 1 11.6 2 8.4 8.4 0 0 1 21 11.5z" />
                </svg>
              ),
            },
          ].map(({ label, icon }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--ink-soft)',
              }}
            >
              <span style={{ color: 'var(--brass)', display: 'flex' }}>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCT BUNDLES ── */}
      <section
        id="setups"
        style={{
          background: 'var(--paper-2)',
          padding: '60px 0 68px',
          borderBottom: '1px solid var(--line)',
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
                color: 'var(--ink-soft)',
                marginBottom: '6px',
              }}
            >
              Curated Workspaces
            </div>
            <h2
              style={{
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 800,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}
            >
              Product Bundles
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--ink-soft)', maxWidth: '640px' }}>
              Save more with our curated setups — complete workstations with desks, chairs, monitors and accessories in one click.
            </p>
          </div>

          {/* Bundles Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '20px',
            }}
          >
            {PRESETS.map((preset) => {
              const monthlyRate = Math.round((preset.totalPrice * 30 * 0.7) / 30);
              return (
                <article
                  key={preset.id}
                  style={{
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.2s ease',
                  }}
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
                          color: 'var(--sage)',
                          background: 'rgba(5, 150, 105, 0.1)',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                        }}
                      >
                        Curated Bundle
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--ink-soft)', fontWeight: 600 }}>
                        Save 30% Monthly
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--ink)',
                        marginBottom: '6px',
                      }}
                    >
                      {preset.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '13.5px',
                        lineHeight: 1.45,
                        color: 'var(--ink-soft)',
                        marginBottom: '18px',
                      }}
                    >
                      {preset.description}
                    </p>

                    {/* Pricing */}
                    <div
                      style={{
                        padding: '14px',
                        borderRadius: 'var(--radius)',
                        background: 'var(--paper-2)',
                        border: '1px solid var(--line-soft)',
                        marginBottom: '20px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <div>
                          <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)' }}>
                            {formatPrice(preset.totalPrice)}
                          </span>
                          <span style={{ fontSize: '12px', color: 'var(--ink-soft)', marginLeft: '4px' }}>/day</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sage)' }}>
                            {formatPrice(monthlyRate)}/day
                          </span>
                          <span style={{ display: 'block', fontSize: '11px', color: 'var(--ink-subtle)' }}>monthly rate</span>
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
                      aria-label={`Customize ${preset.name} in 2D studio configurator`}
                      style={{
                        width: '100%',
                        padding: '11px',
                        borderRadius: 'var(--radius)',
                        background: 'var(--ink)',
                        color: 'var(--paper)',
                        border: 'none',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'opacity 0.15s ease',
                        fontFamily: 'inherit',
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
                      aria-label={`Book ${preset.name} on Monis.rent`}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 'var(--radius)',
                        background: 'transparent',
                        color: 'var(--ink-soft)',
                        border: '1px solid var(--line)',
                        fontSize: '13px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.15s ease, color 0.15s ease',
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
