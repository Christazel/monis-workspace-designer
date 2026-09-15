'use client';

import { useState } from 'react';
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

  const priceDisplay =
    currency === 'IDR' ? formatIDR(product.price) : formatUSD(product.price);

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
    <div
      className="product-card"
      data-category={product.category}
      style={{
        cursor: 'pointer',
        boxShadow: isSelected ? 'inset 0 0 0 2px var(--indigo)' : undefined,
        position: 'relative',
      }}
      onClick={handleOpenBuilder}
      title="Click to view in Workspace Builder"
    >
      {/* Product Thumbnail */}
      <div className="product-thumb">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={280}
            height={200}
            style={{
              maxWidth: product.id === 'acc-surfboard' ? '60%' : '88%',
              maxHeight: product.id === 'acc-surfboard' ? '92%' : '86%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 10px rgba(22,33,29,0.08))',
              transition: 'transform 0.25s ease',
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <svg viewBox="0 0 100 80" style={{ width: '60%', height: '60%', opacity: 0.25 }}>
            <rect x="20" y="20" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}

        {/* Hover overlay: View in Builder */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(22,33,29,0.55)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            backdropFilter: 'blur(2px)',
          }}
          className="card-hover-overlay"
        >
          <span style={{
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            View in Builder →
          </span>
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="product-name">{product.name}</p>
        <p className="product-spec">
          {product.dimensions ? `${product.subtitle} · ${product.dimensions}` : product.subtitle}
        </p>
      </div>

      {/* Swatches */}
      <div className="swatches">
        {product.colorVariants && product.colorVariants.length > 0 ? (
          product.colorVariants.map((cv) => (
            <span
              key={cv.name}
              className="swatch"
              style={{ background: cv.hex }}
              title={cv.name}
            />
          ))
        ) : (
          <>
            <span className="swatch" style={{ background: '#16211D' }} />
            <span className="swatch" style={{ background: '#C9A46B' }} />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="product-foot">
        <div className="product-price">
          {priceDisplay}
          <small>per day</small>
        </div>

        <button
          className={`add-mini ${isSelected || justAdded ? 'added' : ''}`}
          type="button"
          aria-label="Add to setup"
          onClick={handleAdd}
          title={isSelected ? 'Remove from setup' : 'Add to setup'}
        >
          {isSelected || justAdded ? '✓' : '+'}
        </button>
      </div>
    </div>
  );
}
