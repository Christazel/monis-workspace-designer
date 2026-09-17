'use client';

import { useMemo } from 'react';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { ALL_PRODUCTS } from '@/data/products';
import ProductCard from './ProductCard';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'desk', label: 'Desks' },
  { id: 'chair', label: 'Chairs' },
  { id: 'tech', label: 'Tech & monitors' },
  { id: 'accessory', label: 'Accessories' },
] as const;

export default function CatalogSection() {
  const { activeCategory, setActiveCategory, searchQuery } = useWorkspaceStore();
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
    <section className="catalog" id="catalog" style={{ scrollMarginTop: '80px' }}>
      <div className="wrap">
        <div className="section-head">
          <h2>Browse the full catalog</h2>
          <p>{ALL_PRODUCTS.length} curated pieces, from electric standing desks to ergonomic mesh chairs.</p>
        </div>

        {/* Filter tabs */}
        <div className="tabs" role="tablist" aria-label="Product categories">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              id={`catalog-tab-${tab.id}`}
              className={`tab ${activeCategory === tab.id ? 'active' : ''}`}
              role="tab"
              aria-selected={activeCategory === tab.id}
              aria-controls="catalog-product-grid"
              onClick={() => setActiveCategory(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="product-grid" id="catalog-product-grid" role="tabpanel" aria-labelledby={`catalog-tab-${activeCategory}`}>
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
              padding: '60px 20px',
              textAlign: 'center',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius)',
            }}
          >
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
              No products found
            </p>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 16 }}>
              We couldn&apos;t find any products matching your current selection.
            </p>
            <button
              type="button"
              className="tab active"
              onClick={() => {
                setActiveCategory('all');
                useWorkspaceStore.getState().setSearchQuery('');
              }}
            >
              Show all products ({ALL_PRODUCTS.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
