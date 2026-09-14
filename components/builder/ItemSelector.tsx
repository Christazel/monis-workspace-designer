'use client';

import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';
import { DESKS, CHAIRS, TECH, ACCESSORIES, formatIDR, formatUSD } from '@/data/products';
import { Product } from '@/data/types';
import { Check } from 'lucide-react';

const SECTIONS = [
  { label: 'Desk',        items: DESKS,       type: 'desk'      as const },
  { label: 'Chair',       items: CHAIRS,      type: 'chair'     as const },
  { label: 'Tech',        items: TECH,        type: 'tech'      as const },
  { label: 'Accessories', items: ACCESSORIES, type: 'accessory' as const },
];

const FALLBACK_ICONS: Record<string, string> = {
  desk:      '🪵',
  chair:     '🪑',
  tech:      '🖥️',
  accessory: '🌿',
};

function ItemRow({
  product,
  selected,
  onToggle,
}: {
  product: Product;
  selected: boolean;
  onToggle: () => void;
}) {
  const currency = useCurrency();
  const priceDisplay = currency === 'IDR' ? formatIDR(product.price) : formatUSD(product.price);

  return (
    <button
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '8px 12px',
        background: selected ? '#f0fdf4' : 'transparent',
        border: selected ? '1px solid #86efac' : '1px solid transparent',
        borderRadius: 6,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.12s ease',
        marginBottom: 4,
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.background = '#f9fafb';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
        }
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 40,
          height: 40,
          background: '#f5f5f5',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: 20,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.style.display = 'none';
            const parent = img.parentElement;
            if (parent) {
              parent.textContent = FALLBACK_ICONS[product.category];
            }
          }}
        />
      </div>

      {/* Name & Price */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#111827',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {product.name}
        </p>
        <p style={{ fontSize: 11, color: '#9ca3af' }}>
          {priceDisplay}/day
        </p>
      </div>

      {/* Checkmark */}
      {selected && (
        <div
          style={{
            width: 20,
            height: 20,
            background: '#16a34a',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Check size={12} color="#ffffff" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

export default function ItemSelector() {
  const { desk, chair, tech, accessories, setDesk, setChair, toggleTech, toggleAccessory } =
    useWorkspaceStore();

  const isSelected = (product: Product) => {
    if (product.category === 'desk') return desk?.id === product.id;
    if (product.category === 'chair') return chair?.id === product.id;
    if (product.category === 'tech') return tech.some((p) => p.id === product.id);
    return accessories.some((p) => p.id === product.id);
  };

  const handleToggle = (product: Product) => {
    if (product.category === 'desk') {
      setDesk(desk?.id === product.id ? null : product);
    } else if (product.category === 'chair') {
      setChair(chair?.id === product.id ? null : product);
    } else if (product.category === 'tech') {
      toggleTech(product);
    } else {
      toggleAccessory(product);
    }
  };

  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        background: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        overflowY: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Panel header */}
      <div
        style={{
          padding: '12px 14px 10px',
          borderBottom: '1px solid #e5e7eb',
          background: '#fafafa',
          flexShrink: 0,
        }}
      >
        <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', letterSpacing: '0.01em' }}>
          Pick Your Items
        </p>
        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>Click to add to setup</p>
      </div>

      {/* Items scrollable list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
      {SECTIONS.map((section) => (
        <div
          key={section.type}
          style={{ borderBottom: '1px solid #e5e7eb', padding: '16px 12px' }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#9ca3af',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              marginBottom: 10,
              paddingLeft: 4,
            }}
          >
            {section.label}
          </p>
          {section.items.map((item) => (
            <ItemRow
              key={item.id}
              product={item}
              selected={isSelected(item)}
              onToggle={() => handleToggle(item)}
            />
          ))}
        </div>
      ))}
      </div>
    </aside>
  );
}
