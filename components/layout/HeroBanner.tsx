'use client';

import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';
import { PRESETS } from '@/data/presets';
import { formatIDR, formatUSD } from '@/data/products';

const HEADLINE_WORDS = ['perfect', 'focused', 'creative', 'productive'];

export default function HeroBanner() {
  const { setMode, applyPreset } = useWorkspaceStore();
  const currency = useCurrency();

  return (
    <section
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '72px 0 64px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left — Copy */}
          <div>
            {/* Pill badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#fef3c7',
                border: '1px solid #fde68a',
                borderRadius: 99,
                padding: '5px 14px',
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  background: '#f59e0b',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#92400e', letterSpacing: '0.02em' }}>
                Bali Workspace Rental for Remote Workers
              </span>
            </div>

            {/* Heading */}
            <h1
              style={{
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 800,
                color: '#111827',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: 20,
              }}
            >
              Design your{' '}
              <span style={{ color: '#f59e0b' }}>perfect</span>
              <br />
              Bali workspace.
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 17,
                color: '#4b5563',
                lineHeight: 1.65,
                maxWidth: 440,
                marginBottom: 32,
              }}
            >
              Pick a desk, ergonomic chair, monitors, and Bali lifestyle gear.
              See your setup come to life in real-time — then rent it all, delivered
              to your villa.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setMode('builder')}
              >
                Start Building Your Setup
              </button>
              <button
                className="btn btn-outline btn-lg"
                onClick={() => setMode('catalog')}
              >
                Browse Catalog
              </button>
            </div>

            {/* Social proof */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#f59e0b', fontSize: 14 }}>★★★★★</span>
                <span style={{ fontSize: 13, color: '#4b5563', fontWeight: 500 }}>
                  4.9 from 1,200+ rentals
                </span>
              </div>
              <span style={{ color: '#d1d5db' }}>·</span>
              <span style={{ fontSize: 13, color: '#4b5563', fontWeight: 500 }}>
                Same-day delivery in Canggu, Seminyak & Ubud
              </span>
            </div>
          </div>

          {/* Right — Preset Quick Cards */}
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#9ca3af',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Quick Setups — Apply Instantly
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PRESETS.map((preset, i) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  className="preset-card"
                  style={{
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    {/* Icon */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        background: '#f5f5f5',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 22,
                        flexShrink: 0,
                      }}
                    >
                      {preset.icon}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 8,
                          marginBottom: 2,
                        }}
                      >
                        <span
                          style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}
                        >
                          {preset.name}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#111827',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {currency === 'IDR'
                            ? formatIDR(preset.totalPrice)
                            : formatUSD(preset.totalPrice)}
                          <span
                            style={{ fontWeight: 400, color: '#9ca3af', fontSize: 11 }}
                          >
                            /day
                          </span>
                        </span>
                      </div>
                      <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.4 }}>
                        {preset.tagline}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Trust badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                marginTop: 16,
              }}
            >
              {[
                { icon: '🚚', text: 'Free delivery in Bali' },
                { icon: '🔧', text: 'Setup included' },
                { icon: '📦', text: 'Pickup when done' },
                { icon: '💬', text: 'WhatsApp support' },
              ].map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 12px',
                    background: '#f9fafb',
                    borderRadius: 6,
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  <span style={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
