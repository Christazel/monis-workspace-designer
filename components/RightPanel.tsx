'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CatalogItem } from '@/lib/types';
import { ACCESSORIES } from '@/lib/catalog';
import ItemIcon from './ItemIcon';

interface RightPanelProps {
  selectedAccessories: CatalogItem[];
  onToggleAccessory: (item: CatalogItem) => void;
}

const QUICK_ADDS = ACCESSORIES;

// Accent colors per accessory type
const ITEM_COLORS: Record<string, { accent: string; rgb: string }> = {
  'acc-monitor-27':    { accent: '#60a5fa', rgb: '96,165,250' },
  'acc-monitor-ultra': { accent: '#818cf8', rgb: '129,140,248' },
  'acc-screenbar':     { accent: '#fbbf24', rgb: '251,191,36' },
  'acc-plant':         { accent: '#4ade80', rgb: '74,222,128' },
  'acc-keyboard':      { accent: '#c084fc', rgb: '192,132,252' },
  'acc-webcam':        { accent: '#f472b6', rgb: '244,114,182' },
};

export default function RightPanel({ selectedAccessories, onToggleAccessory }: RightPanelProps) {
  const selectedCount = selectedAccessories.length;
  const totalPrice = selectedAccessories.reduce((s, a) => s + a.price, 0);

  return (
    <div className="flex flex-col h-full glass-panel">

      {/* Header */}
      <div className="shrink-0 px-3 py-2.5 panel-border-b">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>
              Add-ons
            </div>
            <div className="text-[9px] mt-0.5" style={{ color: '#334155' }}>Tap to toggle</div>
          </div>
          <AnimatePresence>
            {selectedCount > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center"
                style={{ background: '#f59e0b', color: '#0f172a' }}
              >
                {selectedCount}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {QUICK_ADDS.map((item) => {
          const isSelected = selectedAccessories.some(a => a.id === item.id);
          const colors = ITEM_COLORS[item.id] ?? { accent: '#64748b', rgb: '100,116,139' };

          return (
            <motion.button
              key={item.id}
              id={`quick-add-${item.id}`}
              onClick={() => onToggleAccessory(item)}
              whileTap={{ scale: 0.96 }}
              className="w-full flex items-center gap-2 p-2 rounded-xl text-left transition-all"
              style={{
                background: isSelected ? `rgba(${colors.rgb},0.08)` : 'rgba(15,23,42,0.35)',
                border: `1px solid ${isSelected ? `rgba(${colors.rgb},0.3)` : 'rgba(51,65,100,0.4)'}`,
              }}
            >
              {/* Icon */}
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
                style={{
                  background: isSelected ? `rgba(${colors.rgb},0.15)` : 'rgba(20,30,56,0.7)',
                  color: isSelected ? colors.accent : '#475569',
                  boxShadow: isSelected ? `0 0 6px rgba(${colors.rgb},0.25)` : 'none',
                }}
              >
                <ItemIcon id={item.id} size={14} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="text-[10.5px] font-semibold truncate"
                  style={{ color: isSelected ? colors.accent : '#cbd5e1' }}
                >
                  {item.name}
                </div>
                <div className="text-[9px]" style={{ color: '#475569' }}>
                  Rp {(item.price / 1000).toFixed(0)}k/day
                </div>
              </div>

              {/* Toggle indicator */}
              <div
                className="shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: isSelected ? colors.accent : 'rgba(51,65,100,0.5)',
                }}
              >
                {isSelected ? (
                  <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                    <path d="M1 2.5L2.5 4L6 1" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                    <path d="M3.5 1v5M1 3.5h5" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer total */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="shrink-0 px-3 py-2.5 panel-border-t"
            style={{ background: 'rgba(10,15,30,0.6)' }}
          >
            <div className="text-[9px]" style={{ color: '#475569' }}>Add-ons/day</div>
            <div className="text-[13px] font-black" style={{ color: '#fbbf24' }}>
              +Rp {(totalPrice / 1000).toFixed(0)}k
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
