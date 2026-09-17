'use client';

import React, { useState } from 'react';
import DeskSelector from './DeskSelector';
import ChairSelector from './ChairSelector';
import AccessorySelector from './AccessorySelector';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { Armchair, Sparkles } from 'lucide-react';

type CategoryTab = 'desk' | 'chair' | 'accessory';

export default function ItemSelector() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('desk');
  const { desk, chair, tech, accessories } = useWorkspaceStore();

  const accessoryCount = tech.length + accessories.length;

  const TABS = [
    {
      id: 'desk' as const,
      label: 'Meja',
      sublabel: 'Desk',
      badge: desk ? '✓' : null,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16" />
          <path d="M4 10h16" />
          <path d="M4 6v12" />
          <path d="M20 6v12" />
        </svg>
      ),
    },
    {
      id: 'chair' as const,
      label: 'Kursi',
      sublabel: 'Chair',
      badge: chair ? '✓' : null,
      icon: <Armchair size={15} />,
    },
    {
      id: 'accessory' as const,
      label: 'Gear',
      sublabel: 'Accessories',
      badge: accessoryCount > 0 ? `${accessoryCount}` : null,
      icon: <Sparkles size={15} />,
    },
  ];

  return (
    <aside
      style={{
        width: 320,
        maxWidth: '100%',
        flexShrink: 0,
        background: 'var(--paper)',
        borderRight: '1px solid var(--line)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: '14px 16px 12px',
          borderBottom: '1px solid var(--line)',
          background: 'var(--paper)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3
              style={{
                fontSize: 13.5,
                fontWeight: 800,
                color: 'var(--ink)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                margin: 0,
              }}
            >
              Rancang Workspace Anda
            </h3>
            <p style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 2, marginBottom: 0 }}>
              Pilih meja, kursi, monitor &amp; aksesoris
            </p>
          </div>
        </div>

        {/* ── Category Pill Tabs ── */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            marginTop: 12,
            padding: 3,
            background: 'var(--paper-2)',
            borderRadius: 10,
            border: '1px solid var(--line)',
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  padding: '7px 8px',
                  borderRadius: 7,
                  border: 'none',
                  background: isActive ? 'var(--paper)' : 'transparent',
                  color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: 12,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '1px 5px',
                      borderRadius: 10,
                      background: isActive ? 'var(--ink)' : 'var(--line)',
                      color: isActive ? 'var(--paper)' : 'var(--ink)',
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Active Category Content ── */}
      <div style={{ padding: '14px 14px 24px', flex: 1 }}>
        {activeTab === 'desk' && <DeskSelector />}
        {activeTab === 'chair' && <ChairSelector />}
        {activeTab === 'accessory' && <AccessorySelector />}
      </div>
    </aside>
  );
}
