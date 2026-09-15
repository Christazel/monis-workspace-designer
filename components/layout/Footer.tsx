'use client';

import { useWorkspaceStore } from '@/store/workspaceStore';

export default function Footer() {
  const { setMode } = useWorkspaceStore();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div
              className="logo"
              onClick={() => {
                setMode('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              monis<span>.rent</span>
            </div>
            <p>Workspace furniture and tech, rented by the day, delivered to villas across South Bali.</p>
          </div>
          <div className="areas">
            <div>
              <p className="footer-title">Delivery areas</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 20px' }}>
                <div>
                  <p>Canggu</p>
                  <p>Seminyak</p>
                </div>
                <div>
                  <p>Ubud</p>
                  <p>Uluwatu</p>
                </div>
              </div>
            </div>
            <div>
              <p className="footer-title">Talk to us</p>
              <p>WhatsApp, 8am to 9pm daily</p>
              <p style={{ color: 'var(--brass)', fontWeight: 600, marginTop: 4 }}>+62 812 3456 7890</p>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 monis.rent · All rights reserved</span>
          <span>Same-day delivery across South Bali (Canggu · Seminyak · Ubud · Uluwatu)</span>
        </div>
      </div>
    </footer>
  );
}
