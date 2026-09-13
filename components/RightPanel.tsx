'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CatalogItem } from '@/lib/types';
import { ACCESSORIES } from '@/lib/catalog';

interface RightPanelProps {
  selectedAccessories: CatalogItem[];
  onToggleAccessory: (item: CatalogItem) => void;
}

const QUICK_ADDS = ACCESSORIES;

// Icon background colors per accessory type
const ICON_COLORS: Record<string, { bg: string; glow: string }> = {
  'acc-monitor-27':    { bg: 'rgba(59,130,246,0.2)',  glow: 'rgba(59,130,246,0.3)' },
  'acc-monitor-ultra': { bg: 'rgba(99,102,241,0.2)',  glow: 'rgba(99,102,241,0.3)' },
  'acc-lamp':          { bg: 'rgba(245,158,11,0.2)',  glow: 'rgba(245,158,11,0.3)' },
  'acc-plant':         { bg: 'rgba(34,197,94,0.2)',   glow: 'rgba(34,197,94,0.3)'  },
  'acc-keyboard':      { bg: 'rgba(168,85,247,0.2)',  glow: 'rgba(168,85,247,0.3)' },
  'acc-webcam':        { bg: 'rgba(236,72,153,0.2)',  glow: 'rgba(236,72,153,0.3)' },
};

export default function RightPanel({ selectedAccessories, onToggleAccessory }: RightPanelProps) {
  const selectedCount = selectedAccessories.length;

  return (
    <div className="flex flex-col h-full glass-panel">

      {/* Header */}
      <div className="shrink-0 px-3 py-3" style={{ borderBottom: '1px solid rgba(30,41,59,0.9)' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>
              Add-ons
            </div>
            <div className="text-[9px] mt-0.5" style={{ color: '#475569' }}>Tap to toggle</div>
          </div>
          <AnimatePresence>
            {selectedCount > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#0f172a' }}
              >
                {selectedCount}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {QUICK_ADDS.map((item) => {
          const isSelected = selectedAccessories.some(a => a.id === item.id);
          const colors = ICON_COLORS[item.id] ?? { bg: 'rgba(30,41,59,0.5)', glow: 'transparent' };

          return (
            <motion.button
              key={item.id}
              id={`quick-add-${item.id}`}
              onClick={() => onToggleAccessory(item)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all"
              style={{
                background: isSelected
                  ? 'rgba(245,158,11,0.08)'
                  : 'rgba(15,23,42,0.4)',
                border: isSelected
                  ? '1px solid rgba(245,158,11,0.25)'
                  : '1px solid rgba(30,41,59,0.5)',
              }}
            >
              {/* Icon container with color */}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-base transition-all"
                style={{
                  background: isSelected ? colors.bg : 'rgba(30,41,59,0.6)',
                  boxShadow: isSelected ? `0 0 8px ${colors.glow}` : 'none',
                }}
              >
                {item.emoji}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold truncate"
                  style={{ color: isSelected ? '#fde68a' : '#cbd5e1' }}
                >
                  {isSelected ? '' : '+ '}{item.name}
                </div>
                <div className="text-[9px]" style={{ color: '#475569' }}>
                  +Rp {(item.price / 1000).toFixed(0)}k/day
                </div>
              </div>

              {/* Check indicator */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: '#f59e0b' }}
                  >
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Footer total */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="shrink-0 px-3 py-2.5"
            style={{ borderTop: '1px solid rgba(30,41,59,0.9)', background: 'rgba(8,14,26,0.6)' }}
          >
            <div className="text-[9px]" style={{ color: '#64748b' }}>Gear total/day</div>
            <div className="text-sm font-black" style={{ color: '#fbbf24' }}>
              +Rp {(selectedAccessories.reduce((s, a) => s + a.price, 0) / 1000).toFixed(0)}k
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
