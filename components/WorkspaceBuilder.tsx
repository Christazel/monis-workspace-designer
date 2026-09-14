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
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#0a0f1e' }}>

      {/* ══════════ HEADER ══════════ */}
      <header className="header-bar shrink-0 flex items-center justify-between px-4 h-12 z-20"
        style={{ background: 'rgba(10,15,30,0.97)', backdropFilter: 'blur(20px)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#fcd34d,#f59e0b)', boxShadow: '0 2px 10px rgba(245,158,11,0.35)' }}
            >
              <Zap size={14} className="text-slate-900" fill="currentColor" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 status-dot" />
          </div>
          <div className="hidden sm:block leading-none">
            <span className="text-[13px] font-bold text-white">monis</span>
            <span className="text-[13px] font-bold text-gradient-amber">.rent</span>
          </div>
        </div>

        {/* Center: Duration pills */}
        <div className="flex items-center gap-0.5 rounded-xl p-0.5"
          style={{ background: 'rgba(20,30,56,0.9)', border: '1px solid rgba(51,65,100,0.6)' }}
        >
          {DURATION_DISCOUNTS.map(({ days, label, discount: disc }) => {
            const isActive = state.rentalDays === days;
            return (
              <motion.button
                key={days}
                id={`duration-pill-${days}`}
                onClick={() => handleSetRentalDays(days)}
                whileTap={{ scale: 0.93 }}
                className="relative px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all"
                style={{
                  background: isActive ? 'linear-gradient(135deg,#fbbf24,#f59e0b)' : 'transparent',
                  color: isActive ? '#0f172a' : '#64748b',
                  boxShadow: isActive ? '0 1px 8px rgba(245,158,11,0.3)' : 'none',
                }}
              >
                {label}
                {disc > 0 && (
                  <span className="absolute -top-1.5 -right-0.5 text-[8px] font-bold rounded-full px-1 py-px leading-none"
                    style={{ background: isActive ? '#16a34a' : '#1c3426', color: isActive ? '#fff' : '#4ade80' }}
                  >
                    -{(disc * 100).toFixed(0)}%
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Ambiance toggle */}
          <motion.button
            id="ambiance-toggle"
            onClick={handleToggleAmbiance}
            whileTap={{ scale: 0.92 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{
              background: isNight ? 'rgba(99,102,241,0.15)' : 'rgba(250,204,21,0.1)',
              border: isNight ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(250,204,21,0.2)',
              color: isNight ? '#a5b4fc' : '#fde68a',
            }}
            title={isNight ? 'Switch to Day' : 'Switch to Night'}
          >
            <AnimatePresence mode="wait">
              <motion.span key={isNight ? 'moon' : 'sun'}
                initial={{ rotate: -60, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 60, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isNight ? <Moon size={14} /> : <Sun size={14} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* CTA checkout button */}
          <motion.button
            id="checkout-btn"
            onClick={() => setIsCheckoutOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="btn-cta relative flex items-center gap-1.5 pl-3 pr-3 h-8 rounded-lg font-bold text-slate-900 text-xs"
          >
            <ShoppingCart size={13} />
            <span className="hidden sm:inline font-semibold">Rent Now</span>
            <span className="font-black tabular-nums text-[12px]">{formatIDR(grandTotal)}</span>
            {/* item count badge */}
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center"
                  style={{ background: '#0a0f1e', color: '#fbbf24', border: '1.5px solid #f59e0b' }}
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

        {/* Left Panel */}
        <div className="w-[220px] shrink-0 overflow-hidden panel-border-r">
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
          <div className="flex-1 p-2.5 overflow-hidden">
            <WorkspaceCanvas state={state} />
          </div>
          <div className="shrink-0">
            <BottomExtras selectedExtras={state.selectedExtras} onToggleExtra={handleToggleExtra} />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[168px] shrink-0 overflow-hidden panel-border-l">
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
