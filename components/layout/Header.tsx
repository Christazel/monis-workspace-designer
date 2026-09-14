'use client';

import { useState } from 'react';
import { ShoppingBag, Search, MapPin, ChevronDown, X, Menu } from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { useCurrency, useHasItems, useTotal } from '@/store/workspaceStore';
import { formatIDR, formatUSD } from '@/data/products';

const NAV_LINKS = [
  { label: 'Explore Catalog', mode: 'catalog' as const },
  { label: 'Workspace Builder', mode: 'builder' as const },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { mode, setMode, searchQuery, setSearchQuery, setCurrency, setCheckoutOpen } =
    useWorkspaceStore();
  const currency = useCurrency();
  const hasItems = useHasItems();
  const total = useTotal();

  const toggleCurrency = () => setCurrency(currency === 'IDR' ? 'USD' : 'IDR');

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      {/* ── Utility Bar ── */}
      <div
        style={{
          background: '#f5f5f5',
          borderBottom: '1px solid #e5e7eb',
          padding: '6px 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={13} color="#4b5563" />
            <span style={{ fontSize: 12, color: '#4b5563', fontWeight: 500 }}>
              Bali — Same-day Villa Delivery
            </span>
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Currency toggle */}
            <button
              onClick={toggleCurrency}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                color: '#4b5563',
                fontWeight: 500,
                padding: '2px 0',
              }}
            >
              {currency === 'IDR' ? 'IDR' : 'USD'}
              <ChevronDown size={11} />
            </button>

            <span style={{ color: '#d1d5db', fontSize: 12 }}>|</span>

            {/* Language */}
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                color: '#4b5563',
                fontWeight: 500,
                padding: '2px 0',
              }}
            >
              EN
              <ChevronDown size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          height: 64,
        }}
      >
        {/* Brand */}
        <button
          onClick={() => setMode('catalog')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#111827',
              letterSpacing: '-0.04em',
              fontFamily: 'inherit',
            }}
          >
            monis
            <span style={{ color: '#f59e0b' }}>.</span>
            rent
          </span>
        </button>

        {/* Desktop Nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginLeft: 8,
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.mode}
              onClick={() => setMode(link.mode)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: mode === link.mode ? 600 : 500,
                color: mode === link.mode ? '#111827' : '#4b5563',
                borderBottom: mode === link.mode ? '2px solid #111827' : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Search bar — desktop */}
        <div
          style={{
            flex: 1,
            maxWidth: 380,
            marginLeft: 'auto',
            position: 'relative',
          }}
          className="desktop-search"
        >
          <Search
            size={15}
            color="#9ca3af"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            className="input"
            type="text"
            placeholder="Search workspace items..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value && mode !== 'catalog') setMode('catalog');
            }}
            style={{ paddingLeft: 36, paddingRight: searchQuery ? 36 : 12, fontSize: 13 }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }}>
          {/* Mobile search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              borderRadius: 4,
              display: 'none',
              color: '#4b5563',
            }}
            className="mobile-search-btn"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Cart / Bag */}
          <button
            onClick={() => setCheckoutOpen(true)}
            disabled={!hasItems}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: hasItems ? '#111827' : 'transparent',
              border: hasItems ? 'none' : '1px solid #e5e7eb',
              borderRadius: 4,
              padding: '8px 14px',
              cursor: hasItems ? 'pointer' : 'default',
              color: hasItems ? '#ffffff' : '#9ca3af',
              fontSize: 13,
              fontWeight: 600,
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            <ShoppingBag size={16} />
            {hasItems ? (
              <span>{total.formatted}</span>
            ) : (
              <span>Your Setup</span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              borderRadius: 4,
              display: 'none',
              color: '#4b5563',
            }}
            className="mobile-menu-btn"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* ── Mobile Search Bar ── */}
      {searchOpen && (
        <div
          style={{
            borderTop: '1px solid #e5e7eb',
            padding: '12px 16px',
            background: '#ffffff',
          }}
          className="mobile-search-bar"
        >
          <div style={{ position: 'relative' }}>
            <Search
              size={15}
              color="#9ca3af"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              className="input"
              type="text"
              placeholder="Search workspace items..."
              autoFocus
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) setMode('catalog');
              }}
              style={{ paddingLeft: 36 }}
            />
          </div>
        </div>
      )}

      {/* ── Mobile Nav Menu ── */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid #e5e7eb',
            background: '#ffffff',
            padding: '8px 0',
          }}
          className="mobile-menu"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.mode}
              onClick={() => {
                setMode(link.mode);
                setMobileMenuOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '12px 20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: mode === link.mode ? 600 : 400,
                color: mode === link.mode ? '#111827' : '#4b5563',
                borderLeft: mode === link.mode ? '3px solid #111827' : '3px solid transparent',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Responsive CSS ── */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-search { display: none !important; }
          .mobile-search-btn { display: flex !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
