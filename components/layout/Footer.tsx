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

  return (
    <footer
      style={{
        background: '#ffffff',
        borderTop: '1px solid #e5e7eb',
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
            <div
              onClick={() => {
                setMode('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ cursor: 'pointer', marginBottom: '16px' }}
            >
              <MonisLogo width={110} height={31} color="#000000" />
            </div>
            <p
              style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: 1.6,
                maxWidth: '280px',
                marginBottom: '16px',
              }}
            >
              Rent workspace essentials in Bali — monitors, standing desks, ergonomic chairs & tech gear delivered to your villa or coworking space.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#f3f4f6',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#111827',
              }}
            >
              <span style={{ color: '#10b981' }}>★ ★ ★ ★ ★</span>
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
                color: '#111827',
                marginBottom: '14px',
              }}
            >
              Explore
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#4b5563' }}>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('tech')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer' }}
                >
                  Monitors & Displays
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('desk')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer' }}
                >
                  Standing Desks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('chair')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer' }}
                >
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
                  style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer' }}
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
                  style={{ background: 'none', border: 'none', padding: 0, color: '#10b981', fontWeight: 600, cursor: 'pointer' }}
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
                color: '#111827',
                marginBottom: '14px',
              }}
            >
              Delivery Across Bali
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px', color: '#4b5563' }}>
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
            <p style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, marginTop: '8px' }}>
              ✓ Next-day & Same-day delivery available
            </p>
          </div>

          {/* Col 4: WhatsApp Concierge */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#111827',
                marginBottom: '14px',
              }}
            >
              Official Website &amp; Support
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
              Official Bali workspace rental service. Available 8:00 AM – 9:00 PM WITA daily for assistance.
            </p>
            <a
              href="https://www.monis.rent/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: 700,
                color: '#10b981',
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
            borderTop: '1px solid #f3f4f6',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '13px',
            color: '#9ca3af',
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
