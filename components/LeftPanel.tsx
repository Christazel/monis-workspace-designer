'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Armchair, Layers, Cpu } from 'lucide-react';
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

const TABS = [
  { id: 'chairs' as Tab, label: 'Chairs', icon: Armchair },
  { id: 'desks' as Tab, label: 'Desks', icon: Layers },
  { id: 'accessories' as Tab, label: 'Gear', icon: Cpu },
];

export default function LeftPanel({
  selectedDesk, selectedChair, selectedAccessories,
  onSelectDesk, onSelectChair, onToggleAccessory,
}: LeftPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('chairs');

  const items = activeTab === 'chairs' ? CHAIRS : activeTab === 'desks' ? DESKS : ACCESSORIES;

  const selectedInTab =
    activeTab === 'chairs' ? (selectedChair ? 1 : 0)
    : activeTab === 'desks' ? (selectedDesk ? 1 : 0)
    : selectedAccessories.length;

  return (
    <div className="flex flex-col h-full glass-panel">

      {/* ── Tab Bar ── */}
      <div className="shrink-0 flex panel-border-b">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 px-1 text-[10px] font-semibold tracking-wide uppercase transition-all relative"
              style={{ color: isActive ? '#f59e0b' : '#64748b' }}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0"
                  style={{ background: 'rgba(245,158,11,0.05)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <TabIcon size={15} className="relative z-10" strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="relative z-10">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="tab-line"
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                  style={{ background: '#f59e0b' }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Item Grid ── */}
      <div className="flex-1 overflow-y-auto p-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-2 gap-1.5"
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

      {/* ── Summary Footer ── */}
      <div className="shrink-0 px-3 py-2.5 panel-border-t"
        style={{ background: 'rgba(10,15,30,0.6)' }}
      >
        <AnimatePresence mode="wait">
          {selectedInTab > 0 ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#f59e0b' }} />
              <span className="text-[10px] font-semibold truncate" style={{ color: '#fbbf24' }}>
                {activeTab === 'chairs' ? selectedChair?.name
                 : activeTab === 'desks' ? selectedDesk?.name
                 : `${selectedInTab} item${selectedInTab > 1 ? 's' : ''} selected`}
              </span>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] italic"
              style={{ color: '#475569' }}
            >
              {activeTab === 'chairs' ? 'Choose a chair'
               : activeTab === 'desks' ? 'Choose a desk'
               : 'Toggle add-ons'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
