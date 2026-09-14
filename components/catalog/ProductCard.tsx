'use client';

import { useState } from 'react';
import { Heart, ShoppingBag, Pencil } from 'lucide-react';
import { Product } from '@/data/types';
import { formatIDR, formatUSD, DURATION_DISCOUNTS } from '@/data/products';
import { useWorkspaceStore, useCurrency, useDuration } from '@/store/workspaceStore';

interface ProductCardProps {
  product: Product;
  isSelected?: boolean;
}

const BADGE_CONFIG = {
  bestseller: { label: 'Best seller', className: 'badge-bestseller' },
  new:        { label: 'New',         className: 'badge-new' },
  topbali:    { label: 'Top in Bali', className: 'badge-topbali' },
};

function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span className="stars" style={{ fontSize: 13 }}>
        {'★'.repeat(full)}{'☆'.repeat(5 - full)}
      </span>
      <span style={{ fontSize: 12, color: '#6b7280' }}>
        {rating} ({count.toLocaleString()})
      </span>
    </div>
  );
}

export default function ProductCard({ product, isSelected = false }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>(product.colorVariants?.[0]?.name || '');

  const { setDesk, setChair, toggleTech, toggleAccessory, setMode } = useWorkspaceStore();
  const currency = useCurrency();
  const duration = useDuration();

  const badge = product.badge ? BADGE_CONFIG[product.badge] : null;

  // Duration pricing
  const { multiplier, discount, label: durationLabel } = DURATION_DISCOUNTS[duration];
  const baseTotal = product.price * multiplier;
  const discountAmt = baseTotal * discount;
  const finalTotal = baseTotal - discountAmt;

  const displayPrice =
    currency === 'IDR' ? formatIDR(finalTotal) : formatUSD(finalTotal);
  const perDayDisplay =
    currency === 'IDR' ? formatIDR(product.price) : formatUSD(product.price);

  // Add to workspace
  const handleAdd = () => {
    if (product.category === 'desk')  setDesk(product);
    else if (product.category === 'chair') setChair(product);
    else if (product.category === 'tech')  toggleTech(product);
    else toggleAccessory(product);
  };

  // Open builder with this item
  const handleCustomize = () => {
    handleAdd();
    setMode('builder');
  };

  // Placeholder image background
  const PLACEHOLDER_COLORS: Record<string, string> = {
    desk:      '#f0fdf4',
    chair:     '#eff6ff',
    tech:      '#f5f3ff',
    accessory: '#fff7ed',
  };

  return (
    <div
      className="product-card"
      style={{
        outline: isSelected ? '2px solid #111827' : undefined,
        outlineOffset: isSelected ? '-1px' : undefined,
      }}
    >
      {/* ── Image area ── */}
      <div
        style={{
          position: 'relative',
          background: PLACEHOLDER_COLORS[product.category],
          overflow: 'hidden',
          aspectRatio: '1 / 1',
        }}
      >
        {/* Compare checkbox */}
        <label
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            cursor: 'pointer',
            zIndex: 2,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={comparing}
            onChange={() => setComparing(!comparing)}
            style={{ width: 14, height: 14, cursor: 'pointer', accentColor: '#111827' }}
          />
          <span style={{ fontSize: 11, color: '#4b5563', fontWeight: 500 }}>Compare</span>
        </label>

        {/* Badge */}
        {badge && (
          <div style={{ position: 'absolute', top: 10, left: 80, zIndex: 2 }}>
            <span className={badge.className}>{badge.label}</span>
          </div>
        )}

        {/* Wishlist heart */}
        <button
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '50%',
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
            transition: 'all 0.15s ease',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          }}
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            fill={wishlisted ? '#ef4444' : 'none'}
            color={wishlisted ? '#ef4444' : '#6b7280'}
          />
        </button>

        {/* Product Image */}
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image"
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '16px',
            }}
          />
        ) : (
          /* Fallback SVG illustration */
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: 16,
            }}
          >
            <div
              style={{
                fontSize: 52,
                lineHeight: 1,
                filter: 'saturate(0.8)',
              }}
            >
              {product.category === 'desk' && '🪵'}
              {product.category === 'chair' && '🪑'}
              {product.category === 'tech' && '🖥️'}
              {product.category === 'accessory' && '🌿'}
            </div>
          </div>
        )}
      </div>

      {/* ── Product Info ── */}
      <div style={{ padding: '14px 14px 16px' }}>
        {/* Name & subtitle */}
        <p
          style={{
            fontSize: 11,
            color: '#9ca3af',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: 2,
          }}
        >
          {product.subtitle}
        </p>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#111827',
            marginBottom: 4,
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>

        {/* Dimensions */}
        {product.dimensions && (
          <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>
            {product.dimensions}
          </p>
        )}

        {/* Rating */}
        <div style={{ marginBottom: 10 }}>
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>

        {/* Color variants */}
        {product.colorVariants && product.colorVariants.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, alignItems: 'center' }}>
            {product.colorVariants.map((cv) => (
              <button
                key={cv.name}
                type="button"
                title={cv.name}
                onClick={() => setSelectedColor(cv.name)}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: cv.hex,
                  border: '1px solid rgba(0,0,0,0.15)',
                  outline: selectedColor === cv.name ? '2px solid #111827' : 'none',
                  outlineOffset: 1,
                  cursor: 'pointer',
                  padding: 0,
                  flexShrink: 0,
                  transition: 'transform 0.1s',
                  transform: selectedColor === cv.name ? 'scale(1.15)' : 'none',
                }}
              />
            ))}
            <span style={{ fontSize: 11, color: '#6b7280', marginLeft: 2 }}>
              {selectedColor || `${product.colorVariants.length} colors`}
            </span>
          </div>
        )}

        {/* Pricing */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span className="price-daily">{displayPrice}</span>
            <span style={{ fontSize: 12, color: '#6b7280' }}>
              / {durationLabel.toLowerCase()}
            </span>
          </div>
          {duration !== 'daily' && (
            <p className="price-monthly" style={{ marginTop: 2 }}>
              {perDayDisplay}/day
              {discount > 0 && (
                <span className="price-savings" style={{ marginLeft: 8 }}>
                  Save {Math.round(discount * 100)}%
                </span>
              )}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: 12 }} />

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAdd}
            style={{ flex: 1 }}
          >
            <ShoppingBag size={13} />
            {isSelected ? 'Selected' : 'Add to Setup'}
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={handleCustomize}
            aria-label="Customize in builder"
            title="Open in Workspace Builder"
          >
            <Pencil size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
