'use client';

import { useState } from 'react';
import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';
import { DESKS, CHAIRS, TECH, ACCESSORIES, formatIDR, formatUSD } from '@/data/products';
import { Product } from '@/data/types';
import { Check, Plus, Layers, Armchair, Monitor, Sparkles } from 'lucide-react';

const SECTIONS = [
  { id: 'desk', label: 'Desks', items: DESKS, icon: Layers },
  { id: 'chair', label: 'Chairs', items: CHAIRS, icon: Armchair },
  { id: 'tech', label: 'Tech', fullLabel: 'Tech & Displays', items: TECH, icon: Monitor },
  { id: 'accessory', label: 'Accessories', items: ACCESSORIES, icon: Sparkles },
];

function ProductCard({
  product,
  selected,
  onToggle,
}: {
  product: Product;
  selected: boolean;
  onToggle: () => void;
}) {
  const currency = useCurrency();
  const priceDisplay =
    currency === 'IDR' ? formatIDR(product.price) : formatUSD(product.price);

  return (
    <div
      style={{
        background: selected ? 'var(--paper-2)' : 'var(--paper)',
        border: selected ? '1.5px solid var(--ink)' : '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        transition: 'all 0.15s ease',
        boxShadow: selected ? '0 4px 14px rgba(22,33,29,0.08)' : 'none',
      }}
    >
      {/* Thumbnail + Badges */}
      <div
        style={{
          width: '100%',
          height: 124,
          minHeight: 124,
          flexShrink: 0,
          background: '#f6f3ee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '8px 12px',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="eager"
          style={{
            maxWidth: '85%',
            maxHeight: '92px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            transition: 'transform 0.2s ease',
          }}
        />

        {product.badge && (
          <span
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              fontSize: 9.5,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '2px 7px',
              borderRadius: 4,
              background: product.badge === 'bestseller' ? 'var(--ink)' : 'var(--brass)',
              color: '#ffffff',
              zIndex: 2,
            }}
          >
            {product.badge === 'bestseller' ? 'Top Pick' : 'Staff Pick'}
          </span>
        )}

        <span
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontSize: 10.5,
            fontWeight: 700,
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(4px)',
            border: '1px solid var(--line)',
            color: 'var(--ink)',
            padding: '2px 7px',
            borderRadius: 4,
            zIndex: 2,
          }}
        >
          {priceDisplay}
          <span style={{ fontSize: 9.5, fontWeight: 400, color: 'var(--ink-soft)' }}>/day</span>
        </span>
      </div>

      {/* Info & Action */}
      <div
        style={{
          padding: '10px 12px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.3,
              marginBottom: 2,
            }}
          >
            {product.name}
          </p>
          <p
            style={{
              fontSize: 11.5,
              color: 'var(--ink-soft)',
              lineHeight: 1.35,
            }}
          >
            {product.subtitle}
          </p>
        </div>

        <button
          onClick={onToggle}
          type="button"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: '7px 12px',
            borderRadius: 'var(--radius)',
            border: '1px solid ' + (selected ? 'var(--ink)' : 'var(--line)'),
            background: selected ? 'var(--ink)' : 'transparent',
            color: selected ? 'var(--paper)' : 'var(--ink)',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {selected ? (
            <>
              <Check size={13} strokeWidth={2.5} />
              <span>Added to Setup</span>
            </>
          ) : (
            <>
              <Plus size={13} strokeWidth={2.5} />
              <span>Add to Setup</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function ItemSelector() {
  const [activeTab, setActiveTab] = useState<string>('desk');

  const {
    desk,
    chair,
    tech,
    accessories,
    setDesk,
    setChair,
    toggleTech,
    toggleAccessory,
  } = useWorkspaceStore();

  const isSelected = (product: Product): boolean => {
    if (product.category === 'desk') return desk?.id === product.id;
    if (product.category === 'chair') return chair?.id === product.id;
    if (product.category === 'tech') return tech.some((t) => t.id === product.id);
    if (product.category === 'accessory') return accessories.some((a) => a.id === product.id);
    return false;
  };

  const handleToggle = (product: Product) => {
    if (product.category === 'desk') {
      setDesk(desk?.id === product.id ? null : product);
    } else if (product.category === 'chair') {
      setChair(chair?.id === product.id ? null : product);
    } else if (product.category === 'tech') {
      toggleTech(product);
    } else if (product.category === 'accessory') {
      toggleAccessory(product);
    }
  };

  const activeSection = SECTIONS.find((s) => s.id === activeTab) ?? SECTIONS[0];

  return (
    <aside
      style={{
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header + Tabs */}
      <div
        style={{
          padding: '14px 16px 0',
          background: 'var(--paper)',
          borderBottom: '1px solid var(--line)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h3
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--ink)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
            }}
          >
            Equipment Catalog
          </h3>
          <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>
            {activeSection.items.length} items
          </span>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            paddingBottom: 2,
          }}
        >
          {SECTIONS.map((sec) => {
            const isActive = sec.id === activeTab;
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                type="button"
                title={sec.fullLabel || sec.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11.5,
                  fontWeight: isActive ? 700 : 500,
                  padding: '6px 8px',
                  borderRadius: '6px 6px 0 0',
                  border: 'none',
                  borderBottom: isActive
                    ? '2.5px solid var(--ink)'
                    : '2.5px solid transparent',
                  background: 'transparent',
                  color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                <Icon size={12} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards Container */}
      <div
        className="builder-items-grid"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 12px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {activeSection.items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            selected={isSelected(product)}
            onToggle={() => handleToggle(product)}
          />
        ))}
      </div>
    </aside>
  );
}


