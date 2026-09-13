'use client';

import { motion } from 'framer-motion';
import { CatalogItem } from '@/lib/types';
import { ACCESSORIES } from '@/lib/catalog';

interface RightPanelProps {
  selectedAccessories: CatalogItem[];
  onToggleAccessory: (item: CatalogItem) => void;
}

// Quick-add items to show in the right panel (display + decor)
const QUICK_ADDS = ACCESSORIES.filter(a =>
  ['acc-monitor-27', 'acc-monitor-ultra', 'acc-lamp', 'acc-plant', 'acc-keyboard', 'acc-webcam'].includes(a.id)
);

export default function RightPanel({ selectedAccessories, onToggleAccessory }: RightPanelProps) {
  return (
    <div className="flex flex-col bg-slate-900/80 backdrop-blur-sm border-l border-slate-800 h-full">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-slate-800">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Quick Add-ons</h3>
        <p className="text-[10px] text-slate-500 mt-0.5">Tap to add to workspace</p>
      </div>

      {/* Quick add buttons */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {QUICK_ADDS.map((item) => {
          const isSelected = selectedAccessories.some(a => a.id === item.id);
          return (
            <motion.button
              key={item.id}
              id={`quick-add-${item.id}`}
              onClick={() => onToggleAccessory(item)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.96 }}
              className={`
                w-full flex items-center gap-3 p-2.5 rounded-lg border text-left transition-all text-xs
                ${isSelected
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-300'
                  : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600'
                }
              `}
            >
              <span className="text-lg shrink-0">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate leading-tight">
                  {isSelected ? '' : '+ '}{item.name}
                </div>
                <div className="text-[9px] text-slate-500 leading-tight">
                  +Rp {(item.price / 1000).toFixed(0)}k/day
                </div>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center shrink-0"
                >
                  <span className="text-[9px] font-bold text-slate-900">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected count */}
      {selectedAccessories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="shrink-0 px-3 py-2.5 border-t border-slate-800 bg-slate-900/60"
        >
          <div className="text-[10px] text-slate-400">
            <span className="text-amber-400 font-bold text-sm">{selectedAccessories.length}</span>
            {' '}item{selectedAccessories.length > 1 ? 's' : ''} added to workspace
          </div>
        </motion.div>
      )}
    </div>
  );
}
