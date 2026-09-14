'use client';

import { useMemo } from 'react';
import { useWorkspaceStore, useCurrency, useDuration } from '@/store/workspaceStore';
import { ALL_PRODUCTS, DURATION_DISCOUNTS } from '@/data/products';
import ProductCard from './ProductCard';
import CategoryTabs from './CategoryTabs';

const DURATION_OPTIONS = [
  { id: 'daily',   label: '1 Day' },
  { id: 'weekly',  label: '1 Week  −10%' },
  { id: 'monthly', label: '1 Month  −20%' },
] as const;

export default function CatalogSection() {
  const { activeCategory, searchQuery, setMode, setDuration } = useWorkspaceStore();
  const currency = useCurrency();
  const duration = useDuration();
  const { desk, chair, tech, accessories } = useWorkspaceStore();

  // Filter products
  const filtered = useMemo(() => {
    let items = ALL_PRODUCTS;

    if (activeCategory !== 'all') {
      items = items.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    return items;
  }, [activeCategory, searchQuery]);

  // Track selected IDs
  const selectedIds = new Set([
    desk?.id,
    chair?.id,
    ...tech.map((p) => p.id),
    ...accessories.map((p) => p.id),
  ].filter(Boolean));

  return (
    <section>
      {/* Category Tabs */}
      <CategoryTabs />

      {/* ── Filter bar + count ── */}
      <div
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '10px 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          {/* Results count */}
          <p style={{ fontSize: 14, color: '#4b5563' }}>
            <strong style={{ color: '#111827' }}>{filtered.length}</strong>{' '}
            {filtered.length === 1 ? 'item' : 'items'}
            {searchQuery && (
              <span> for &ldquo;<em>{searchQuery}</em>&rdquo;</span>
            )}
          </p>

          {/* Rental duration toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500, whiteSpace: 'nowrap' }}>
              Rental period:
            </span>
            <div
              style={{
                display: 'flex',
                background: '#f5f5f5',
                borderRadius: 4,
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
              }}
            >
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDuration(opt.id)}
                  style={{
                    padding: '5px 12px',
                    background: duration === opt.id ? '#111827' : 'transparent',
                    color: duration === opt.id ? '#ffffff' : '#4b5563',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: duration === opt.id ? 600 : 400,
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── "Design your office space" banner (IKEA-style) ── */}
      <div
        className="container"
        style={{ paddingTop: 20, paddingBottom: 0 }}
      >
        <button
          onClick={() => setMode('builder')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            width: '100%',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: 4,
            padding: '14px 20px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#9ca3af';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 40,
              height: 40,
              background: '#f5f5f5',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 2 }}>
              Design your own office space
            </p>
            <p style={{ fontSize: 13, color: '#6b7280' }}>
              Configure your complete Bali workspace setup visually — then rent in one click.
            </p>
          </div>
          <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#111827',
                textDecoration: 'underline',
                textUnderlineOffset: 2,
              }}
            >
              Get started
            </span>
          </div>
        </button>
      </div>

      {/* ── Product grid ── */}
      <div className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>🔍</p>
            <p style={{ fontSize: 16, color: '#6b7280', fontWeight: 500 }}>
              No items found for &ldquo;{searchQuery}&rdquo;
            </p>
            <p style={{ fontSize: 14, color: '#9ca3af', marginTop: 6 }}>
              Try a different keyword or browse all categories.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedIds.has(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
