'use client';

import { useWorkspaceStore } from '@/store/workspaceStore';

const CATEGORIES = [
  { id: 'all',       label: 'All Products' },
  { id: 'desk',      label: 'Desks' },
  { id: 'chair',     label: 'Chairs' },
  { id: 'tech',      label: 'Tech & Displays' },
  { id: 'accessory', label: 'Accessories' },
] as const;

export default function CategoryTabs() {
  const { activeCategory, setActiveCategory } = useWorkspaceStore();

  return (
    <div
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', gap: 0 }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`tab-item ${activeCategory === cat.id ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
