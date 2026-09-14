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
    <section style={{ background: '#f0f2f5', minHeight: 'calc(100vh - 65px)' }}>
      {/* ── Preset bar (dark) ── */}
      <PresetSelector />

      {/* ── Mobile Tab Switcher (< 1024px) ── */}
      <div className="builder-mobile-tab-bar">
        {[
          { id: 'canvas' as const, icon: <Eye size={14} />, label: 'Preview' },
          { id: 'items' as const, icon: <List size={14} />, label: 'Items' },
          { id: 'summary' as const, icon: <ShoppingBag size={14} />, label: `Setup${selectedCount > 0 ? ` (${selectedCount})` : ''}` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMobileTab(tab.id)}
            className={`builder-mobile-tab-btn${mobileTab === tab.id ? ' active' : ''}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Main 3-column layout ── */}
      <div className="builder-layout-container">

        {/* LEFT: Item Selector */}
        <div className={`builder-col builder-col-left${mobileTab === 'items' ? ' show-mobile' : ''}`}>
          <ItemSelector />
        </div>

        {/* CENTER: Canvas */}
        <div className={`builder-col builder-col-center${mobileTab === 'canvas' ? ' show-mobile' : ''}`}>
          {/* Toolbar */}
          <div
            style={{
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #e5e7eb',
              background: '#ffffff',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Bali Villa Workspace Preview
            </span>
            <button
              onClick={() => setMode('catalog')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                background: 'none',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                color: '#6b7280',
                padding: '4px 10px',
                borderRadius: 6,
                transition: 'all 0.12s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#111827';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#6b7280';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb';
              }}
            >
              <ArrowLeft size={12} />
              Back to Catalog
            </button>
          </div>

          {/* Canvas area */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              background: '#f0f2f5',
            }}
          >
            <div style={{ width: '100%', maxWidth: 680 }}>
              <WorkspaceCanvas />
            </div>
          </div>
        </div>

        {/* RIGHT: Summary */}
        <div className={`builder-col builder-col-right${mobileTab === 'summary' ? ' show-mobile' : ''}`}>
          <WorkspaceSummary />
        </div>
      </div>

      {/* ── Responsive CSS ── */}
      <style jsx>{`
        .builder-mobile-tab-bar {
          display: none;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          padding: 8px 14px;
          gap: 6px;
        }
        .builder-mobile-tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .builder-mobile-tab-btn.active {
          background: #111827;
          border-color: #111827;
          color: #ffffff;
        }
        .builder-layout-container {
          display: flex;
          height: calc(100vh - 160px);
          min-height: 520px;
          overflow: hidden;
        }
        .builder-col-left {
          width: 240px;
          flex-shrink: 0;
          height: 100%;
        }
        .builder-col-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #f0f2f5;
          overflow: hidden;
          height: 100%;
        }
        .builder-col-right {
          width: 256px;
          flex-shrink: 0;
          height: 100%;
        }

        @media (max-width: 1023px) {
          .builder-mobile-tab-bar {
            display: flex;
          }
          .builder-layout-container {
            flex-direction: column;
            height: auto;
            min-height: auto;
            overflow: visible;
          }
          .builder-col {
            display: none;
            width: 100% !important;
            height: auto !important;
          }
          .builder-col.show-mobile {
            display: flex !important;
          }
          .builder-col-left, .builder-col-right {
            max-height: 75vh;
            overflow-y: auto;
          }
        }
      `}</style>
    </section>
  );
}
