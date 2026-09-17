'use client';

import { useMemo } from 'react';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { ALL_PRODUCTS } from '@/data/products';
import ProductCard from './ProductCard';

const TABS = [
  { id: 'all', label: 'All Equipment' },
  { id: 'tech', label: 'Monitors & Displays' },
  { id: 'desk', label: 'Standing Desks' },
  { id: 'chair', label: 'Ergonomic Chairs' },
  { id: 'accessory', label: 'Accessories & Nomad Gear' },
] as const;

export default function CatalogSection() {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useWorkspaceStore();
  const { desk, chair, tech, accessories } = useWorkspaceStore();

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
          p.description.toLowerCase().includes(q)
      );
    }

    return items;
  }, [activeCategory, searchQuery]);

  const selectedIds = new Set(
    [
      desk?.id,
      chair?.id,
      ...tech.map((p) => p.id),
      ...accessories.map((p) => p.id),
    ].filter(Boolean)
  );

  return (
    <section
      id="catalog"
      style={{
        background: '#ffffff',
        padding: '64px 0 80px',
        borderBottom: '1px solid #e5e7eb',
        scrollMarginTop: '80px',
      }}
    >
      <div className="wrap">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#6b7280',
                marginBottom: '6px',
              }}
            >
              Villa Workspace Inventory
            </div>
            <h2
              style={{
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 800,
                color: '#111827',
                letterSpacing: '-0.02em',
                marginBottom: '6px',
              }}
            >
              Rent tech & workspace essentials in Bali
            </h2>
            <p style={{ fontSize: '15px', color: '#6b7280' }}>
              Showing {filtered.length} of {ALL_PRODUCTS.length} curated pieces available for same-day delivery.
            </p>
          </div>

          {/* Search indicator / clear filter */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                background: '#f3f4f6',
                border: '1px solid #e5e7eb',
                fontSize: '12px',
                color: '#374151',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Filtering: &quot;{searchQuery}&quot;</span>
              <span style={{ fontWeight: 700 }}>✕</span>
            </button>
          )}
        </div>

        {/* Category Pill Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
            marginBottom: '32px',
            scrollbarWidth: 'none',
          }}
          role="tablist"
          aria-label="Product categories"
        >
          {TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`catalog-tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 600 : 500,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: isActive ? '#000000' : '#e5e7eb',
                  background: isActive ? '#000000' : '#ffffff',
                  color: isActive ? '#ffffff' : '#374151',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '24px',
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
        ) : (
          <div
            style={{
              padding: '64px 20px',
              textAlign: 'center',
              background: '#f9fafb',
              border: '1px dashed #e5e7eb',
              borderRadius: '16px',
            }}
          >
            <p style={{ fontSize: '17px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
              No equipment found
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
              We couldn&apos;t find any equipment matching &quot;{searchQuery}&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                background: '#000000',
                color: '#ffffff',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reset Filters ({ALL_PRODUCTS.length} products)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
