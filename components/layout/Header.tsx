'use client';

import { useState, useRef, useEffect } from 'react';
import { useWorkspaceStore } from '@/store/workspaceStore';

type NavItem = 'catalog' | 'setups' | 'builder' | 'how-it-works';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const { mode, setMode, currency, setCurrency, setCheckoutOpen } = useWorkspaceStore();
  const { desk, chair, tech, accessories } = useWorkspaceStore();

  const [activeNav, setActiveNav] = useState<NavItem>('catalog');
  const isClickingRef = useRef(false);

  const totalCount = (desk ? 1 : 0) + (chair ? 1 : 0) + tech.length + accessories.length;

  useEffect(() => {
    if (mode !== 'catalog') return;

    const handleScroll = () => {
      if (isClickingRef.current) return;

      const setupsEl = document.getElementById('setups');
      const howItWorksEl = document.getElementById('how-it-works');
      const catalogEl = document.getElementById('catalog');

      const triggerY = 160;

      if (catalogEl && catalogEl.getBoundingClientRect().top <= triggerY) {
        setActiveNav('catalog');
      } else if (howItWorksEl && howItWorksEl.getBoundingClientRect().top <= triggerY) {
        setActiveNav('how-it-works');
      } else if (setupsEl && setupsEl.getBoundingClientRect().top <= triggerY) {
        setActiveNav('setups');
      } else {
        setActiveNav('catalog');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mode]);

  const handleNav = (targetMode: 'catalog' | 'builder', targetHash?: string) => {
    setNavOpen(false);

    if (targetHash) {
      if (mode !== 'catalog') {
        setMode('catalog');
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      setMode(targetMode);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navTo = (item: NavItem, targetMode: 'catalog' | 'builder', targetHash?: string) => {
    isClickingRef.current = true;
    setActiveNav(item);
    handleNav(targetMode, targetHash);
    setTimeout(() => {
      isClickingRef.current = false;
    }, 1200);
  };

  return (
    <>
      {/* ── Utility Bar ── */}
      <div className="utility">
        <div className="wrap">
          <div className="loc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z" />
              <circle cx="12" cy="9" r="2.4" />
            </svg>
            Delivering across Canggu, Seminyak, Ubud and Uluwatu today
          </div>
          <div className="currency" role="group" aria-label="Currency">
            <button
              type="button"
              className={currency === 'IDR' ? 'active' : ''}
              onClick={() => setCurrency('IDR')}
            >
              IDR
            </button>
            <button
              type="button"
              className={currency === 'USD' ? 'active' : ''}
              onClick={() => setCurrency('USD')}
            >
              USD
            </button>
          </div>
        </div>
      </div>

      {/* ── Sticky Header ── */}
      <header className={`site-header ${navOpen ? 'nav-open' : ''}`} id="site-header">
        <div className="wrap">
          {/* Logo */}
          <div className="logo" onClick={() => navTo('catalog', 'catalog')} style={{ cursor: 'pointer' }}>
            monis<span>.rent</span>
          </div>

          {/* Nav */}
          <nav className="primary-nav">
            <button
              type="button"
              className={mode === 'catalog' && activeNav === 'catalog' ? 'current' : ''}
              onClick={() => navTo('catalog', 'catalog')}
            >
              Catalog
            </button>
            <button
              type="button"
              className={mode === 'catalog' && activeNav === 'setups' ? 'current' : ''}
              onClick={() => navTo('setups', 'catalog', '#setups')}
            >
              Setups
            </button>
            <button
              type="button"
              className={mode === 'builder' ? 'current' : ''}
              onClick={() => navTo('builder', 'builder')}
            >
              Builder
            </button>
            <button
              type="button"
              className={mode === 'catalog' && activeNav === 'how-it-works' ? 'current' : ''}
              onClick={() => navTo('how-it-works', 'catalog', '#how-it-works')}
            >
              How it works
            </button>
          </nav>

          {/* Right actions */}
          <div className="header-right">
            <button
              className="setup-btn"
              type="button"
              onClick={() => {
                if (totalCount > 0) {
                  setCheckoutOpen(true);
                } else {
                  setActiveNav('builder');
                  setMode('builder');
                }
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M6 6h15l-1.5 9h-12L4 3H2" />
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
              </svg>
              <span className="label">Your setup</span>
              <span className="count">{totalCount}</span>
            </button>

            <button
              className="menu-toggle"
              id="menuToggle"
              aria-label="Open menu"
              aria-expanded={navOpen}
              onClick={() => setNavOpen(!navOpen)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
