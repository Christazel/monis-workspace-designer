'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ShoppingBag, Clock } from 'lucide-react';
import { WorkspaceState } from '@/lib/types';
import { formatIDR, PRICE_PER_DAY_BASE, DURATION_DISCOUNTS } from '@/lib/catalog';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: WorkspaceState;
}

export default function CheckoutModal({ isOpen, onClose, state }: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');

  // Calculate pricing
  const basePrice = PRICE_PER_DAY_BASE;
  const deskPrice = state.selectedDesk?.price ?? 0;
  const chairPrice = state.selectedChair?.price ?? 0;
  const accessoriesTotal = state.selectedAccessories.reduce((sum, a) => sum + a.price, 0);
  const extrasTotal = state.selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const dailyTotal = basePrice + deskPrice + chairPrice + accessoriesTotal + extrasTotal;

  const discount = DURATION_DISCOUNTS.find(d => d.days === state.rentalDays)?.discount ?? 0;
  const subtotal = dailyTotal * state.rentalDays;
  const discountAmount = subtotal * discount;
  const grandTotal = subtotal - discountAmount;

  const handleWhatsApp = () => {
    const items = [
      state.selectedDesk ? `• Desk: ${state.selectedDesk.name}` : null,
      state.selectedChair ? `• Chair: ${state.selectedChair.name}` : null,
      state.selectedAccessories.length
        ? `• Accessories: ${state.selectedAccessories.map(a => a.name).join(', ')}`
        : null,
      state.selectedExtras.length
        ? `• Extras: ${state.selectedExtras.map(e => e.name).join(', ')}`
        : null,
    ]
      .filter(Boolean)
      .join('\n');

    const startStr = startDate ? `\nStart Date: ${startDate}` : '';
    const message = encodeURIComponent(
      `Hi Monis! 🌴\n\nI'd like to book a workspace:\n\n${items}\n\nDuration: ${state.rentalDays} day(s)${startStr}\nTotal: ${formatIDR(grandTotal)}\n\nName: ${name || '(not provided)'}\nEmail: ${email || '(not provided)'}\n\nPlease confirm availability!`
    );
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  // Get tomorrow as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 bottom-0 top-16 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[520px] md:max-h-[85vh] z-50 flex flex-col bg-slate-900 border border-slate-700 rounded-t-2xl md:rounded-2xl overflow-hidden"
          >
            {/* Modal header */}
            <div className="shrink-0 flex items-center justify-between p-5 border-b border-slate-800 bg-gradient-to-r from-amber-500/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag size={18} className="text-amber-400" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-100 text-base">Your Workspace Summary</h2>
                  <p className="text-xs text-slate-400">Review your setup before booking</p>
                </div>
              </div>
              <button
                onClick={onClose}
                id="modal-close-btn"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Selected items */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Selected Setup</h3>
                <div className="bg-slate-800/60 rounded-xl divide-y divide-slate-700/50">
                  <LineItem label="Room Base" price={PRICE_PER_DAY_BASE} perDay />
                  {state.selectedDesk && (
                    <LineItem label={`🪵 ${state.selectedDesk.name}`} price={state.selectedDesk.price} perDay />
                  )}
                  {state.selectedChair && (
                    <LineItem label={`🪑 ${state.selectedChair.name}`} price={state.selectedChair.price} perDay />
                  )}
                  {state.selectedAccessories.map(a => (
                    <LineItem key={a.id} label={`${a.emoji} ${a.name}`} price={a.price} perDay />
                  ))}
                  {state.selectedExtras.map(e => (
                    <LineItem key={e.id} label={`${e.emoji} ${e.name}`} price={e.price} perDay />
                  ))}
                </div>
              </div>

              {/* Duration selector */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Clock size={12} />
                  Rental Duration
                </h3>
                <div className="flex flex-wrap gap-2">
                  {DURATION_DISCOUNTS.map(({ days, label, discount }) => {
                    const isActive = state.rentalDays === days;
                    return (
                      <button
                        key={days}
                        id={`duration-${days}`}
                        onClick={() => {}} // handled by parent via onClose/re-open pattern
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          isActive
                            ? 'border-amber-400 bg-amber-500/15 text-amber-300'
                            : 'border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {label}
                        {discount > 0 && (
                          <span className="ml-1.5 text-green-400 text-[9px]">
                            -{(discount * 100).toFixed(0)}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contact Info</h3>
                <div className="space-y-2">
                  <input
                    id="checkout-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <input
                    id="checkout-email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <input
                    id="checkout-date"
                    type="date"
                    min={minDate}
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="bg-slate-800/40 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Daily rate</span>
                  <span>{formatIDR(dailyTotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>× {state.rentalDays} day(s)</span>
                  <span>{formatIDR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-green-400">
                    <span>Duration discount</span>
                    <span>-{formatIDR(discountAmount)}</span>
                  </div>
                )}
                <div className="h-px bg-slate-700 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-200">Total</span>
                  <span className="text-xl font-bold text-amber-400">{formatIDR(grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* CTA footer */}
            <div className="shrink-0 p-4 border-t border-slate-800 space-y-2">
              {(!state.selectedDesk || !state.selectedChair) && (
                <p className="text-xs text-center text-amber-400/80">
                  ⚠️ You haven't selected a {!state.selectedDesk ? 'desk' : 'chair'} yet
                </p>
              )}
              <motion.button
                id="whatsapp-cta-btn"
                onClick={handleWhatsApp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors text-sm"
              >
                <MessageCircle size={18} />
                Book via WhatsApp
              </motion.button>
              <p className="text-center text-[10px] text-slate-500">
                We'll confirm availability within 1 hour
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function LineItem({ label, price, perDay }: { label: string; price: number; perDay?: boolean }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 text-sm">
      <span className="text-slate-300">{label}</span>
      <span className="text-slate-400 text-xs">
        {formatIDR(price)}
        {perDay && <span className="text-slate-500">/day</span>}
      </span>
    </div>
  );
}
