'use client';

import { Trash2, ShoppingBag, Package } from 'lucide-react';
import { useWorkspaceStore, useTotal, useDuration, useCurrency } from '@/store/workspaceStore';
import { formatIDR, formatUSD, DURATION_DISCOUNTS } from '@/data/products';
import { Product } from '@/data/types';

const DURATION_OPTIONS = [
  { id: 'daily',   label: '1 Day',    badge: null },
  { id: 'weekly',  label: '1 Week',   badge: '-10%' },
  { id: 'monthly', label: '1 Month',  badge: '-20%' },
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
        borderBottom: '1px solid #f3f4f6',
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 34,
          height: 34,
          background: '#f9fafb',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 2 }}
        />
      </div>
      {/* Name */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#111827',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.name}
        </p>
        <p style={{ fontSize: 11, color: '#9ca3af' }}>{price}/day</p>
      </div>
      {/* Remove */}
      <button
        onClick={onRemove}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 4,
          color: '#d1d5db',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 4,
          transition: 'color 0.12s',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#ef4444')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#d1d5db')}
        aria-label={`Remove ${product.name}`}
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
  const currency = useCurrency();

  const allItems = [
    ...(desk ? [desk] : []),
    ...(chair ? [chair] : []),
    ...tech,
    ...accessories,
  ];

  const { discount } = DURATION_DISCOUNTS[duration];
  const hasSavings = discount > 0;

  const handleRemove = (product: Product) => {
    if (product.category === 'desk') setDesk(null);
    else if (product.category === 'chair') setChair(null);
    else if (product.category === 'tech') toggleTech(product);
    else toggleAccessory(product);
  };

  return (
    <aside
      style={{
        width: 260,
        flexShrink: 0,
        background: '#ffffff',
        borderLeft: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 16px 12px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#fafafa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
            Your Setup
          </p>
          {allItems.length > 0 && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#ffffff',
                background: '#111827',
                borderRadius: 99,
                padding: '1px 7px',
                minWidth: 18,
                textAlign: 'center',
              }}
            >
              {allItems.length}
            </span>
          )}
        </div>
        {allItems.length > 0 && (
          <button
            onClick={clearWorkspace}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 11,
              color: '#9ca3af',
              padding: 0,
              fontWeight: 500,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = '#ef4444')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = '#9ca3af')
            }
          >
            Clear all
          </button>
        )}
      </div>

      {/* Items list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
        {allItems.length === 0 ? (
          <div
            style={{
              padding: '40px 16px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: '#f3f4f6',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px',
              }}
            >
              <Package size={20} color="#9ca3af" strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
              No items yet
            </p>
            <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>
              Pick from the left panel or apply a preset.
            </p>
          </div>
        ) : (
          <div style={{ paddingTop: 4 }}>
            {allItems.map((item) => (
              <SummaryItem
                key={item.id}
                product={item}
                onRemove={() => handleRemove(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Duration selector + total */}
      <div
        style={{
          borderTop: '1px solid #e5e7eb',
          padding: '16px',
        }}
      >
        {/* Duration toggle */}
        <p style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Rental Duration
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            marginBottom: 16,
          }}
        >
          {DURATION_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setDuration(opt.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: duration === opt.id ? '#111827' : '#f9fafb',
                border: duration === opt.id ? '1px solid #111827' : '1px solid #e5e7eb',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 0.12s ease',
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: duration === opt.id ? '#ffffff' : '#374151',
                }}
              >
                {opt.label}
              </span>
              {opt.badge && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: duration === opt.id ? '#fbbf24' : '#16a34a',
                    background: duration === opt.id ? 'rgba(251,191,36,0.15)' : '#f0fdf4',
                    padding: '1px 6px',
                    borderRadius: 99,
                  }}
                >
                  {opt.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Price breakdown */}
        {allItems.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 12, color: '#6b7280' }}>
                {allItems.length} item{allItems.length > 1 ? 's' : ''} × {DURATION_DISCOUNTS[duration].multiplier} day{DURATION_DISCOUNTS[duration].multiplier > 1 ? 's' : ''}
              </span>
              <span style={{ fontSize: 12, color: '#6b7280' }}>
                {currency === 'IDR' ? formatIDR(total.subtotal) : formatUSD(total.subtotal)}
              </span>
            </div>
            {hasSavings && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>
                  Discount ({Math.round(discount * 100)}%)
                </span>
                <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>
                  -{currency === 'IDR' ? formatIDR(total.discount) : formatUSD(total.discount)}
                </span>
              </div>
            )}
            <div
              className="divider"
              style={{ margin: '8px 0' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>
                {total.formatted}
              </span>
            </div>
            <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'right', marginTop: 2 }}>
              Includes delivery & setup
            </p>
          </div>
        )}

        {/* CTA */}
        <button
          className="btn btn-primary"
          onClick={() => setCheckoutOpen(true)}
          disabled={allItems.length === 0}
          style={{
            width: '100%',
            opacity: allItems.length === 0 ? 0.4 : 1,
            cursor: allItems.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          <ShoppingBag size={15} />
          Rent This Workspace
        </button>
      </div>
    </aside>
  );
}
