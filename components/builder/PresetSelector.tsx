'use client';

import { useWorkspaceStore, useDuration, useCurrency } from '@/store/workspaceStore';
import { PRESETS } from '@/data/presets';
import { formatIDR, formatUSD } from '@/data/products';
import { Zap } from 'lucide-react';

export default function PresetSelector() {
  const { activePresetId, applyPreset } = useWorkspaceStore();
  const duration = useDuration();
  const currency = useCurrency();

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1a1f2e 0%, #111827 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '14px 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={13} color="#f59e0b" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.45)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}
            >
              Quick Presets
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.12)' }} />

          {/* Preset pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PRESETS.map((preset) => {
              const isActive = activePresetId === preset.id;
              const price =
                currency === 'IDR'
                  ? formatIDR(preset.totalPrice)
                  : formatUSD(preset.totalPrice);

              return (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '7px 14px',
                    background: isActive
                      ? 'rgba(245,158,11,0.15)'
                      : 'rgba(255,255,255,0.06)',
                    border: isActive
                      ? '1px solid rgba(245,158,11,0.5)'
                      : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 99,
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    color: isActive ? '#f59e0b' : 'rgba(255,255,255,0.75)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        'rgba(255,255,255,0.11)';
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        'rgba(255,255,255,0.2)';
                      (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        'rgba(255,255,255,0.1)';
                      (e.currentTarget as HTMLButtonElement).style.color =
                        'rgba(255,255,255,0.75)';
                    }
                  }}
                >
                  <span style={{ fontSize: 15 }}>{preset.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{preset.name}</span>
                  <span
                    style={{
                      fontSize: 11,
                      color: isActive ? 'rgba(245,158,11,0.8)' : 'rgba(255,255,255,0.35)',
                      fontWeight: 500,
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
    </div>
  );
}
