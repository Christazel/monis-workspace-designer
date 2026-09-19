'use client';

import { useState } from 'react';
import { useWorkspaceStore, useTotal, useDuration, useCurrency } from '@/store/workspaceStore';
import { formatIDR, formatUSD } from '@/data/products';
import { RentalDuration } from '@/data/types';
import { X, Check } from 'lucide-react';

const BALI_AREAS = [
  'Canggu',
  'Pererenan',
  'Seminyak',
  'Berawa',
  'Ubud',
  'Uluwatu',
  'Sanur',
  'Kerobokan',
  'Bukit / Bingin',
];

export default function CheckoutDrawer() {
  const { checkoutOpen, setCheckoutOpen, getAllSelectedProducts, clearWorkspace } =
    useWorkspaceStore();
  const total = useTotal();
  const duration = useDuration();
  const currency = useCurrency();
  const { setDuration } = useWorkspaceStore();

  const [name, setName] = useState('');
  const [area, setArea] = useState('Canggu');
  const [startDate, setStartDate] = useState(() => {
    // Default to today in local date (YYYY-MM-DD)
    return new Date().toLocaleDateString('en-CA');
  });
  const [booked, setBooked] = useState(false);

  const allProducts = getAllSelectedProducts();

  const durationLabel =
    duration === 'daily'
      ? '1 Day'
      : duration === 'weekly'
      ? '1 Week (15% off)'
      : '1 Month (30% off)';

  const formatPrice = (amt: number) =>
    currency === 'IDR' ? formatIDR(amt) : formatUSD(amt);

  const handleBook = () => {
    if (!area || !startDate) return;
    setBooked(true);
    // Direct to the official real Monis website as requested
    window.open('https://www.monis.rent/', '_blank');
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    if (booked) {
      setBooked(false);
      clearWorkspace();
    }
  };

  if (!checkoutOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 110,
        }}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-heading"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 440,
          background: '#ffffff',
          zIndex: 120,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(0, 0, 0, 0.16)',
          borderLeft: '1px solid #e5e7eb',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 20px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#ffffff',
          }}
        >
          <div>
            <h3 id="drawer-heading" style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>
              Rent Your Workspace
            </h3>
            <p style={{ fontSize: 13, color: '#4b5563' }}>
              {allProducts.length} item{allProducts.length > 1 ? 's' : ''} · {durationLabel}
            </p>
          </div>
          <button
            onClick={handleClose}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              color: '#111827',
              borderRadius: '50%',
            }}
            aria-label="Close checkout drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {booked ? (
            /* Success State */
            <div style={{ textAlign: 'center', padding: '36px 0' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: '#10b981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <Check size={28} color="#ffffff" strokeWidth={3} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
                Redirecting to Monis.rent!
              </h3>
              <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.6, marginBottom: 24 }}>
                Your {durationLabel} workspace setup has been prepared. We are opening the official Monis.rent website to complete your reservation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  className="btn-primary"
                  type="button"
                  onClick={() => window.open('https://www.monis.rent/', '_blank')}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Visit Official Monis.rent →
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius)',
                    background: 'transparent',
                    border: '1px solid #e5e7eb',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#374151',
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Form */
            <div>
              {/* Setup list preview */}
              <div
                style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  marginBottom: 20,
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#6b7280',
                    marginBottom: 8,
                  }}
                >
                  Selected Items ({allProducts.length})
                </p>

                {allProducts.length === 0 ? (
                  <p style={{ fontSize: 13, color: '#9ca3af', fontStyle: 'italic' }}>
                    No items selected yet. Choose a desk and chair to begin.
                  </p>
                ) : (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {allProducts.map((p) => (
                      <li
                        key={p.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 13,
                          color: '#111827',
                        }}
                      >
                        <span style={{ fontWeight: 500 }}>{p.name}</span>
                        <span style={{ color: '#6b7280', flexShrink: 0, marginLeft: 8 }}>
                          {formatPrice(p.price)}/day
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Rental Duration Options */}
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#111827',
                    marginBottom: 8,
                  }}
                >
                  Rental Duration
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {(['daily', 'weekly', 'monthly'] as RentalDuration[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      style={{
                        padding: '10px 6px',
                        borderRadius: '10px',
                        border: '1px solid ' + (duration === d ? '#000000' : '#e5e7eb'),
                        background: duration === d ? '#000000' : '#ffffff',
                        color: duration === d ? '#ffffff' : '#374151',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ textTransform: 'capitalize' }}>{d}</div>
                      <div
                        style={{
                          fontSize: 10,
                          color: duration === d ? 'rgba(255,255,255,0.85)' : '#047857',
                          marginTop: 2,
                        }}
                      >
                        {d === 'weekly' ? '15% off' : d === 'monthly' ? '30% off' : 'standard'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label
                    htmlFor="checkout-name"
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#111827',
                      marginBottom: 6,
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    id="checkout-name"
                    name="name"
                    type="text"
                    placeholder="e.g. Alex"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid #e5e7eb',
                      background: '#ffffff',
                      color: '#111827',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-area"
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#111827',
                      marginBottom: 6,
                    }}
                  >
                    Bali Villa Delivery Area *
                  </label>
                  <select
                    id="checkout-area"
                    name="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid #e5e7eb',
                      background: '#ffffff',
                      color: '#111827',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  >
                    <option value="">Select your area...</option>
                    {BALI_AREAS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="checkout-start-date"
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#111827',
                      marginBottom: 6,
                    }}
                  >
                    Rental Start Date *
                  </label>
                  <input
                    id="checkout-start-date"
                    name="startDate"
                    type="date"
                    min={new Date().toLocaleDateString('en-CA')}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid #e5e7eb',
                      background: '#ffffff',
                      color: '#111827',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!booked && (
          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid #e5e7eb',
              background: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: '#4b5563' }}>
                Total for {durationLabel}:
              </span>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>
                {total.formatted}
              </span>
            </div>

            <button
              className="btn-primary"
              type="button"
              onClick={handleBook}
              disabled={!area || !startDate || allProducts.length === 0}
              style={{
                width: '100%',
                justifyContent: 'center',
                opacity: !area || !startDate || allProducts.length === 0 ? 0.5 : 1,
                cursor: !area || !startDate || allProducts.length === 0 ? 'not-allowed' : 'pointer',
                borderRadius: '9999px',
                padding: '13px',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Confirm on Official Monis.rent →
            </button>

            <p style={{ fontSize: 11, color: '#4b5563', textAlign: 'center', marginTop: 8 }}>
              No security deposit · Same-day delivery &amp; in-room setup across Bali
            </p>
          </div>
        )}
      </div>
    </>
  );
}
