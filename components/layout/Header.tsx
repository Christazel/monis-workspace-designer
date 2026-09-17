'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useWorkspaceStore } from '@/store/workspaceStore';
import MonisLogo from './MonisLogo';

type CategoryFilter = 'all' | 'desk' | 'chair' | 'tech' | 'accessory';

const CATEGORIES: { id: CategoryFilter; label: string; icon: string }[] = [
  { id: 'all', label: 'All Categories', icon: 'grid' },
  { id: 'tech', label: 'Monitors & Displays', icon: 'monitor' },
  { id: 'desk', label: 'Standing Desks', icon: 'desk' },
  { id: 'chair', label: 'Ergonomic Chairs', icon: 'chair' },
  { id: 'accessory', label: 'Accessories & Nomad Gear', icon: 'gear' },
];

const BALI_AREAS = [
  'Canggu',
  'Pererenan',
  'Seminyak',
  'Berawa',
  'Ubud',
  'Uluwatu',
  'Sanur',
  'Kerobokan',
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [locationMenuOpen, setLocationMenuOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState('Canggu, Bali');
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(130);

  const headerWrapperRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isHoveredRef = useRef(false);

  const {
    mode,
    setMode,
    currency,
    setCurrency,
    setCheckoutOpen,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    desk,
    chair,
    tech,
    accessories,
  } = useWorkspaceStore();

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
    if (navOpen || locationMenuOpen || isHoveredRef.current) return;

    hideTimerRef.current = setTimeout(() => {
      if (!navOpen && !locationMenuOpen && !isHoveredRef.current) {
        setIsVisible(false);
      }
    }, 5000);
  }, [clearHideTimer, navOpen, locationMenuOpen]);

  // Reveal header and restart 5s timer
  const revealHeader = useCallback(() => {
    setIsVisible(true);
    start5sTimer();
  }, [start5sTimer]);

  // Hide header immediately
  const hideHeader = useCallback(() => {
    if (navOpen || locationMenuOpen || isHoveredRef.current) return;
    clearHideTimer();
    setIsVisible(false);
  }, [clearHideTimer, navOpen, locationMenuOpen]);

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

  const isHeaderActive = navOpen || locationMenuOpen || isVisible;

  // Scroll, Touch, & Wheel Listeners
  useEffect(() => {
    start5sTimer();

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const prevScrollY = lastScrollYRef.current;
      const delta = currentScrollY - prevScrollY;

      setIsAtTop(currentScrollY <= 15);

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

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diff = currentY - touchStartYRef.current;

      // Swiping DOWN = scrolling UP -> Reveal header
      if (diff > 15) {
        revealHeader();
      }
      // Swiping UP = scrolling DOWN -> Hide header
      else if (diff < -15 && window.scrollY > 30) {
        hideHeader();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < -6) {
        revealHeader();
      } else if (e.deltaY > 6 && window.scrollY > 30) {
        hideHeader();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 30) {
        revealHeader();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMouseMove);
      clearHideTimer();
    };
  }, [clearHideTimer, start5sTimer, revealHeader, hideHeader]);

  const handleNav = (targetMode: 'catalog' | 'builder', targetHash?: string) => {
    setNavOpen(false);
    setLocationMenuOpen(false);
    setMode(targetMode);

    if (targetMode === 'catalog') {
      setTimeout(() => {
        if (targetHash) {
          const el = document.querySelector(targetHash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catId: CategoryFilter) => {
    setActiveCategory(catId);
    if (mode !== 'catalog') {
      setMode('catalog');
    }
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
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
      {/* ── Official Monis Top Navbar ── */}
      <header
        style={{
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div className="wrap header-main-nav">
          {/* Top Bar Row (on mobile: row 1; on desktop: inline) */}
          <div className="header-row-one">
            {/* Official Monis Logo */}
            <button
              type="button"
              onClick={() => handleNav('catalog', '#catalog')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                userSelect: 'none',
                flexShrink: 0,
              }}
              aria-label="Monis rent home"
            >
              <MonisLogo width={102} height={29} color="#000000" />
            </button>

            {/* Mobile-only Quick Actions (Currency + Cart + Menu) */}
            <div className="mobile-actions-row" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setCurrency(currency === 'IDR' ? 'USD' : 'IDR')}
                aria-label={`Switch currency between IDR and USD, currently ${currency}`}
                style={{
                  border: '1px solid #e5e7eb',
                  background: '#f9fafb',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '5px 9px',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                }}
              >
                {currency}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (totalCount > 0) setCheckoutOpen(true);
                  else setMode('builder');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '6px 10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                aria-label={`Your rental cart with ${totalCount} items`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6h15l-1.5 9h-12L4 3H2" />
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                </svg>
                {totalCount > 0 && <span>{totalCount}</span>}
              </button>

              <button
                type="button"
                className="monis-mobile-toggle"
                aria-label={navOpen ? 'Close navigation menu' : 'Open navigation menu'}
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
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: '1px solid #e5e7eb',
                  background: '#ffffff',
                  color: '#111827',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Center Capsule Search Bar (Official Monis.rent style) ── */}
          <div
            className="monis-search-capsule"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '9999px',
              padding: '4px 6px 4px 14px',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
              maxWidth: '560px',
              flex: '1 1 480px',
              position: 'relative',
            }}
          >
            {/* Location section */}
            <button
              type="button"
              onClick={() => setLocationMenuOpen(!locationMenuOpen)}
              aria-haspopup="listbox"
              aria-expanded={locationMenuOpen}
              aria-label={`Select delivery location in Bali, currently ${selectedArea}`}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 10px 0 0',
                borderRight: '1px solid #e5e7eb',
                minWidth: '95px',
              }}
            >
              <span
                style={{
                  fontSize: '9.5px',
                  fontWeight: 600,
                  color: '#4b5563',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                Location
              </span>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#111827',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '90px',
                }}
              >
                {selectedArea}
              </span>
            </button>

            {/* Bali Area Dropdown Popup */}
            {locationMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '115%',
                  left: 0,
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12)',
                  padding: '8px',
                  minWidth: '210px',
                  zIndex: 100,
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', padding: '6px 10px' }}>
                  POPULAR BALI HUBS
                </div>
                {BALI_AREAS.map((area) => (
                  <div
                    key={area}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArea(`${area}, Bali`);
                      setLocationMenuOpen(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: selectedArea.includes(area) ? '#000000' : '#4b5563',
                      background: selectedArea.includes(area) ? '#f3f4f6' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{area}</span>
                    <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 600 }}>Same-day</span>
                  </div>
                ))}
              </div>
            )}

            {/* Delivery Date section */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 12px',
                borderRight: '1px solid #e5e7eb',
                minWidth: '95px',
              }}
              className="delivery-pill-desktop"
            >
              <span
                style={{
                  fontSize: '9.5px',
                  fontWeight: 600,
                  color: '#4b5563',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Delivery
              </span>
              <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#047857' }}>
                Today in Bali
              </span>
            </div>

            {/* Quick Search input */}
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, paddingLeft: '8px', minWidth: 0 }}>
              <input
                id="search-gear"
                type="text"
                placeholder="Search gear..."
                aria-label="Search workspace equipment"
                value={searchQuery}
                onFocus={() => {
                  isHoveredRef.current = true;
                  clearHideTimer();
                }}
                onBlur={() => {
                  isHoveredRef.current = false;
                  start5sTimer();
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (mode !== 'catalog') setMode('catalog');
                }}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: '#111827',
                }}
              />
            </div>

            {/* Search Icon Circle */}
            <button
              type="button"
              aria-label="Search"
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: '#000000',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          {/* ── Desktop Right Actions (How it Works, Currency, Setup Cart) ── */}
          <div className="desktop-actions-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* How it works button */}
            <button
              type="button"
              className="monis-pill-btn"
              onClick={() => handleNav('catalog', '#how-it-works')}
              style={{
                padding: '8px 14px',
                borderRadius: '9999px',
                border: 'none',
                background: 'transparent',
                fontSize: '13px',
                fontWeight: 500,
                color: '#374151',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              How it works
            </button>

            {/* Currency switcher capsule */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f3f4f6',
                borderRadius: '9999px',
                padding: '2px',
                border: '1px solid #e5e7eb',
              }}
            >
              <button
                type="button"
                onClick={() => setCurrency('IDR')}
                aria-label="Set currency to Indonesian Rupiah"
                style={{
                  border: 'none',
                  background: currency === 'IDR' ? '#ffffff' : 'transparent',
                  color: currency === 'IDR' ? '#000000' : '#4b5563',
                  fontWeight: currency === 'IDR' ? 700 : 500,
                  fontSize: '11px',
                  padding: '4px 8px',
                  borderRadius: '9999px',
                  boxShadow: currency === 'IDR' ? '0 1px 2px rgba(0, 0, 0, 0.06)' : 'none',
                  cursor: 'pointer',
                }}
              >
                IDR
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                aria-label="Set currency to US Dollars"
                style={{
                  border: 'none',
                  background: currency === 'USD' ? '#ffffff' : 'transparent',
                  color: currency === 'USD' ? '#000000' : '#4b5563',
                  fontWeight: currency === 'USD' ? 700 : 500,
                  fontSize: '11px',
                  padding: '4px 8px',
                  borderRadius: '9999px',
                  boxShadow: currency === 'USD' ? '0 1px 2px rgba(0, 0, 0, 0.06)' : 'none',
                  cursor: 'pointer',
                }}
              >
                USD
              </button>
            </div>

            {/* Builder / Studio Mode Quick Button */}
            <button
              type="button"
              onClick={() => handleNav(mode === 'builder' ? 'catalog' : 'builder')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '9999px',
                background: mode === 'builder' ? '#000000' : '#f3f4f6',
                color: mode === 'builder' ? '#ffffff' : '#111827',
                border: '1px solid',
                borderColor: mode === 'builder' ? '#000000' : '#e5e7eb',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>{mode === 'builder' ? 'Catalog View' : 'Studio Builder'}</span>
            </button>

            {/* Cart / Your Setup Button */}
            <button
              type="button"
              onClick={() => {
                if (totalCount > 0) {
                  setCheckoutOpen(true);
                } else {
                  setMode('builder');
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.1s ease',
              }}
              aria-label="Your rental cart"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6h15l-1.5 9h-12L4 3H2" />
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
              </svg>
              <span className="cart-label-desktop">Setup</span>
              {totalCount > 0 && (
                <span
                  style={{
                    background: '#047857',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Sub-Navbar Category Pills (Official monis.rent layout, Catalog only) ── */}
        {mode === 'catalog' && (
          <div
            style={{
              borderTop: '1px solid rgba(0, 0, 0, 0.05)',
              background: '#ffffff',
            }}
          >
            <div
              className="wrap"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingTop: '8px',
                paddingBottom: '8px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
              }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 500,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      border: '1px solid',
                      borderColor: isActive ? '#000000' : '#e5e7eb',
                      background: isActive ? '#000000' : '#ffffff',
                      color: isActive ? '#ffffff' : '#374151',
                    }}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => handleNav('catalog', '#setups')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  border: '1px solid #e5e7eb',
                  background: '#ffffff',
                  color: '#374151',
                }}
              >
                <span>Product Bundles</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('builder')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  border: '1px dashed #10b981',
                  background: '#ecfdf5',
                  color: '#065f46',
                  marginLeft: 'auto',
                }}
              >
                <span>⚡ 2D Studio Configurator</span>
              </button>
            </div>
          </div>
        )}

        {/* Mobile slide-down drawer menu */}
        {navOpen && (
          <div
            style={{
              padding: '16px 20px 24px',
              background: '#ffffff',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>
              Categories
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  handleCategoryClick(cat.id);
                  setNavOpen(false);
                }}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: activeCategory === cat.id ? '#f3f4f6' : 'transparent',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: activeCategory === cat.id ? 600 : 500,
                  color: '#111827',
                  cursor: 'pointer',
                }}
              >
                {cat.label}
              </button>
            ))}
            <div style={{ height: '1px', background: '#e5e7eb', margin: '4px 0' }} />
            <button
              type="button"
              onClick={() => handleNav('catalog', '#how-it-works')}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: '8px',
                background: 'transparent',
                border: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: '#111827',
                cursor: 'pointer',
              }}
            >
              How it works
            </button>
            <button
              type="button"
              onClick={() => handleNav('builder')}
              style={{
                textAlign: 'center',
                padding: '12px',
                borderRadius: '8px',
                background: '#000000',
                color: '#ffffff',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '6px',
              }}
            >
              Open 2D Studio Configurator
            </button>
          </div>
        )}
      </header>
    </div>
  );
}
