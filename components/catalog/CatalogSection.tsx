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
    <section className="catalog" id="catalog">
      <div className="wrap">
        <div className="section-head">
          <h2>Browse the full catalog</h2>
          <p>{ALL_PRODUCTS.length} curated pieces, from electric standing desks to ergonomic mesh chairs.</p>
        </div>

        {/* Filter tabs */}
        <div className="tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeCategory === tab.id ? 'active' : ''}`}
              role="tab"
              aria-selected={activeCategory === tab.id}
              onClick={() => setActiveCategory(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedIds.has(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
