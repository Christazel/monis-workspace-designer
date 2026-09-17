'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useWorkspaceStore } from '@/store/workspaceStore';

type NavItem = 'catalog' | 'setups' | 'builder' | 'how-it-works';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(106);

  const headerWrapperRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isClickingRef = useRef(false);

  const { mode, setMode, currency, setCurrency, setCheckoutOpen } = useWorkspaceStore();
  const { desk, chair, tech, accessories } = useWorkspaceStore();

  const [activeNav, setActiveNav] = useState<NavItem>('catalog');

  const totalCount = (desk ? 1 : 0) + (chair ? 1 : 0) + tech.length + accessories.length;

  // Clear auto-hide timer
  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  // Start 5-second countdown to slide up
  const start5sTimer = useCallback(() => {
    clearHideTimer();
    if (navOpen || isHoveredRef.current) return;

    hideTimerRef.current = setTimeout(() => {
      if (!navOpen && !isHoveredRef.current) {
        setIsVisible(false);
      }
    }, 5000);
  }, [clearHideTimer, navOpen]);

  // Reveal header and restart 5s timer
  const revealHeader = useCallback(() => {
    setIsVisible(true);
    start5sTimer();
  }, [start5sTimer]);

  // Hide header immediately
  const hideHeader = useCallback(() => {
    if (navOpen || isHoveredRef.current) return;
    clearHideTimer();
    setIsVisible(false);
  }, [clearHideTimer, navOpen]);

  // Measure header height
  useEffect(() => {
    const updateHeight = () => {
      if (headerWrapperRef.current) {
        setHeaderHeight(headerWrapperRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const isHeaderActive = navOpen || isVisible;

  // Scroll, Touch, & Wheel Listeners
  useEffect(() => {
    // Start initial 5-second countdown on mount
    start5sTimer();

    const handleScroll = () => {
      if (isClickingRef.current) return;

      const currentScrollY = Math.max(0, window.scrollY);
      const prevScrollY = lastScrollYRef.current;
      const delta = currentScrollY - prevScrollY;

      setIsAtTop(currentScrollY <= 15);

      // Section spy in catalog mode
      if (mode === 'catalog') {
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
      }

      // Ignore micro-jitter
      if (Math.abs(delta) < 5) {
        lastScrollYRef.current = currentScrollY;
        return;
      }

      // Scrolling UP -> Reveal header
      if (delta < 0) {
        revealHeader();
      }
      // Scrolling DOWN -> Hide header
      else if (delta > 0 && currentScrollY > 40) {
        hideHeader();
      }

      lastScrollYRef.current = currentScrollY;
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diff = currentY - touchStartYRef.current;

      // Swiping finger DOWN (> 15px) = scrolling UP -> Reveal header
      if (diff > 15) {
        revealHeader();
      }
      // Swiping finger UP (> 15px) = scrolling DOWN -> Hide header
      else if (diff < -15 && window.scrollY > 30) {
        hideHeader();
      }
    };

    // Mouse wheel for desktop
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < -6) {
        revealHeader();
      } else if (e.deltaY > 6 && window.scrollY > 30) {
        hideHeader();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
      clearHideTimer();
    };
  }, [mode, clearHideTimer, start5sTimer, revealHeader, hideHeader]);

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
    <div
      ref={headerWrapperRef}
      className={`header-outer-wrapper ${isHeaderActive ? 'header-visible' : 'header-hidden'}`}
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 90,
        transform: isHeaderActive ? 'translateY(0)' : 'translateY(-100%)',
        marginBottom: !isHeaderActive && isAtTop ? `-${headerHeight}px` : 0,
        transition: 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), margin-bottom 0.42s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isHeaderActive ? 'auto' : 'none',
        willChange: 'transform',
      }}
      onMouseEnter={() => {
        isHoveredRef.current = true;
        clearHideTimer();
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        if (isVisible) {
          start5sTimer();
        }
      }}
      onTouchStart={() => {
        isHoveredRef.current = true;
        clearHideTimer();
      }}
      onTouchEnd={() => {
        isHoveredRef.current = false;
        if (isVisible) {
          start5sTimer();
        }
      }}
    >
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

      {/* ── Main Site Header ── */}
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
              onClick={() => {
                const next = !navOpen;
                setNavOpen(next);
                if (next) {
                  clearHideTimer();
                  setIsVisible(true);
                } else {
                  start5sTimer();
                }
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

