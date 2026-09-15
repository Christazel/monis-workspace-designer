'use client';

import { useState } from 'react';
import PresetSelector from './PresetSelector';
import ItemSelector from './ItemSelector';
import WorkspaceCanvas from './WorkspaceCanvas';
import WorkspaceSummary from './WorkspaceSummary';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { Eye, List, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function BuilderSection() {
  const { setMode, getAllSelectedProducts } = useWorkspaceStore();
  const [mobileTab, setMobileTab] = useState<'canvas' | 'items' | 'summary'>('canvas');
  const selectedCount = getAllSelectedProducts().length;

  return (
    <section style={{ background: 'var(--paper)', minHeight: 'calc(100vh - 110px)' }}>
      {/* ── Preset bar ── */}
      <PresetSelector />

      {/* ── Sub-header Toolbar ── */}
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
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={() => setMode('catalog')}
            type="button"
            className="btn-text"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 14,
            }}
          >
            <ArrowLeft size={14} />
            Back to Catalog
          </button>

          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--ink-soft)',
            }}
          >
            Villa Workspace Visualizer
          </span>
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
          height: 'calc(100vh - 200px)',
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
