'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ShoppingBag, Clock, Check } from 'lucide-react';
import { WorkspaceState } from '@/lib/types';
import { formatIDR, PRICE_PER_DAY_BASE, DURATION_DISCOUNTS } from '@/lib/catalog';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: WorkspaceState;
  onSetRentalDays: (days: number) => void;
}

export default function CheckoutModal({ isOpen, onClose, state, onSetRentalDays }: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');

  const basePrice = PRICE_PER_DAY_BASE;
  const deskPrice = state.selectedDesk?.price ?? 0;
  const chairPrice = state.selectedChair?.price ?? 0;
  const accessTotal = state.selectedAccessories.reduce((s, a) => s + a.price, 0);
  const extrasTotal = state.selectedExtras.reduce((s, e) => s + e.price, 0);
  const dailyTotal = basePrice + deskPrice + chairPrice + accessTotal + extrasTotal;

  const discountObj = DURATION_DISCOUNTS.find(d => d.days === state.rentalDays);
  const discount = discountObj?.discount ?? 0;
  const subtotal = dailyTotal * state.rentalDays;
  const discountAmt = subtotal * discount;
  const grandTotal = subtotal - discountAmt;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleWhatsApp = () => {
    const items = [
      state.selectedDesk ? `• Desk: ${state.selectedDesk.name}` : null,
      state.selectedChair ? `• Chair: ${state.selectedChair.name}` : null,
      state.selectedAccessories.length ? `• Gear: ${state.selectedAccessories.map(a => a.name).join(', ')}` : null,
      state.selectedExtras.length ? `• Extras: ${state.selectedExtras.map(e => e.name).join(', ')}` : null,
    ].filter(Boolean).join('\n');

    const msg = encodeURIComponent(
      `Hi Monis! 🌴\n\nWorkspace Booking Request:\n\n${items}\n\nDuration: ${state.rentalDays} day(s)${startDate ? `\nStart: ${startDate}` : ''}\nTotal: ${formatIDR(grandTotal)}\n\nName: ${name || '-'}\nEmail: ${email || '-'}\n\nPlease confirm! 🙏`
    );
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
  };

  const missingDesk = !state.selectedDesk;
  const missingChair = !state.selectedChair;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(2,6,15,0.85)', backdropFilter: 'blur(8px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed z-50 flex flex-col overflow-hidden"
            style={{
              inset: '0 12px 0',
              top: '10%',
              bottom: 0,
              maxWidth: 540,
              margin: '0 auto',
              background: 'linear-gradient(180deg, #0d1829 0%, #0a1220 100%)',
              border: '1px solid rgba(30,58,92,0.6)',
              borderBottom: 'none',
              borderRadius: '20px 20px 0 0',
              boxShadow: '0 -20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.05)',
            }}
          >
            {/* Top drag handle */}
            <div className="shrink-0 flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(71,85,105,0.6)' }} />
            </div>

            {/* Modal header */}
            <div className="shrink-0 flex items-center justify-between px-5 py-3"
              style={{ borderBottom: '1px solid rgba(30,41,59,0.6)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(217,119,6,0.1))', border: '1px solid rgba(245,158,11,0.2)' }}
                >
                  <ShoppingBag size={18} className="text-amber-400" />
                </div>
                <div>
                  <h2 className="font-black text-base" style={{ color: '#f1f5f9' }}>Your Setup Summary</h2>
                  <p className="text-[11px]" style={{ color: '#64748b' }}>Review before booking</p>
                </div>
              </div>
              <button id="modal-close-btn" onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(51,65,85,0.4)', color: '#94a3b8' }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

              {/* Items list */}
              <div>
                <SectionLabel>Selected Setup</SectionLabel>
                <div className="rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(30,41,59,0.7)', background: 'rgba(8,14,26,0.5)' }}
                >
                  <LineItem label="🏠 Room Base" price={basePrice} />
                  {state.selectedDesk && <LineItem label={`${state.selectedDesk.emoji} ${state.selectedDesk.name}`} price={state.selectedDesk.price} />}
                  {state.selectedChair && <LineItem label={`${state.selectedChair.emoji} ${state.selectedChair.name}`} price={state.selectedChair.price} />}
                  {state.selectedAccessories.map(a => <LineItem key={a.id} label={`${a.emoji} ${a.name}`} price={a.price} />)}
                  {state.selectedExtras.map(e => <LineItem key={e.id} label={`${e.emoji} ${e.name}`} price={e.price} />)}
                </div>
              </div>

              {/* Duration */}
              <div>
                <SectionLabel icon={<Clock size={11} />}>Rental Duration</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {DURATION_DISCOUNTS.map(({ days, label, discount: disc }) => {
                    const isActive = state.rentalDays === days;
                    return (
                      <motion.button key={days} id={`modal-duration-${days}`}
                        onClick={() => onSetRentalDays(days)}
                        whileTap={{ scale: 0.94 }}
                        className="relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={{
                          background: isActive ? 'linear-gradient(135deg,#fbbf24,#f59e0b)' : 'rgba(15,23,42,0.6)',
                          border: isActive ? 'none' : '1px solid rgba(30,41,59,0.7)',
                          color: isActive ? '#0f172a' : '#64748b',
                          boxShadow: isActive ? '0 2px 12px rgba(245,158,11,0.35)' : 'none',
                        }}
                      >
                        {label}
                        {disc > 0 && (
                          <span className="absolute -top-2 -right-1 text-[8px] font-bold rounded-full px-1 py-px leading-none"
                            style={{ background: '#16a34a', color: '#fff' }}
                          >
                            -{(disc * 100).toFixed(0)}%
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Contact */}
              <div>
                <SectionLabel>Contact Info</SectionLabel>
                <div className="space-y-2">
                  {[
                    { id: 'checkout-name', type: 'text', placeholder: 'Your full name', value: name, onChange: setName },
                    { id: 'checkout-email', type: 'email', placeholder: 'Email address', value: email, onChange: setEmail },
                  ].map(f => (
                    <input key={f.id} id={f.id} type={f.type} placeholder={f.placeholder} value={f.value}
                      onChange={e => f.onChange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(8,14,26,0.7)',
                        border: '1px solid rgba(30,41,59,0.8)',
                        color: '#e2e8f0',
                      }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(245,158,11,0.5)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(30,41,59,0.8)'; }}
                    />
                  ))}
                  <input id="checkout-date" type="date" min={minDate} value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: 'rgba(8,14,26,0.7)',
                      border: '1px solid rgba(30,41,59,0.8)',
                      color: '#e2e8f0',
                      colorScheme: 'dark',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(245,158,11,0.5)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(30,41,59,0.8)'; }}
                  />
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="rounded-xl p-4 space-y-2.5"
                style={{ background: 'rgba(8,14,26,0.6)', border: '1px solid rgba(245,158,11,0.1)' }}
              >
                <PriceLine label="Daily rate" value={formatIDR(dailyTotal)} />
                <PriceLine label={`× ${state.rentalDays} day${state.rentalDays > 1 ? 's' : ''}`} value={formatIDR(subtotal)} />
                {discountAmt > 0 && <PriceLine label="Duration discount" value={`-${formatIDR(discountAmt)}`} valueColor="#4ade80" />}
                <div className="h-px" style={{ background: 'rgba(30,41,59,0.8)' }} />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: '#cbd5e1' }}>Total</span>
                  <span className="text-2xl font-black text-gradient-amber">{formatIDR(grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="shrink-0 px-5 pb-6 pt-3 space-y-2"
              style={{ borderTop: '1px solid rgba(30,41,59,0.5)', background: 'rgba(8,14,26,0.9)' }}
            >
              {(missingDesk || missingChair) && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', color: '#fbbf24' }}
                >
                  <span>⚠️</span>
                  <span>You haven't picked a {missingDesk ? 'desk' : 'chair'} yet</span>
                </motion.div>
              )}
              <motion.button
                id="whatsapp-cta-btn"
                onClick={handleWhatsApp}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-black text-base text-white transition-all"
                style={{
                  background: 'linear-gradient(135deg,#22c55e,#16a34a)',
                  boxShadow: '0 4px 24px rgba(34,197,94,0.35)',
                }}
              >
                <MessageCircle size={20} />
                Book via WhatsApp
              </motion.button>
              <p className="text-center text-[10px]" style={{ color: '#475569' }}>
                We'll confirm within 1 hour · No payment required now
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SectionLabel({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 mb-2.5">
      {icon && <span style={{ color: '#64748b' }}>{icon}</span>}
      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>
        {children}
      </span>
    </div>
  );
}

function LineItem({ label, price }: { label: string; price: number }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5"
      style={{ borderBottom: '1px solid rgba(30,41,59,0.4)' }}
    >
      <span className="text-[11px]" style={{ color: '#94a3b8' }}>{label}</span>
      <span className="text-[11px] font-semibold" style={{ color: '#64748b' }}>
        {formatIDR(price)}<span style={{ color: '#475569', fontWeight: 400 }}>/day</span>
      </span>
    </div>
  );
}

function PriceLine({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span style={{ color: '#64748b' }}>{label}</span>
      <span style={{ color: valueColor ?? '#94a3b8', fontWeight: 600 }}>{value}</span>
    </div>
  );
}
