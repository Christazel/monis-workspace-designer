'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CatalogItem } from '@/lib/types';
import { Extra } from '@/lib/types';

interface ItemCardProps {
  item: CatalogItem;
  isSelected: boolean;
  onClick: () => void;
  multi?: boolean;
}

export default function ItemCard({ item, isSelected, onClick, multi = false }: ItemCardProps) {
  return (
    <motion.button
      id={`item-card-${item.id}`}
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="relative w-full text-left flex flex-col rounded-xl p-2.5 overflow-hidden"
      style={{
        background: isSelected
          ? 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(217,119,6,0.08) 100%)'
          : 'rgba(15,23,42,0.7)',
        border: isSelected
          ? '1px solid rgba(251,191,36,0.5)'
          : '1px solid rgba(30,41,59,0.8)',
        boxShadow: isSelected
          ? '0 0 0 1px rgba(245,158,11,0.2), 0 4px 20px rgba(245,158,11,0.15), 0 1px 4px rgba(0,0,0,0.4)'
          : '0 1px 4px rgba(0,0,0,0.3)',
        minHeight: '108px',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Shimmer on selected */}
      {isSelected && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          <div className="absolute -inset-1 opacity-30"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(251,191,36,0.15) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s ease infinite',
            }}
          />
        </div>
      )}

      {/* Selected checkmark */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center z-10"
            style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', boxShadow: '0 2px 8px rgba(245,158,11,0.5)' }}
          >
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji icon */}
      <div className="text-2xl mb-1.5 leading-none">{item.emoji}</div>

      {/* Name */}
      <div className="text-[11px] font-bold leading-tight pr-5"
        style={{ color: isSelected ? '#fde68a' : '#e2e8f0' }}
      >
        {item.name}
      </div>

      {/* Description */}
      <div className="text-[9px] mt-1 leading-tight line-clamp-2"
        style={{ color: '#64748b' }}
      >
        {item.description}
      </div>

      {/* Price badge */}
      <div className="mt-auto pt-2">
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
          style={{
            background: isSelected ? 'rgba(245,158,11,0.2)' : 'rgba(30,41,59,0.8)',
            color: isSelected ? '#fbbf24' : '#94a3b8',
          }}
        >
          +Rp {(item.price / 1000).toFixed(0)}k/day
        </span>
      </div>
    </motion.button>
  );
}

/* ─────────────── ExtraCard ─────────────── */
interface ExtraCardProps {
  extra: Extra;
  isSelected: boolean;
  onClick: () => void;
  accentColor?: string;
}

export function ExtraCard({ extra, isSelected, onClick, accentColor = '#f59e0b' }: ExtraCardProps) {
  const accentRgb = accentColor === '#38bdf8' ? '56,189,248'
    : accentColor === '#a78bfa' ? '167,139,250'
    : accentColor === '#94a3b8' ? '148,163,184'
    : '245,158,11';

  return (
    <motion.button
      id={`extra-card-${extra.id}`}
      onClick={onClick}
      whileHover={{ x: 2, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left"
      style={{
        background: isSelected ? `rgba(${accentRgb},0.1)` : 'rgba(15,23,42,0.5)',
        border: isSelected ? `1px solid rgba(${accentRgb},0.4)` : '1px solid rgba(30,41,59,0.6)',
        color: isSelected ? accentColor : '#94a3b8',
      }}
    >
      <span className="text-base shrink-0">{extra.emoji}</span>
      <span className="flex-1 leading-tight">{extra.name}</span>
      <AnimatePresence mode="wait">
        {isSelected ? (
          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
            style={{ background: accentColor }}
          >
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path d="M1 3L3 5L7 1" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        ) : (
          <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-[9px] shrink-0" style={{ color: '#475569' }}
          >
            +add
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
