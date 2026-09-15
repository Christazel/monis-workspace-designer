'use client';

import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';
import { DESKS, CHAIRS, TECH, ACCESSORIES, formatIDR, formatUSD } from '@/data/products';
import { Product } from '@/data/types';
import { Check } from 'lucide-react';

const SECTIONS = [
  { label: 'Desks', items: DESKS, type: 'desk' as const },
  { label: 'Chairs', items: CHAIRS, type: 'chair' as const },
  { label: 'Tech & Displays', items: TECH, type: 'tech' as const },
  { label: 'Accessories', items: ACCESSORIES, type: 'accessory' as const },
];

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
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '8px 10px',
        background: selected ? 'var(--paper-2)' : 'transparent',
        border: selected ? '1px solid var(--ink)' : '1px solid transparent',
        borderRadius: 'var(--radius)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.12s ease',
        marginBottom: 4,
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 38,
          height: 38,
          background: '#faf8f4',
          border: '1px solid var(--line)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
          padding: 3,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={36}
          height={36}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.style.display = 'none';
          }}
        />
      </div>

      {/* Name & Price */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--ink)',
            whiteSpace: 'normal',
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </p>
        <p style={{ fontSize: 11.5, color: 'var(--brass)', fontWeight: 700, marginTop: 2 }}>
          {priceDisplay}
          <span style={{ fontWeight: 400, color: 'var(--ink-soft)' }}>/day</span>
        </p>
      </div>

      {/* Check indicator */}
      {selected && (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Check size={12} color="var(--paper)" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

export default function ItemSelector() {
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

  return (
    <aside
      style={{
        width: 270,
        flexShrink: 0,
        background: 'var(--paper)',
        borderRight: '1px solid var(--line)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--line)',
          background: 'var(--paper)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <h3
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--ink)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Pick Your Items
        </h3>
        <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2 }}>
          Click to add or replace in setup
        </p>
      </div>

      <div style={{ padding: '14px 12px', flex: 1 }}>
        {SECTIONS.map((sec) => (
          <div key={sec.type} style={{ marginBottom: 20 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--ink-soft)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 8,
                paddingLeft: 4,
              }}
            >
              {sec.label}
            </p>

            {sec.items.map((product) => (
              <ItemRow
                key={product.id}
                product={product}
                selected={isSelected(product)}
                onToggle={() => handleToggle(product)}
              />
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
