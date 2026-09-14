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
              <h4>Delivery areas</h4>
              <p>Canggu</p>
              <p>Seminyak</p>
            </div>
            <div>
              <h4>&nbsp;</h4>
              <p>Ubud</p>
              <p>Uluwatu</p>
            </div>
            <div>
              <h4>Talk to us</h4>
              <p>WhatsApp, 8am–9pm daily</p>
              <p style={{ color: 'var(--brass)', fontWeight: 600, marginTop: 4 }}>+62 812 3456 7890</p>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 monis.rent — All rights reserved</span>
          <span>Same-day delivery across South Bali (Canggu · Seminyak · Ubud · Uluwatu)</span>
        </div>
      </div>
    </footer>
  );
}
