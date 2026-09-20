'use client';

import { useWorkspaceStore } from '@/store/workspaceStore';
import MonisLogo from './MonisLogo';

export default function Footer() {
  const { setMode, setActiveCategory } = useWorkspaceStore();

  const handleCategoryClick = (cat: 'tech' | 'desk' | 'chair' | 'accessory') => {
    setActiveCategory(cat);
    setMode('catalog');
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinkStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    padding: 0,
    color: 'inherit',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    textAlign: 'left',
    transition: 'color 0.15s ease',
  };

  return (
    <footer
      style={{
        background: 'var(--paper)',
        borderTop: '1px solid var(--line)',
        padding: '60px 0 32px',
      }}
    >
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Col 1: Brand */}
          <div>
            <button
              type="button"
              onClick={() => {
                setMode('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                marginBottom: '16px',
                display: 'block',
              }}
              aria-label="Monis rent home"
            >
              <MonisLogo width={110} height={31} color="var(--ink)" />
            </button>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--ink-soft)',
                lineHeight: 1.6,
                maxWidth: '280px',
                marginBottom: '16px',
              }}
            >
              Rent workspace essentials in Bali — monitors, standing desks, ergonomic chairs &amp; tech gear delivered to your villa or coworking space.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--paper-3)',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--ink)',
                border: '1px solid var(--line-soft)',
              }}
            >
              <span style={{ color: 'var(--sage)' }}>★ ★ ★ ★ ★</span>
              <span>4.9 on Trustpilot</span>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--ink)',
                marginBottom: '14px',
              }}
            >
              Explore
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--ink-soft)' }}>
              <li>
                <button type="button" onClick={() => handleCategoryClick('tech')} style={navLinkStyle}>
                  Monitors &amp; Displays
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleCategoryClick('desk')} style={navLinkStyle}>
                  Standing Desks
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleCategoryClick('chair')} style={navLinkStyle}>
                  Ergonomic Chairs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMode('catalog');
                    const el = document.getElementById('setups');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={navLinkStyle}
                >
                  Product Bundles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMode('builder');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ ...navLinkStyle, color: 'var(--sage)', fontWeight: 600 }}
                >
                  ⚡ 2D Studio Configurator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Bali Delivery Hubs */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--ink)',
                marginBottom: '14px',
              }}
            >
              Delivery Across Bali
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px', color: 'var(--ink-soft)' }}>
              <div>
                <p style={{ marginBottom: '8px' }}>Canggu</p>
                <p style={{ marginBottom: '8px' }}>Pererenan</p>
                <p style={{ marginBottom: '8px' }}>Seminyak</p>
              </div>
              <div>
                <p style={{ marginBottom: '8px' }}>Ubud</p>
                <p style={{ marginBottom: '8px' }}>Uluwatu</p>
                <p style={{ marginBottom: '8px' }}>Sanur</p>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--sage)', fontWeight: 600, marginTop: '8px' }}>
              ✓ Next-day &amp; Same-day delivery available
            </p>
          </div>

          {/* Col 4: Support */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--ink)',
                marginBottom: '14px',
              }}
            >
              Official Website &amp; Support
            </div>
            <p style={{ fontSize: '14px', color: 'var(--ink-soft)', marginBottom: '8px' }}>
              Official Bali workspace rental service. Available 8:00 AM – 9:00 PM WITA daily for assistance.
            </p>
            <a
              href="https://www.monis.rent/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit official Monis.rent website (opens in new tab)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--sage)',
                textDecoration: 'none',
                marginTop: '4px',
              }}
            >
              <span>www.monis.rent</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--line-soft)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '13px',
            color: 'var(--ink-soft)',
          }}
        >
          <div>© 2026 monis.rent · Remote work made efficiently</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Bali Delivery Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
