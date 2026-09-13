'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ShoppingCart, Zap } from 'lucide-react';
import { CatalogItem, Extra, WorkspaceState } from '@/lib/types';
import { DURATION_DISCOUNTS, PRICE_PER_DAY_BASE, formatIDR } from '@/lib/catalog';
import LeftPanel from './LeftPanel';
import WorkspaceCanvas from './WorkspaceCanvas';
import RightPanel from './RightPanel';
import BottomExtras from './BottomExtras';
import CheckoutModal from './CheckoutModal';

const DEFAULT_STATE: WorkspaceState = {
  selectedDesk: null,
  selectedChair: null,
  selectedAccessories: [],
  selectedExtras: [],
  rentalDays: 1,
  ambiance: 'day',
};

export default function WorkspaceBuilder() {
  const [state, setState] = useState<WorkspaceState>(DEFAULT_STATE);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleSelectDesk = useCallback((item: CatalogItem) => {
    setState(prev => ({ ...prev, selectedDesk: prev.selectedDesk?.id === item.id ? null : item }));
  }, []);

  const handleSelectChair = useCallback((item: CatalogItem) => {
    setState(prev => ({ ...prev, selectedChair: prev.selectedChair?.id === item.id ? null : item }));
  }, []);

  const handleToggleAccessory = useCallback((item: CatalogItem) => {
    setState(prev => ({
      ...prev,
      selectedAccessories: prev.selectedAccessories.some(a => a.id === item.id)
        ? prev.selectedAccessories.filter(a => a.id !== item.id)
        : [...prev.selectedAccessories, item],
    }));
  }, []);

  const handleToggleExtra = useCallback((extra: Extra) => {
    setState(prev => ({
      ...prev,
      selectedExtras: prev.selectedExtras.some(e => e.id === extra.id)
        ? prev.selectedExtras.filter(e => e.id !== extra.id)
        : [...prev.selectedExtras, extra],
    }));
  }, []);

  const handleSetRentalDays = useCallback((days: number) => {
    setState(prev => ({ ...prev, rentalDays: days }));
  }, []);

  const handleToggleAmbiance = useCallback(() => {
    setState(prev => ({ ...prev, ambiance: prev.ambiance === 'day' ? 'night' : 'day' }));
  }, []);

  // Pricing
  const dailyTotal =
    PRICE_PER_DAY_BASE +
    (state.selectedDesk?.price ?? 0) +
    (state.selectedChair?.price ?? 0) +
    state.selectedAccessories.reduce((sum, a) => sum + a.price, 0) +
    state.selectedExtras.reduce((sum, e) => sum + e.price, 0);

  const discountObj = DURATION_DISCOUNTS.find(d => d.days === state.rentalDays);
  const discount = discountObj?.discount ?? 0;
  const grandTotal = dailyTotal * state.rentalDays * (1 - discount);

  const isNight = state.ambiance === 'night';
  const totalItems =
    (state.selectedDesk ? 1 : 0) +
    (state.selectedChair ? 1 : 0) +
    state.selectedAccessories.length +
    state.selectedExtras.length;

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#080e1a' }}>

      {/* ══════════ HEADER ══════════ */}
      <header className="header-border shrink-0 flex items-center justify-between px-5 py-2.5 z-20"
        style={{ background: 'rgba(8,14,26,0.95)', backdropFilter: 'blur(20px)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#fcd34d,#f59e0b,#d97706)', boxShadow: '0 4px 16px rgba(245,158,11,0.4)' }}
            >
              <Zap size={18} className="text-slate-900" fill="currentColor" />
            </div>
            {/* ping dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-900" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold leading-none" style={{ color: '#f1f5f9' }}>
              Monis<span className="text-gradient-amber"> Workspace</span>
            </div>
            <div className="text-[10px] font-medium mt-0.5" style={{ color: '#64748b' }}>
              Bali Workspace Designer
            </div>
          </div>
        </div>

        {/* Center: Duration pills */}
        <div className="flex items-center gap-1 rounded-2xl p-1"
          style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(51,65,85,0.6)' }}
        >
          {DURATION_DISCOUNTS.map(({ days, label, discount: disc }) => {
            const isActive = state.rentalDays === days;
            return (
              <motion.button
                key={days}
                id={`duration-pill-${days}`}
                onClick={() => handleSetRentalDays(days)}
                whileTap={{ scale: 0.94 }}
                className="relative px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={{
                  background: isActive ? 'linear-gradient(135deg,#fbbf24,#f59e0b)' : 'transparent',
                  color: isActive ? '#0f172a' : '#94a3b8',
                  boxShadow: isActive ? '0 2px 12px rgba(245,158,11,0.35)' : 'none',
                }}
              >
                {label}
                {disc > 0 && (
                  <span className="absolute -top-2 -right-1 text-[8px] font-bold rounded-full px-1 py-px leading-none"
                    style={{ background: isActive ? '#16a34a' : '#1e3a2e', color: isActive ? '#fff' : '#4ade80' }}
                  >
                    -{(disc * 100).toFixed(0)}%
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2.5">
          {/* Ambiance toggle */}
          <motion.button
            id="ambiance-toggle"
            onClick={handleToggleAmbiance}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: isNight ? 'rgba(99,102,241,0.15)' : 'rgba(250,204,21,0.1)',
              border: isNight ? '1px solid rgba(99,102,241,0.35)' : '1px solid rgba(250,204,21,0.25)',
              color: isNight ? '#a5b4fc' : '#fde68a',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span key={isNight ? 'moon' : 'sun'}
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isNight ? <Moon size={14} /> : <Sun size={14} />}
              </motion.span>
            </AnimatePresence>
            <span className="hidden sm:inline">{isNight ? 'Night' : 'Day'}</span>
          </motion.button>

          {/* CTA checkout button */}
          <motion.button
            id="checkout-btn"
            onClick={() => setIsCheckoutOpen(true)}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="btn-cta relative flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-slate-900"
          >
            <ShoppingCart size={15} />
            <span className="hidden sm:inline text-xs">Ready to Rent?</span>
            <span className="text-sm font-black tabular-nums">
              {formatIDR(grandTotal)}
            </span>
            {/* item count badge */}
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center text-amber-900"
                  style={{ background: '#fef08a', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      {/* ══════════ MAIN LAYOUT ══════════ */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Panel — 240px */}
        <div className="w-[240px] shrink-0 overflow-hidden" style={{ borderRight: '1px solid rgba(30,41,59,0.8)' }}>
          <LeftPanel
            selectedDesk={state.selectedDesk}
            selectedChair={state.selectedChair}
            selectedAccessories={state.selectedAccessories}
            onSelectDesk={handleSelectDesk}
            onSelectChair={handleSelectChair}
            onToggleAccessory={handleToggleAccessory}
          />
        </div>

        {/* Center — canvas + bottom */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <div className="flex-1 p-3 overflow-hidden">
            <WorkspaceCanvas state={state} />
          </div>
          <div className="shrink-0">
            <BottomExtras selectedExtras={state.selectedExtras} onToggleExtra={handleToggleExtra} />
          </div>
        </div>

        {/* Right Panel — 175px */}
        <div className="w-[175px] shrink-0 overflow-hidden" style={{ borderLeft: '1px solid rgba(30,41,59,0.8)' }}>
          <RightPanel
            selectedAccessories={state.selectedAccessories}
            onToggleAccessory={handleToggleAccessory}
          />
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        state={state}
        onSetRentalDays={handleSetRentalDays}
      />
    </div>
  );
}
