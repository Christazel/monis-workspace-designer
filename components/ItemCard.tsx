'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CatalogItem } from '@/lib/types';
import { Extra } from '@/lib/types';
import ItemIcon from './ItemIcon';

interface ItemCardProps {
  item: CatalogItem;
  isSelected: boolean;
  onClick: () => void;
  multi?: boolean;
}

export default function ItemCard({ item, isSelected, onClick }: ItemCardProps) {
  return (
    <motion.button
      id={`item-card-${item.id}`}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`item-card ${isSelected ? 'selected' : ''}`}
      style={{ minHeight: '96px' }}
    >
      {/* Checkmark badge */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center z-10"
            style={{ background: '#f59e0b' }}
          >
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path d="M1 3L3 5L7 1" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center mb-2 transition-colors"
        style={{
          background: isSelected ? 'rgba(245,158,11,0.18)' : 'rgba(30,41,69,0.8)',
          color: isSelected ? '#fbbf24' : '#64748b',
        }}
      >
        <ItemIcon id={item.id} size={15} />
      </div>

      {/* Name */}
      <div className="text-[11px] font-semibold leading-tight pr-4 truncate"
        style={{ color: isSelected ? '#fde68a' : '#cbd5e1' }}
      >
        {item.name}
      </div>

      {/* Description */}
      <div className="text-[9.5px] mt-0.5 leading-tight line-clamp-2"
        style={{ color: '#475569' }}
      >
        {item.description}
      </div>

      {/* Price */}
      <div className="mt-2">
        <span className="inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-md"
          style={{
            background: isSelected ? 'rgba(245,158,11,0.18)' : 'rgba(15,23,42,0.7)',
            color: isSelected ? '#fbbf24' : '#64748b',
          }}
        >
          Rp {(item.price / 1000).toFixed(0)}k/day
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
      whileTap={{ scale: 0.96 }}
      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all"
      style={{
        background: isSelected ? `rgba(${accentRgb},0.1)` : 'rgba(15,23,42,0.4)',
        border: `1px solid ${isSelected ? `rgba(${accentRgb},0.4)` : 'rgba(51,65,100,0.4)'}`,
        color: isSelected ? accentColor : '#94a3b8',
      }}
    >
      <div
        className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors"
        style={{
          background: isSelected ? `rgba(${accentRgb},0.18)` : 'rgba(30,41,69,0.7)',
          color: isSelected ? accentColor : '#64748b',
        }}
      >
        <ItemIcon id={extra.id} size={11} />
      </div>
      <span className="flex-1 text-[10.5px] font-medium leading-tight truncate">{extra.name}</span>
      <AnimatePresence mode="wait">
        {isSelected ? (
          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"
            style={{ background: accentColor }}
          >
            <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
              <path d="M1 2.5L2.5 4L6 1" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        ) : (
          <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-[9px] shrink-0 font-medium" style={{ color: '#334155' }}
          >
            +add
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
