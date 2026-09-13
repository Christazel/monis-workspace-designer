'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, ShoppingCart, Sparkles } from 'lucide-react';
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

  // Handlers
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

  const discount = DURATION_DISCOUNTS.find(d => d.days === state.rentalDays)?.discount ?? 0;
  const grandTotal = dailyTotal * state.rentalDays * (1 - discount);

  const isNight = state.ambiance === 'night';

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
      {/* ── HEADER ── */}
      <header className="shrink-0 flex items-center justify-between px-4 py-3 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 z-20">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
            <Sparkles size={16} className="text-slate-900" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-100 leading-none">Monis Workspace</h1>
            <p className="text-[10px] text-slate-400 leading-none">Designer</p>
          </div>
        </div>

        {/* Center: Duration pills */}
        <div className="hidden md:flex items-center gap-1 bg-slate-800/60 rounded-xl p-1">
          {DURATION_DISCOUNTS.map(({ days, label, discount }) => (
            <button
              key={days}
              id={`duration-pill-${days}`}
              onClick={() => handleSetRentalDays(days)}
              className={`
                px-3 py-1 rounded-lg text-xs font-medium transition-all relative
                ${state.rentalDays === days
                  ? 'bg-amber-500 text-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
                }
              `}
            >
              {label}
              {discount > 0 && state.rentalDays === days && (
                <span className="absolute -top-1.5 -right-1 text-[8px] bg-green-500 text-white rounded-full px-1 font-bold">
                  -{(discount * 100).toFixed(0)}%
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-2">
          {/* Ambiance toggle */}
          <motion.button
            id="ambiance-toggle"
            onClick={handleToggleAmbiance}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all
              ${isNight
                ? 'border-slate-600 bg-slate-800 text-amber-300'
                : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
              }
            `}
          >
            {isNight ? <Moon size={13} /> : <Sun size={13} />}
            <span className="hidden sm:inline">{isNight ? 'Night' : 'Day'}</span>
          </motion.button>

          {/* Checkout button */}
          <motion.button
            id="checkout-btn"
            onClick={() => setIsCheckoutOpen(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-amber-500/20"
          >
            <ShoppingCart size={14} />
            <span className="hidden sm:inline">Ready to Rent?</span>
            <span className="font-bold">{formatIDR(grandTotal)}</span>
          </motion.button>
        </div>
      </header>

      {/* ── MAIN 3-PANEL LAYOUT ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-[220px] shrink-0 overflow-hidden">
          <LeftPanel
            selectedDesk={state.selectedDesk}
            selectedChair={state.selectedChair}
            selectedAccessories={state.selectedAccessories}
            onSelectDesk={handleSelectDesk}
            onSelectChair={handleSelectChair}
            onToggleAccessory={handleToggleAccessory}
          />
        </div>

        {/* Center: Canvas + Bottom Extras */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Canvas */}
          <div className="flex-1 p-4 overflow-hidden">
            <WorkspaceCanvas state={state} />
          </div>

          {/* Bottom extras */}
          <div className="shrink-0">
            <BottomExtras
              selectedExtras={state.selectedExtras}
              onToggleExtra={handleToggleExtra}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[160px] shrink-0 overflow-hidden">
          <RightPanel
            selectedAccessories={state.selectedAccessories}
            onToggleAccessory={handleToggleAccessory}
          />
        </div>
      </div>

      {/* ── CHECKOUT MODAL ── */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        state={state}
      />
    </div>
  );
}
