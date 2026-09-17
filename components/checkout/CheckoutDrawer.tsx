'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useWorkspaceStore, useTotal } from '@/store/workspaceStore';
import { formatIDR, formatUSD, DURATION_DISCOUNTS } from '@/data/products';

const BALI_AREAS = [
  'Canggu / Batu Bolong',
  'Pererenan / Berawa',
  'Seminyak / Kerobokan',
  'Ubud / Tegalalang',
  'Uluwatu / Bingin',
  'Sanur / Denpasar',
  'Other area in Bali',
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
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(22,33,29,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 60,
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 420,
          background: 'var(--paper)',
          zIndex: 70,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(22,33,29,0.18)',
          borderLeft: '1px solid var(--line)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 20px',
            borderBottom: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--paper)',
          }}
        >
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>
              Rent Your Workspace
            </h3>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
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
              color: 'var(--ink)',
            }}
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
                  background: 'var(--sage)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <Check size={28} color="#ffffff" strokeWidth={3} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                Booking Sent!
              </h3>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 24 }}>
                Your WhatsApp request has been prepared. Our concierge will confirm delivery time to your villa shortly.
              </p>
              <button
                className="btn-primary"
                type="button"
                onClick={handleClose}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Done
              </button>
            </div>
          ) : (
            /* Form */
            <div>
              {/* Setup list preview */}
              <div
                style={{
                  background: 'var(--paper-2)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
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
                    color: 'var(--ink-soft)',
                    marginBottom: 8,
                  }}
                >
                  Selected Setup ({allProducts.length} items)
                </p>
                {allProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 12.5,
                      padding: '4px 0',
                    }}
                  >
                    <span style={{ color: 'var(--ink)' }}>{p.name}</span>
                    <span style={{ color: 'var(--brass)', fontWeight: 600 }}>
                      {formatPrice(p.price)}/day
                    </span>
                  </div>
                ))}
              </div>

              {/* Input fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--ink)',
                      marginBottom: 6,
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Graham"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--line)',
                      background: 'var(--paper-2)',
                      color: 'var(--ink)',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--ink)',
                      marginBottom: 6,
                    }}
                  >
                    Bali Villa Delivery Area *
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--line)',
                      background: 'var(--paper-2)',
                      color: 'var(--ink)',
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
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--ink)',
                      marginBottom: 6,
                    }}
                  >
                    Rental Start Date *
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--line)',
                      background: 'var(--paper-2)',
                      color: 'var(--ink)',
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
              borderTop: '1px solid var(--line)',
              background: 'var(--paper)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                Total for {durationLabel}:
              </span>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--brass)' }}>
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
              }}
            >
              Confirm &amp; Book via WhatsApp
            </button>

            <p style={{ fontSize: 11, color: 'var(--ink-soft)', textAlign: 'center', marginTop: 8 }}>
              No security deposit · Same-day delivery &amp; in-room setup
            </p>
          </div>
        )}
      </div>
    </>
  );
}
