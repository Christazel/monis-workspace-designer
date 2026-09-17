'use client';

import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';
import { formatIDR, formatUSD } from '@/data/products';

export default function HeroBanner() {
  const { setMode, applyPreset } = useWorkspaceStore();
  const currency = useCurrency();

  const handleBuildClick = () => {
    setMode('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIncludedClick = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const formatPrice = (idr: number) => {
    return currency === 'IDR' ? formatIDR(idr) : formatUSD(idr);
  };

  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-content">
            <h1>A proper desk, in your villa, by this afternoon.</h1>
            <p className="lede">
              Standing desks, ergonomic chairs, dual monitors and the rest of a real workspace, delivered and set up the same day you order, in Canggu, Seminyak, Ubud and Uluwatu. No deposit. Keep it for a day, a week or a month, then we pick it up.
            </p>
            <div className="hero-ctas">
              <button className="btn-primary" type="button" onClick={handleBuildClick}>
                Build your setup
              </button>
              <button className="btn-text" type="button" onClick={handleIncludedClick}>
                See what&apos;s included
              </button>
            </div>
            <div className="hero-trust">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17l-6.1 3.6 1.4-6.8L2.2 9.1l6.9-.8z" />
              </svg>
              Rated 4.9 by over 1,200 renters in Bali
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP — compact badge bar ── */}
      <div className="strip">
        <div className="wrap">
          <div className="strip-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="7" width="15" height="10" />
              <path d="M16 10h4l3 3v4h-7z" />
              <circle cx="6" cy="19" r="1.8" />
              <circle cx="18" cy="19" r="1.8" />
            </svg>
            <span>Same-day delivery</span>
          </div>

          <div className="strip-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a4 4 0 0 1-5.7 5.7L4 17v3h3l5-5a4 4 0 0 1 5.7-5.7z" />
            </svg>
            <span>In-room setup included</span>
          </div>

          <div className="strip-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6z" />
            </svg>
            <span>Zero deposit</span>
          </div>

          <div className="strip-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.4 8.4 0 0 1-8.4 8.4 8.5 8.5 0 0 1-4-1L3 20l1.2-5.6a8.5 8.5 0 0 1-1-4A8.4 8.4 0 0 1 11.6 2 8.4 8.4 0 0 1 21 11.5z" />
            </svg>
            <span>WhatsApp support 7 days</span>
          </div>
        </div>
      </div>

      {/* ── QUICK SETUPS ── */}
      <section className="setups" id="setups" style={{ scrollMarginTop: '80px' }}>
        <div className="wrap">
          <div className="section-head">
            <h2>Three setups people actually rent</h2>
            <p>Each one is a full workspace, ready to load into the builder as a starting point.</p>
          </div>

          <div className="setup-grid">
            {/* Developer Pro */}
            <div className="setup-card">
              <div className="setup-card-top">
                <div className="setup-token">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="14" width="18" height="7" rx="1" />
                    <rect x="7" y="4" width="10" height="8" rx="1" />
                  </svg>
                </div>
                <h3>Developer Pro</h3>
              </div>
              <p className="desc">Standing desk, Aeron chair, and an ultrawide monitor for long coding sessions.</p>
              <div className="setup-card-foot">
                <div className="setup-price">
                  {formatPrice(395000)}
                  <small>per day</small>
                </div>
                <button
                  className="setup-add"
                  type="button"
                  onClick={() => {
                    applyPreset('preset-developer');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Add this setup
                </button>
              </div>
            </div>

            {/* Creator Studio */}
            <div className="setup-card">
              <div className="setup-card-top">
                <div className="setup-token">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <h3>Creator Studio</h3>
              </div>
              <p className="desc">Executive desk, 4K monitor, and a screen light for design and video work.</p>
              <div className="setup-card-foot">
                <div className="setup-price">
                  {formatPrice(460000)}
                  <small>per day</small>
                </div>
                <button
                  className="setup-add"
                  type="button"
                  onClick={() => {
                    applyPreset('preset-creator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Add this setup
                </button>
              </div>
            </div>

            {/* Minimal Nomad */}
            <div className="setup-card">
              <div className="setup-card-top">
                <div className="setup-token">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 20c3-9 7-14 8-14s5 5 8 14" />
                    <path d="M2 20h20" />
                  </svg>
                </div>
                <h3>Minimal Nomad</h3>
              </div>
              <p className="desc">A compact desk and a light chair, perfect for a laptop and coffee.</p>
              <div className="setup-card-foot">
                <div className="setup-price">
                  {formatPrice(310000)}
                  <small>per day</small>
                </div>
                <button
                  className="setup-add"
                  type="button"
                  onClick={() => {
                    applyPreset('preset-nomad');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Add this setup
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
