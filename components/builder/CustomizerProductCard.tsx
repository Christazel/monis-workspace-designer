'use client';

import React from 'react';
import { Product } from '@/data/types';
import { useCurrency } from '@/store/workspaceStore';
import { formatMonthlyRate, formatIDR, formatUSD } from '@/data/products';
import { Check, Plus, Minus } from 'lucide-react';

interface CustomizerProductCardProps {
  product: Product;
  selected: boolean;
  onSelect: () => void;
  isMultiSelect?: boolean;
}

export default function CustomizerProductCard({
  product,
  selected,
  onSelect,
  isMultiSelect = false,
}: CustomizerProductCardProps) {
  const currency = useCurrency();
  const monthlyPrice = formatMonthlyRate(product.price, currency);
  const dailyPrice = currency === 'IDR' ? formatIDR(product.price) : formatUSD(product.price);

  return (
    <div
      onClick={onSelect}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '12px 14px',
        borderRadius: 12,
        background: selected ? 'var(--paper-2)' : 'var(--paper)',
        border: selected
          ? '2px solid var(--ink)'
          : '1px solid var(--line)',
        boxShadow: selected
          ? '0 6px 16px rgba(22, 33, 29, 0.12)'
          : '0 2px 6px rgba(0, 0, 0, 0.02)',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        userSelect: 'none',
      }}
      className="customizer-card"
    >
      {/* Top Row: Thumbnail + Details */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* Product Thumbnail */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 8,
            background: '#ffffff',
            border: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
            padding: 4,
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transition: 'transform 0.2s ease',
            }}
          />
        </div>

        {/* Title, Subtitle, & Description */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6 }}>
            <h4
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--ink)',
                margin: 0,
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.name}
            </h4>
            {selected && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#16a34a',
                  background: 'rgba(22, 163, 74, 0.1)',
                  padding: '2px 6px',
                  borderRadius: 20,
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                <Check size={10} strokeWidth={3} />
                Terpilih
              </span>
            )}
          </div>

          {product.subtitle && (
            <p
              style={{
                fontSize: 11,
                color: 'var(--ink-soft)',
                marginTop: 2,
                marginBottom: 0,
                fontWeight: 500,
              }}
            >
              {product.subtitle}
            </p>
          )}

          <p
            style={{
              fontSize: 11,
              color: 'var(--ink-soft)',
              marginTop: 4,
              marginBottom: 0,
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              opacity: 0.9,
            }}
          >
            {product.description}
          </p>
        </div>
      </div>

      {/* Bottom Row: Monthly Price & Action Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 8,
          borderTop: '1px solid var(--line-soft)',
          marginTop: 2,
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
          <span
            style={{
              fontSize: 12.5,
              fontWeight: 800,
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            {monthlyPrice}
          </span>
          <span
            style={{
              fontSize: 10.5,
              color: 'var(--ink-soft)',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            {dailyPrice}/hari
          </span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            padding: '5px 12px',
            minWidth: 64,
            height: 28,
            borderRadius: 20,
            fontSize: 11.5,
            fontWeight: 700,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.15s ease',
            border: selected
              ? '1px solid var(--ink)'
              : '1px solid var(--line)',
            background: selected
              ? (isMultiSelect ? 'rgba(239, 68, 68, 0.1)' : 'var(--ink)')
              : 'transparent',
            color: selected
              ? (isMultiSelect ? '#dc2626' : 'var(--paper)')
              : 'var(--ink)',
          }}
        >
          {isMultiSelect ? (
            selected ? (
              <>
                <Minus size={11} strokeWidth={2.5} />
                <span>Hapus</span>
              </>
            ) : (
              <>
                <Plus size={11} strokeWidth={2.5} />
                <span>Tambah</span>
              </>
            )
          ) : selected ? (
            <>
              <Check size={11} strokeWidth={2.5} />
              <span>Aktif</span>
            </>
          ) : (
            <span>Pilih</span>
          )}
        </button>
      </div>
    </div>
  );
}
