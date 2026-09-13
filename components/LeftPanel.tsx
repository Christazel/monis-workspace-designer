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
  { id: 'accessories', label: 'Accessories', emoji: '🖥️' },
];

export default function LeftPanel({
  selectedDesk,
  selectedChair,
  selectedAccessories,
  onSelectDesk,
  onSelectChair,
  onToggleAccessory,
}: LeftPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('chairs');

  const items =
    activeTab === 'chairs'
      ? CHAIRS
      : activeTab === 'desks'
      ? DESKS
      : ACCESSORIES;

  return (
    <div className="flex flex-col h-full bg-slate-900/80 backdrop-blur-sm border-r border-slate-800">
      {/* Tab bar */}
      <div className="flex border-b border-slate-800 shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex flex-col items-center gap-0.5 py-3 px-1 text-xs font-medium transition-all relative
              ${activeTab === tab.id
                ? 'text-amber-400'
                : 'text-slate-400 hover:text-slate-200'
              }
            `}
          >
            <span className="text-base">{tab.emoji}</span>
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
              />
            )}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-2 gap-2"
          >
            {items.map((item) => {
              const isSelected =
                activeTab === 'chairs'
                  ? selectedChair?.id === item.id
                  : activeTab === 'desks'
                  ? selectedDesk?.id === item.id
                  : selectedAccessories.some((a) => a.id === item.id);

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

      {/* Selection summary strip */}
      <div className="shrink-0 p-3 border-t border-slate-800 bg-slate-900/60">
        <div className="space-y-1.5">
          <SummaryRow label="Chair" item={selectedChair} placeholder="No chair selected" />
          <SummaryRow label="Desk" item={selectedDesk} placeholder="No desk selected" />
          {selectedAccessories.length > 0 && (
            <div className="text-[10px] text-slate-400">
              <span className="text-amber-400 font-medium">{selectedAccessories.length} accessory</span>
              {selectedAccessories.length > 1 ? ' items' : ''} added
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, item, placeholder }: { label: string; item: CatalogItem | null; placeholder: string }) {
  return (
    <div className="flex items-center gap-2 text-[10px]">
      <span className="text-slate-500 w-8 shrink-0">{label}:</span>
      {item ? (
        <span className="text-amber-300 font-medium truncate">
          {item.emoji} {item.name}
        </span>
      ) : (
        <span className="text-slate-600 italic">{placeholder}</span>
      )}
    </div>
  );
}
