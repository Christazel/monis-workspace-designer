'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CatalogItem } from '@/lib/types';
import { DESKS, CHAIRS, ACCESSORIES } from '@/lib/catalog';
import ItemCard from './ItemCard';

type Tab = 'chairs' | 'desks' | 'accessories';

interface LeftPanelProps {
  selectedDesk: CatalogItem | null;
  selectedChair: CatalogItem | null;
  selectedAccessories: CatalogItem[];
  onSelectDesk: (item: CatalogItem) => void;
  onSelectChair: (item: CatalogItem) => void;
  onToggleAccessory: (item: CatalogItem) => void;
}

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'chairs', label: 'Chairs', emoji: '🪑' },
  { id: 'desks', label: 'Desks', emoji: '🗂️' },
  { id: 'accessories', label: 'Gear', emoji: '🖥️' },
];

export default function LeftPanel({
  selectedDesk, selectedChair, selectedAccessories,
  onSelectDesk, onSelectChair, onToggleAccessory,
}: LeftPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('chairs');

  const items = activeTab === 'chairs' ? CHAIRS : activeTab === 'desks' ? DESKS : ACCESSORIES;

  return (
    <div className="flex flex-col h-full glass-panel">

      {/* ── Tab Bar ── */}
      <div className="shrink-0 flex" style={{ borderBottom: '1px solid rgba(30,41,59,0.9)' }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center gap-1 py-3 px-1 text-[11px] font-semibold transition-all relative"
              style={{ color: isActive ? '#fbbf24' : '#64748b' }}
            >
              {/* Active tab background */}
              {isActive && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0"
                  style={{ background: 'rgba(245,158,11,0.06)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="text-lg relative z-10">{tab.emoji}</span>
              <span className="relative z-10 tracking-wide uppercase">{tab.label}</span>
              {/* Bottom indicator */}
              {isActive && (
                <motion.div
                  layoutId="tab-line"
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full"
                  style={{ background: 'linear-gradient(90deg,transparent,#f59e0b,transparent)' }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Item Grid ── */}
      <div className="flex-1 overflow-y-auto p-2.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="grid grid-cols-2 gap-2"
          >
            {items.map((item) => {
              const isSelected =
                activeTab === 'chairs' ? selectedChair?.id === item.id
                : activeTab === 'desks' ? selectedDesk?.id === item.id
                : selectedAccessories.some(a => a.id === item.id);

              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  isSelected={isSelected}
                  multi={activeTab === 'accessories'}
                  onClick={() => {
                    if (activeTab === 'chairs') onSelectChair(item);
                    else if (activeTab === 'desks') onSelectDesk(item);
                    else onToggleAccessory(item);
                  }}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Selection Summary Strip ── */}
      <div className="shrink-0 p-3 space-y-1.5"
        style={{ borderTop: '1px solid rgba(30,41,59,0.9)', background: 'rgba(8,14,26,0.6)' }}
      >
        <SummaryRow label="🪑" item={selectedChair} placeholder="Pick a chair" />
        <SummaryRow label="🗂️" item={selectedDesk} placeholder="Pick a desk" />
        {selectedAccessories.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-base">🖥️</span>
            <span className="text-[10px] font-semibold" style={{ color: '#fbbf24' }}>
              {selectedAccessories.length} gear item{selectedAccessories.length > 1 ? 's' : ''} added
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, item, placeholder }: { label: string; item: CatalogItem | null; placeholder: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base shrink-0">{label}</span>
      <AnimatePresence mode="wait">
        {item ? (
          <motion.span
            key={item.id}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 4 }}
            className="text-[10px] font-semibold truncate"
            style={{ color: '#fbbf24' }}
          >
            {item.name}
          </motion.span>
        ) : (
          <motion.span
            key="empty"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[10px] italic"
            style={{ color: '#475569' }}
          >
            {placeholder}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
