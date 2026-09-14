'use client';

import { useState } from 'react';
import { X, MapPin, Calendar, MessageCircle, Check } from 'lucide-react';
import { useWorkspaceStore, useTotal, useDuration, useCurrency } from '@/store/workspaceStore';
import { formatIDR, formatUSD, DURATION_DISCOUNTS } from '@/data/products';

const BALI_AREAS = [
  'Canggu / Batu Bolong',
  'Pererenan / Berawa',
  'Seminyak / Kerobokan',
  'Ubud / Tegalalang',
  'Uluwatu / Bingin',
  'Sanur / Denpasar',
  'Other (custom delivery)',
];

export default function CheckoutDrawer() {
  const { checkoutOpen, setCheckoutOpen, getAllSelectedProducts, clearWorkspace, duration, currency } =
    useWorkspaceStore();
  const total = useTotal();

  const [area, setArea] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [booked, setBooked] = useState(false);

  const allProducts = getAllSelectedProducts();
  const { multiplier, discount } = DURATION_DISCOUNTS[duration];
  const durationLabel = DURATION_DISCOUNTS[duration].label;

  const formatPrice = (amt: number) =>
    currency === 'IDR' ? formatIDR(amt) : formatUSD(amt);

  const whatsappMessage = encodeURIComponent(
    `Hi Monis! I'd like to rent a workspace setup.\n\n` +
    `Name: ${name || '[Your Name]'}\n` +
    `Area: ${area || '[Your Bali area]'}\n` +
    `Start: ${startDate || '[Start date]'}\n` +
    `Duration: ${durationLabel}\n\n` +
    `Setup:\n` +
    allProducts.map((p) => `- ${p.name} (${formatPrice(p.price)}/day)`).join('\n') +
    `\n\nTotal: ${total.formatted}\n\nPlease confirm availability!`
  );

  const handleBook = () => {
    if (!area || !startDate) return;
    setBooked(true);
    // In a real app: open WhatsApp or submit order
    window.open(`https://wa.me/6281234567890?text=${whatsappMessage}`, '_blank');
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
      <div className="overlay" onClick={handleClose} />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 420,
          background: '#ffffff',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
          animation: 'slide-in-right 0.3s ease',
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
            flexShrink: 0,
          }}
        >
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>
              Rent Your Workspace
            </p>
            <p style={{ fontSize: 13, color: '#6b7280' }}>
              {allProducts.length} item{allProducts.length > 1 ? 's' : ''} — {durationLabel}
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              borderRadius: 4,
              color: '#6b7280',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {booked ? (
            /* ── Success state ── */
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: '#f0fdf4',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <Check size={32} color="#16a34a" strokeWidth={3} />
              </div>
              <p style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 8 }}>
                Booking sent!
              </p>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 24 }}>
                Your WhatsApp booking message has been sent to Monis. We'll confirm your villa
                delivery within 1 hour.
              </p>
              <div
                style={{
                  background: '#f9fafb',
                  borderRadius: 8,
                  padding: '16px',
                  textAlign: 'left',
                }}
              >
                <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
                  What happens next:
                </p>
                {[
                  'Monis confirms availability & delivery time',
                  'We deliver & set up everything in your villa',
                  'Start working — we handle the rest',
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        background: '#111827',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: 10, color: '#ffffff', fontWeight: 700 }}>{i + 1}</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#374151' }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ── Booking form ── */
            <>
              {/* Items summary */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                  Your Setup
                </p>
                {allProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid #f3f4f6',
                      gap: 10,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          background: '#f9fafb',
                          borderRadius: 4,
                          border: '1px solid #e5e7eb',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 2 }}
                        />
                      </div>
                      <span style={{ fontSize: 13, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.name}
                      </span>
                    </div>
                    <span style={{ fontSize: 13, color: '#6b7280', flexShrink: 0 }}>
                      {formatPrice(p.price)}/day
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery area */}
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: 8,
                  }}
                >
                  <MapPin size={14} />
                  Delivery Area in Bali
                </label>
                <select
                  className="input"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option value="">Select your Bali area...</option>
                  {BALI_AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: 8,
                  }}
                >
                  Your Name
                </label>
                <input
                  className="input"
                  type="text"
                  placeholder="e.g. Alex Nguyen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Start date */}
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: 8,
                  }}
                >
                  <Calendar size={14} />
                  Rental Start Date
                </label>
                <input
                  className="input"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Price breakdown */}
              <div
                style={{
                  background: '#f9fafb',
                  borderRadius: 8,
                  padding: '16px',
                  marginBottom: 8,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: '#6b7280' }}>
                    {allProducts.length} items × {multiplier} day{multiplier > 1 ? 's' : ''}
                  </span>
                  <span style={{ fontSize: 13, color: '#6b7280' }}>
                    {formatPrice(total.subtotal)}
                  </span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
                      {Math.round(discount * 100)}% duration discount
                    </span>
                    <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
                      -{formatPrice(total.discount)}
                    </span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: '#6b7280' }}>Delivery & setup</span>
                  <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>Free</span>
                </div>
                <div className="divider" style={{ margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>Total</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#111827' }}>
                    {total.formatted}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginBottom: 4 }}>
                No payment upfront. We confirm then invoice.
              </p>
            </>
          )}
        </div>

        {/* Footer CTA */}
        {!booked && (
          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid #e5e7eb',
              flexShrink: 0,
            }}
          >
            <button
              className="btn btn-primary"
              onClick={handleBook}
              disabled={!area || !startDate}
              style={{
                width: '100%',
                opacity: !area || !startDate ? 0.4 : 1,
                cursor: !area || !startDate ? 'not-allowed' : 'pointer',
                fontSize: 15,
                padding: '14px 20px',
              }}
            >
              <MessageCircle size={16} />
              Book via WhatsApp
            </button>
            {(!area || !startDate) && (
              <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', marginTop: 8 }}>
                Please select your Bali area and start date to continue
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
