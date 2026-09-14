'use client';

import { Trash2 } from 'lucide-react';
import { useWorkspaceStore, useTotal, useDuration, useCurrency } from '@/store/workspaceStore';
import { formatIDR, formatUSD, DURATION_DISCOUNTS } from '@/data/products';
import { Product } from '@/data/types';

const DURATION_OPTIONS = [
  { id: 'daily', label: '1 Day', badge: null },
  { id: 'weekly', label: '1 Week', badge: '-10%' },
  { id: 'monthly', label: '1 Month', badge: '-20%' },
] as const;

function SummaryItem({ product, onRemove }: { product: Product; onRemove: () => void }) {
  const currency = useCurrency();
  const price = currency === 'IDR' ? formatIDR(product.price) : formatUSD(product.price);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 0',
        borderBottom: '1px solid var(--line-soft)',
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          background: 'var(--paper-2)',
          borderRadius: 5,
          border: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
          padding: 2,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 12.5,
            fontWeight: 600,
            color: 'var(--ink)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.name}
        </p>
        <p style={{ fontSize: 11, color: 'var(--brass)', fontWeight: 600 }}>{price}/day</p>
      </div>

      <button
        onClick={onRemove}
        type="button"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 4,
          color: 'var(--ink-soft)',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 4,
          transition: 'color 0.12s',
          flexShrink: 0,
        }}
        title={`Remove ${product.name}`}
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}

export default function WorkspaceSummary() {
  const {
    desk,
    chair,
    tech,
    accessories,
    setDesk,
    setChair,
    toggleTech,
    toggleAccessory,
    clearWorkspace,
    setCheckoutOpen,
    duration,
    setDuration,
  } = useWorkspaceStore();

  const total = useTotal();
  const allItems = [
    ...(desk ? [desk] : []),
    ...(chair ? [chair] : []),
    ...tech,
    ...accessories,
  ];

  return (
    <aside
      style={{
        width: 290,
        flexShrink: 0,
        background: 'var(--paper)',
        borderLeft: '1px solid var(--line)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>Your Setup</h3>
          <span
            style={{
              background: 'var(--brass)',
              color: 'var(--ink)',
              fontSize: 11,
              fontWeight: 700,
              width: 20,
              height: 20,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {allItems.length}
          </span>
        </div>

        {allItems.length > 0 && (
          <button
            onClick={clearWorkspace}
            type="button"
            style={{
              fontSize: 12,
              color: 'var(--ink-soft)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* ── Items List ── */}
      <div style={{ flex: 1, padding: '12px 16px', overflowY: 'auto' }}>
        {allItems.length === 0 ? (
          <div
            style={{
              padding: '36px 12px',
              textAlign: 'center',
              color: 'var(--ink-soft)',
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>No items yet</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>
              Pick from the left catalog or choose a quick setup above.
            </p>
          </div>
        ) : (
          <div>
            {desk && (
              <SummaryItem product={desk} onRemove={() => setDesk(null)} />
            )}
            {chair && (
              <SummaryItem product={chair} onRemove={() => setChair(null)} />
            )}
            {tech.map((item) => (
              <SummaryItem key={item.id} product={item} onRemove={() => toggleTech(item)} />
            ))}
            {accessories.map((item) => (
              <SummaryItem key={item.id} product={item} onRemove={() => toggleAccessory(item)} />
            ))}
          </div>
        )}
      </div>

      {/* ── Rental Duration ── */}
      <div
        style={{
          padding: '14px 16px',
          borderTop: '1px solid var(--line)',
          background: 'var(--paper-2)',
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--ink-soft)',
            marginBottom: 8,
          }}
        >
          Rental Duration
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {DURATION_OPTIONS.map((opt) => {
            const isSelected = duration === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDuration(opt.id)}
                style={{
                  padding: '8px 4px',
                  borderRadius: 'var(--radius)',
                  border: '1px solid ' + (isSelected ? 'var(--ink)' : 'var(--line)'),
                  background: isSelected ? 'var(--ink)' : 'var(--paper)',
                  color: isSelected ? 'var(--paper)' : 'var(--ink)',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.12s ease',
                  position: 'relative',
                }}
              >
                <div>{opt.label}</div>
                {opt.badge && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: isSelected ? 'var(--paper-2)' : 'var(--sage)',
                      display: 'block',
                      marginTop: 2,
                    }}
                  >
                    {opt.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Price Summary & CTA ── */}
      <div
        style={{
          padding: '16px',
          borderTop: '1px solid var(--line)',
          background: 'var(--paper)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
            Total ({allItems.length} {allItems.length === 1 ? 'item' : 'items'}):
          </span>
          <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--brass)' }}>
            {total.formatted}
          </span>
        </div>

        {total.discount > 0 && (
          <p style={{ fontSize: 11.5, color: 'var(--sage)', fontWeight: 600, marginBottom: 12 }}>
            ✓ Duration discount applied
          </p>
        )}

        <button
          className="btn-primary"
          type="button"
          disabled={allItems.length === 0}
          onClick={() => setCheckoutOpen(true)}
          style={{
            width: '100%',
            justifyContent: 'center',
            opacity: allItems.length === 0 ? 0.45 : 1,
            cursor: allItems.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Rent This Workspace
        </button>

        <p
          style={{
            fontSize: 11,
            color: 'var(--ink-soft)',
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          No deposit required · Same-day delivery
        </p>
      </div>
    </aside>
  );
}
