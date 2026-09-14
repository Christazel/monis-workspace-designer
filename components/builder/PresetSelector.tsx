'use client';

import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';
import { PRESETS } from '@/data/presets';
import { formatIDR, formatUSD } from '@/data/products';

export default function PresetSelector() {
  const { activePresetId, applyPreset } = useWorkspaceStore();
  const currency = useCurrency();

  return (
    <div
      style={{
        background: 'var(--paper-2)',
        borderBottom: '1px solid var(--line)',
        padding: '12px 0',
      }}
    >
      <div className="wrap">
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
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--ink-soft)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Quick Setups
            </span>
          </div>

          <div style={{ width: 1, height: 18, background: 'var(--line)' }} />

          {/* Preset buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {PRESETS.map((preset) => {
              const isActive = activePresetId === preset.id;
              const price =
                currency === 'IDR'
                  ? formatIDR(preset.totalPrice)
                  : formatUSD(preset.totalPrice);

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 14px',
                    borderRadius: 'var(--radius)',
                    background: isActive ? 'var(--ink)' : 'var(--paper)',
                    color: isActive ? 'var(--paper)' : 'var(--ink)',
                    border: '1px solid ' + (isActive ? 'var(--ink)' : 'var(--line)'),
                    fontSize: 13,
                    fontWeight: 600,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.name}</span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: isActive ? 'var(--paper-2)' : 'var(--brass)',
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
