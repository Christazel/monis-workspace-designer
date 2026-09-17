'use client';

import { Check, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { formatMonthlyRate, formatIDR, formatUSD, DURATION_DISCOUNTS } from '@/data/products';
import { Product } from '@/data/types';

export default function WorkspaceSummary() {
  const {
    desk,
    chair,
    tech,
    accessories,
    setDesk,
    setChair,
    toggleTech,
    toggleAccessory,
    clearWorkspace,
    setCheckoutOpen,
    currency,
    setCurrency,
  } = useWorkspaceStore();

  const allAccessories: Product[] = [...tech, ...accessories];
  const allItems: Product[] = [
    ...(desk ? [desk] : []),
    ...(chair ? [chair] : []),
    ...allAccessories,
  ];

  // Calculate monthly rental total
  const dailySubtotal = allItems.reduce((sum, p) => sum + p.price, 0);
  const monthlyMultiplier = DURATION_DISCOUNTS.monthly.multiplier; // 30
  const monthlyDiscount = DURATION_DISCOUNTS.monthly.discount; // 0.20
  const monthlySubtotal = dailySubtotal * monthlyMultiplier;
  const monthlySavings = monthlySubtotal * monthlyDiscount;
  const monthlyTotal = monthlySubtotal - monthlySavings;

  const formattedMonthlyTotal =
    currency === 'IDR' ? `${formatIDR(monthlyTotal)}/bulan` : `${formatUSD(monthlyTotal)}/month`;

  return (
    <aside
      style={{
        width: 320,
        maxWidth: '100%',
        flexShrink: 0,
        background: 'var(--paper)',
        borderLeft: '1px solid var(--line)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: '16px 18px',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3
            style={{
              fontSize: 14.5,
              fontWeight: 800,
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Workspace Saya
          </h3>
          <span
            style={{
              background: 'var(--ink)',
              color: 'var(--paper)',
              fontSize: 11,
              fontWeight: 800,
              width: 20,
              height: 20,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {allItems.length}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Currency Switcher */}
          <button
            type="button"
            onClick={() => setCurrency(currency === 'IDR' ? 'USD' : 'IDR')}
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 12,
              border: '1px solid var(--line)',
              background: 'var(--paper-2)',
              color: 'var(--ink)',
              cursor: 'pointer',
            }}
            title="Ganti mata uang"
            aria-label={`Switch currency between IDR and USD, currently ${currency}`}
          >
            {currency}
          </button>

          {allItems.length > 0 && (
            <button
              onClick={clearWorkspace}
              type="button"
              aria-label="Reset workspace configuration"
              style={{
                fontSize: 11,
                color: 'var(--ink-soft)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 4px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#dc2626';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink-soft)';
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ── Scrollable Items Body ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        
        {/* SECTION: MEJA (DESK) */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, margin: 0 }}>
            Meja (Desk)
          </p>
          {desk ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 10,
                background: 'var(--paper-2)',
                border: '1px solid var(--line)',
                marginTop: 6,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#16a34a',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Check size={13} strokeWidth={3} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {desk.name}
                </p>
                <p style={{ fontSize: 11, color: 'var(--brass)', fontWeight: 600, margin: 0 }}>
                  {formatMonthlyRate(desk.price, currency)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDesk(null)}
                style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', cursor: 'pointer', padding: 4 }}
                title="Hapus meja"
                aria-label="Remove desk from workspace"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ) : (
            <div
              style={{
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px dashed var(--line)',
                color: 'var(--ink-soft)',
                fontSize: 11.5,
                marginTop: 6,
              }}
            >
              Belum memilih meja
            </div>
          )}
        </div>

        {/* SECTION: KURSI (CHAIR) */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, margin: 0 }}>
            Kursi (Chair)
          </p>
          {chair ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 10,
                background: 'var(--paper-2)',
                border: '1px solid var(--line)',
                marginTop: 6,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#16a34a',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Check size={13} strokeWidth={3} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {chair.name}
                </p>
                <p style={{ fontSize: 11, color: 'var(--brass)', fontWeight: 600, margin: 0 }}>
                  {formatMonthlyRate(chair.price, currency)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setChair(null)}
                style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', cursor: 'pointer', padding: 4 }}
                title="Hapus kursi"
                aria-label="Remove chair from workspace"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ) : (
            <div
              style={{
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px dashed var(--line)',
                color: 'var(--ink-soft)',
                fontSize: 11.5,
                marginTop: 6,
              }}
            >
              Belum memilih kursi
            </div>
          )}
        </div>

        {/* SECTION: ACCESSORIES */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Accessories ({allAccessories.length})
            </p>
          </div>

          {allAccessories.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
              {allAccessories.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '7px 10px',
                    borderRadius: 8,
                    background: 'var(--paper-2)',
                    border: '1px solid var(--line-soft)',
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#16a34a',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: 10.5, color: 'var(--brass)', fontWeight: 600, margin: 0 }}>
                      {formatMonthlyRate(item.price, currency)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (item.category === 'tech') toggleTech(item);
                      else toggleAccessory(item);
                    }}
                    style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', cursor: 'pointer', padding: 3 }}
                    title={`Hapus ${item.name}`}
                    aria-label={`Remove ${item.name} from workspace`}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px dashed var(--line)',
                color: 'var(--ink-soft)',
                fontSize: 11.5,
                marginTop: 6,
              }}
            >
              Belum ada aksesoris ditambahkan
            </div>
          )}
        </div>
      </div>

      {/* ── Footer: Total & CTA Button ── */}
      <div
        style={{
          padding: '16px 18px',
          borderTop: '1px solid var(--line)',
          background: 'var(--paper)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Total Price Display */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Rental
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#16a34a',
                background: 'rgba(22, 163, 74, 0.12)',
                padding: '2px 7px',
                borderRadius: 12,
              }}
            >
              Hemat 20% Bulanan
            </span>
          </div>
          <div style={{ marginTop: 4 }}>
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: 'var(--ink)',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '-0.02em',
              }}
            >
              {allItems.length > 0 ? formattedMonthlyTotal : (currency === 'IDR' ? 'Rp 0/bln' : '$0/mo')}
            </span>
          </div>
        </div>

        {/* Rent Workspace CTA Button */}
        <button
          type="button"
          onClick={() => setCheckoutOpen(true)}
          disabled={allItems.length === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            padding: '12px 16px',
            background: allItems.length > 0 ? 'var(--ink)' : 'var(--line)',
            color: allItems.length > 0 ? 'var(--paper)' : 'var(--ink-soft)',
            border: 'none',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 800,
            cursor: allItems.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            boxShadow: allItems.length > 0 ? '0 8px 20px rgba(22, 33, 29, 0.22)' : 'none',
          }}
        >
          <span>Rent Workspace</span>
          <ArrowRight size={15} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <ShieldCheck size={13} color="var(--brass)" />
          <span style={{ fontSize: 11, color: 'var(--ink-soft)', fontWeight: 500 }}>
            Gratis antar, rakit, & garansi di Bali
          </span>
        </div>
      </div>
    </aside>
  );
}
