'use client';

import { useState } from 'react';
import ItemSelector from './ItemSelector';
import WorkspaceCanvas from './WorkspaceCanvas';
import WorkspaceSummary from './WorkspaceSummary';
import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';
import { PRESETS } from '@/data/presets';
import { formatIDR, formatUSD } from '@/data/products';
import { Eye, List, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function BuilderSection() {
  const { setMode, getAllSelectedProducts, activePresetId, applyPreset } = useWorkspaceStore();
  const currency = useCurrency();
  const [mobileTab, setMobileTab] = useState<'canvas' | 'items' | 'summary'>('canvas');
  const selectedCount = getAllSelectedProducts().length;

  return (
    <section style={{ background: 'var(--paper)', minHeight: 'calc(100vh - 110px)' }}>

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
            gap: 16,
            flexWrap: 'wrap',
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
              fontSize: 14,
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
          <div style={{ width: 1, height: 18, background: 'var(--line)', flexShrink: 0 }} />

          {/* Quick Setups label */}
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--ink-soft)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Setups
          </span>

          {/* Preset buttons — compact */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1, alignItems: 'center' }}>
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
                    gap: 6,
                    padding: '5px 12px',
                    borderRadius: 'var(--radius)',
                    background: isActive ? 'var(--ink)' : 'transparent',
                    color: isActive ? 'var(--paper)' : 'var(--ink)',
                    border: '1px solid ' + (isActive ? 'var(--ink)' : 'var(--line)'),
                    fontSize: 12.5,
                    fontWeight: 600,
                    transition: 'all 0.15s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ fontSize: 13 }}>{preset.icon}</span>
                  <span>{preset.name}</span>
                  <span
                    style={{
                      fontSize: 11,
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

      {/* ── Mobile Tab Switcher (< 960px) ── */}
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
          { id: 'items' as const, icon: <List size={14} />, label: 'Items' },
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
          display: 'flex',
          height: 'calc(100vh - 178px)',
          minHeight: 520,
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
    </section>
  );
}
