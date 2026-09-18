'use client';

import ItemSelector from './ItemSelector';
import WorkspaceCanvas from './WorkspaceCanvas';
import WorkspaceSummary from './WorkspaceSummary';
import { useWorkspaceStore, useCurrency, useTotal } from '@/store/workspaceStore';
import { PRESETS } from '@/data/presets';
import { formatIDR, formatUSD } from '@/data/products';
import { Eye, List, ShoppingBag, ArrowLeft, Code2, Palette, Compass, Sparkles, ArrowRight } from 'lucide-react';

export default function BuilderSection() {
  const {
    setMode,
    getAllSelectedProducts,
    activePresetId,
    applyPreset,
    setCheckoutOpen,
    builderMobileTab: mobileTab,
    setBuilderMobileTab: setMobileTab,
  } = useWorkspaceStore();
  const currency = useCurrency();
  const total = useTotal();
  // Count selected items for mobile badge
  const selectedCount = getAllSelectedProducts().length;

  const renderPresetIcon = (presetId: string) => {
    switch (presetId) {
      case 'preset-trading':
        return <Code2 size={13} />;
      case 'preset-studio':
        return <Palette size={13} />;
      case 'preset-essentials':
        return <Compass size={13} />;
      case 'preset-founders':
        return <Sparkles size={13} />;
      default:
        return <Sparkles size={13} />;
    }
  };

  return (
    <section style={{ background: 'var(--paper)', minHeight: 'calc(100vh - 110px)', position: 'relative' }}>

      {/* ── Unified Builder Toolbar (Back + Presets in one slim bar) ── */}
      <div
        style={{
          background: 'var(--paper)',
          borderBottom: '1px solid var(--line)',
          padding: '10px 0',
        }}
      >
        <div
          className="wrap"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {/* Back button */}
          <button
            onClick={() => setMode('catalog')}
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              fontSize: 13.5,
              fontWeight: 600,
              color: 'var(--ink-soft)',
              cursor: 'pointer',
              padding: '4px 0',
              flexShrink: 0,
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink-soft)'; }}
          >
            <ArrowLeft size={14} />
            Catalog
          </button>

          {/* Slim vertical divider */}
          <div style={{ width: 1, height: 16, background: 'var(--line)', flexShrink: 0 }} />

          {/* Quick Setups label */}
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: 'var(--ink-soft)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Curated Setups
          </span>

          {/* Preset buttons — compact */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'nowrap', alignItems: 'center', flexShrink: 0 }}>
            {PRESETS.map((preset) => {
              const isActive = activePresetId === preset.id;
              const price = currency === 'IDR' ? formatIDR(preset.totalPrice) : formatUSD(preset.totalPrice);

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '4px 11px',
                    borderRadius: 'var(--radius)',
                    background: isActive ? 'var(--ink)' : 'transparent',
                    color: isActive ? 'var(--paper)' : 'var(--ink)',
                    border: '1px solid ' + (isActive ? 'var(--ink)' : 'var(--line)'),
                    fontSize: 12,
                    fontWeight: 600,
                    transition: 'all 0.15s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {renderPresetIcon(preset.id)}
                  <span>{preset.name}</span>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: isActive ? 'rgba(239,233,220,0.7)' : 'var(--brass)',
                    }}
                  >
                    {price}/day
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile Tab Switcher (< 1024px) ── */}
      <div
        style={{
          display: 'none',
          background: 'var(--paper-2)',
          borderBottom: '1px solid var(--line)',
          padding: 6,
        }}
        className="builder-mobile-tab-bar"
      >
        {[
          { id: 'canvas' as const, icon: <Eye size={14} />, label: 'Preview' },
          { id: 'items' as const, icon: <List size={14} />, label: 'Catalog' },
          { id: 'summary' as const, icon: <ShoppingBag size={14} />, label: `Setup (${selectedCount})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMobileTab(tab.id)}
            type="button"
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 'var(--radius)',
              border: 'none',
              background: mobileTab === tab.id ? 'var(--ink)' : 'transparent',
              color: mobileTab === tab.id ? 'var(--paper)' : 'var(--ink)',
              fontSize: 13,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Main 3-column Layout ── */}
      <div
        className="builder-layout"
        style={{
          background: 'var(--paper)',
        }}
      >
        {/* Left: Items Picker */}
        <div className={`builder-col-items ${mobileTab === 'items' ? 'active' : ''}`}>
          <ItemSelector />
        </div>

        {/* Center: Canvas Room */}
        <div className={`builder-col-canvas ${mobileTab === 'canvas' ? 'active' : ''}`}>
          <WorkspaceCanvas />
        </div>

        {/* Right: Setup Summary */}
        <div className={`builder-col-summary ${mobileTab === 'summary' ? 'active' : ''}`}>
          <WorkspaceSummary />
        </div>
      </div>

      {/* ── Mobile Sticky Summary Bar (< 960px, only when not on summary tab) ── */}
      {mobileTab !== 'summary' && (
        <div
          className="builder-mobile-bottom-bar"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid var(--line)',
            padding: '10px 16px',
            display: 'none',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 90,
            boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
          }}
        >
          <div>
            <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>
              {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
            </span>
            <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--brass)', lineHeight: 1.1 }}>
              {total.formatted}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setMobileTab('summary')}
              type="button"
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--line)',
                background: 'var(--paper)',
                color: 'var(--ink)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              View Setup
            </button>
            <button
              onClick={() => setCheckoutOpen(true)}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '8px 16px',
                borderRadius: 'var(--radius)',
                border: 'none',
                background: 'var(--ink)',
                color: 'var(--paper)',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <span>Rent</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

