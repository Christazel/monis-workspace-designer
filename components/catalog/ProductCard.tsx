'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/types';
import { formatIDR, formatUSD } from '@/data/products';
import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';

interface ProductCardProps {
  product: Product;
  isSelected?: boolean;
}

export default function ProductCard({ product, isSelected = false }: ProductCardProps) {
  const { setDesk, setChair, toggleTech, toggleAccessory, setMode } = useWorkspaceStore();
  const currency = useCurrency();
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const priceDaily =
    currency === 'IDR' ? formatIDR(product.price) : formatUSD(product.price);
  const monthlyRate = Math.round((product.price * 30 * 0.7) / 30); // 30% discount monthly
  const priceMonthly =
    currency === 'IDR' ? formatIDR(monthlyRate) : formatUSD(monthlyRate);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.category === 'desk') {
      setDesk(isSelected ? null : product);
    } else if (product.category === 'chair') {
      setChair(isSelected ? null : product);
    } else if (product.category === 'tech') {
      toggleTech(product);
    } else {
      toggleAccessory(product);
    }

    if (!isSelected) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 800);
    }
  };

  const handleOpenBuilder = () => {
    if (!isSelected) {
      if (product.category === 'desk') setDesk(product);
      else if (product.category === 'chair') setChair(product);
      else if (product.category === 'tech') toggleTech(product);
      else toggleAccessory(product);
    }

    setMode('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article
      style={{
        background: 'var(--paper)',
        border: isSelected ? '2px solid var(--ink)' : '1px solid var(--line)',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxShadow: isSelected
          ? '0 8px 20px -4px rgba(0, 0, 0, 0.12)'
          : '0 1px 3px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
      className="hover:shadow-lg hover:-translate-y-0.5"
      onClick={handleOpenBuilder}
      title="Click to view in Studio Configurator"
    >
      <div>
        {/* Product Thumbnail Box */}
        <div
          style={{
            position: 'relative',
            background: 'var(--paper-2)',
            borderRadius: '12px',
            height: '210px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginBottom: '14px',
            padding: '12px',
          }}
        >
          {/* Top Badge */}
          {product.badge && (
            <span
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: product.badge === 'bestseller' ? 'var(--ink)' : 'var(--sage)',
                color: 'var(--paper)',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '3px 8px',
                borderRadius: '9999px',
                zIndex: 2,
              }}
            >
              {product.badge === 'bestseller' ? 'Popular' : product.badge}
            </span>
          )}

          {!imgError ? (
            <Image
              src={product.image}
              alt={product.name}
              width={260}
              height={190}
              unoptimized
              style={{
                maxWidth: product.id === 'acc-surfboard' ? '50%' : '90%',
                maxHeight: '90%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                transition: 'transform 0.25s ease',
              }}
              onError={() => setImgError(true)}
            />
          ) : (
            <svg viewBox="0 0 100 80" style={{ width: '50%', height: '50%', opacity: 0.25 }}>
              <rect x="20" y="20" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}

          {/* Hover overlay hint */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(4px)',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--ink)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            ⚡ Studio 2D
          </div>
        </div>

        {/* Category Tag */}
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--ink-soft)',
            marginBottom: '4px',
          }}
        >
          {product.category}
        </div>

        {/* Product Title */}
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--ink)',
            lineHeight: 1.3,
            marginBottom: '4px',
          }}
        >
          {product.name}
        </h3>

        {/* Specifications */}
        <p
          style={{
            fontSize: '13px',
            color: 'var(--ink-soft)',
            lineHeight: 1.4,
            marginBottom: '14px',
          }}
        >
          {product.dimensions ? `${product.subtitle} · ${product.dimensions}` : product.subtitle}
        </p>

        {/* Key Features Chips */}
        {product.features && product.features.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
            {product.features.slice(0, 2).map((feat) => (
              <span
                key={feat}
                style={{
                  fontSize: '11px',
                  color: 'var(--ink-soft)',
                  background: 'var(--paper-3)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontWeight: 500,
                }}
              >
                {feat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Price & Add Button */}
      <div
        style={{
          borderTop: '1px solid var(--line-soft)',
          paddingTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)' }}>
              {priceDaily}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>/day</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--sage)', fontWeight: 600 }}>
            {priceMonthly}/day (monthly)
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          aria-label={`${isSelected ? 'Remove' : 'Add'} ${product.name} ${isSelected ? 'from' : 'to'} setup`}
          style={{
            padding: '8px 14px',
            borderRadius: '9999px',
            background: isSelected || justAdded ? 'var(--sage)' : 'var(--ink)',
            color: 'var(--paper)',
            border: 'none',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.15s ease',
          }}
        >
          {isSelected || justAdded ? '✓ Added' : '+ Add to Setup'}
        </button>
      </div>
    </article>
  );
}
