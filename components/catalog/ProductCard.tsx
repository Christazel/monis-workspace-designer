'use client';

import { useState } from 'react';
import { Product } from '@/data/types';
import { formatIDR, formatUSD } from '@/data/products';
import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';

interface ProductCardProps {
  product: Product;
  isSelected?: boolean;
}

// Clean Scandinavian vector illustrations matching the hero-art style
function ProductArt({ product }: { product: Product }) {
  if (product.id === 'desk-standing-oak') {
    return (
      <svg viewBox="0 0 100 80">
        <rect x="10" y="34" width="80" height="9" rx="1.5" fill="#16211D" />
        <rect x="16" y="43" width="5" height="26" fill="#16211D" />
        <rect x="79" y="43" width="5" height="26" fill="#16211D" />
        <rect x="30" y="14" width="40" height="20" rx="2" fill="none" stroke="#16211D" strokeWidth="2.5" />
      </svg>
    );
  }
  if (product.id === 'desk-walnut-executive') {
    return (
      <svg viewBox="0 0 100 80">
        <rect x="8" y="30" width="84" height="12" rx="2" fill="#96492F" />
        <rect x="14" y="42" width="20" height="26" fill="#16211D" />
        <rect x="66" y="42" width="20" height="26" fill="#16211D" />
        <rect x="20" y="48" width="8" height="2" fill="#A87A34" />
        <rect x="72" y="48" width="8" height="2" fill="#A87A34" />
      </svg>
    );
  }
  if (product.id === 'desk-white-minimal' || product.category === 'desk') {
    return (
      <svg viewBox="0 0 100 80">
        <rect x="10" y="34" width="80" height="9" rx="1.5" fill="#16211D" />
        <rect x="16" y="43" width="5" height="26" fill="#16211D" />
        <rect x="79" y="43" width="5" height="26" fill="#16211D" />
      </svg>
    );
  }
  if (product.id === 'chair-aeron') {
    return (
      <svg viewBox="0 0 100 80">
        <path d="M40 12c-8 0-14 20-8 32 4 8 20 8 24 0 6-12 0-32-8-32Z" fill="none" stroke="#16211D" strokeWidth="2.5" />
        <line x1="42" y1="44" x2="42" y2="66" stroke="#16211D" strokeWidth="4" />
        <line x1="30" y1="66" x2="54" y2="66" stroke="#16211D" strokeWidth="3" />
      </svg>
    );
  }
  if (product.id === 'chair-markus-mesh' || product.category === 'chair') {
    return (
      <svg viewBox="0 0 100 80">
        <path d="M40 14c-7 0-12 18-7 30 4 7 18 7 22 0 5-12 0-30-8-30Z" fill="none" stroke="#16211D" strokeWidth="2.5" />
        <line x1="42" y1="44" x2="42" y2="66" stroke="#16211D" strokeWidth="4" />
        <line x1="30" y1="66" x2="54" y2="66" stroke="#16211D" strokeWidth="3" />
      </svg>
    );
  }
  if (product.id === 'tech-ultrawide' || product.id === 'tech-4k-27') {
    return (
      <svg viewBox="0 0 100 80">
        <rect x="14" y="16" width="72" height="42" rx="3" fill="none" stroke="#16211D" strokeWidth="2.5" />
        <rect x="14" y="16" width="72" height="42" rx="3" fill="#26355C" />
        <rect x="42" y="58" width="16" height="10" fill="#16211D" />
        <rect x="30" y="68" width="40" height="5" rx="2" fill="#16211D" />
      </svg>
    );
  }
  if (product.id === 'accessory-screenbar') {
    return (
      <svg viewBox="0 0 100 80">
        <path d="M28 44c0-14 10-24 22-24s22 10 22 24" fill="none" stroke="#16211D" strokeWidth="3" />
        <rect x="22" y="44" width="10" height="16" rx="3" fill="#16211D" />
        <rect x="68" y="44" width="10" height="16" rx="3" fill="#16211D" />
      </svg>
    );
  }
  if (product.id === 'accessory-monstera') {
    return (
      <svg viewBox="0 0 100 80">
        <path d="M50 48 L50 72" stroke="#16211D" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 48 C40 32, 60 32, 60 48 C60 58, 40 58, 40 48" fill="#56624A" />
        <path d="M50 48 C36 46, 32 30, 42 20" fill="none" stroke="#56624A" strokeWidth="6" strokeLinecap="round" />
        <path d="M50 48 C64 42, 68 24, 58 14" fill="none" stroke="#56624A" strokeWidth="6" strokeLinecap="round" />
        <rect x="36" y="62" width="28" height="16" rx="2" fill="#96492F" />
      </svg>
    );
  }
  if (product.id === 'accessory-surfboard') {
    return (
      <svg viewBox="0 0 100 80">
        <ellipse cx="50" cy="40" rx="14" ry="34" fill="#C9A46B" stroke="#16211D" strokeWidth="2" />
        <line x1="50" y1="8" x2="50" y2="72" stroke="#A87A34" strokeWidth="2" />
        <circle cx="50" cy="30" r="4" fill="#26355C" />
      </svg>
    );
  }
  // Default accessory
  return (
    <svg viewBox="0 0 100 80">
      <rect x="24" y="24" width="52" height="36" rx="4" fill="#E3DBC7" stroke="#16211D" strokeWidth="2" />
      <circle cx="50" cy="42" r="10" fill="#26355C" />
    </svg>
  );
}

export default function ProductCard({ product, isSelected = false }: ProductCardProps) {
  const { setDesk, setChair, toggleTech, toggleAccessory, setMode } = useWorkspaceStore();
  const currency = useCurrency();
  const [justAdded, setJustAdded] = useState(false);

  const priceDisplay =
    currency === 'IDR' ? formatIDR(product.price) : formatUSD(product.price);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.category === 'desk') setDesk(product);
    else if (product.category === 'chair') setChair(product);
    else if (product.category === 'tech') toggleTech(product);
    else toggleAccessory(product);

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 800);
  };

  const handleOpenBuilder = () => {
    if (product.category === 'desk') setDesk(product);
    else if (product.category === 'chair') setChair(product);
    else if (product.category === 'tech') toggleTech(product);
    else toggleAccessory(product);

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
      }}
      onClick={handleOpenBuilder}
      title="Click to view in Workspace Builder"
    >
      {/* Product Thumbnail */}
      <div className="product-thumb">
        <img
          src={`${product.image}?v=4`}
          alt={product.name}
          style={{
            maxWidth: product.id === 'acc-surfboard' ? '60%' : '88%',
            maxHeight: product.id === 'acc-surfboard' ? '92%' : '86%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 10px rgba(22,33,29,0.08))',
            transition: 'transform 0.25s ease',
          }}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.style.display = 'none';
          }}
        />
      </div>

      {/* Info */}
      <div>
        <p className="product-name">{product.name}</p>
        <p className="product-spec">{product.subtitle} · {product.dimensions || 'Bali villa edition'}</p>
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
