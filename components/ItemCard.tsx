'use client';

import { CatalogItem, Extra } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface ItemCardProps {
  item: CatalogItem;
  isSelected: boolean;
  onClick: () => void;
  multi?: boolean; // for accessories (toggle)
}

export default function ItemCard({ item, isSelected, onClick, multi = false }: ItemCardProps) {
  return (
    <motion.button
      id={`item-card-${item.id}`}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative w-full text-left rounded-xl p-3 border transition-all duration-200 cursor-pointer
        flex flex-col gap-1
        ${isSelected
          ? 'border-amber-400 bg-amber-500/10 item-card-selected'
          : 'border-slate-700 bg-slate-800/60 hover:border-slate-500 hover:bg-slate-800'
        }
      `}
    >
      {/* Selected indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-2 right-2 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center"
          >
            <span className="text-slate-900 text-xs font-bold">
              {multi ? '✓' : '●'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji icon */}
      <div className="text-2xl mb-1 leading-none">{item.emoji}</div>

      {/* Name */}
      <div className={`text-xs font-semibold leading-tight ${isSelected ? 'text-amber-300' : 'text-slate-100'}`}>
        {item.name}
      </div>

      {/* Description */}
      <div className="text-[10px] text-slate-400 leading-tight line-clamp-2">
        {item.description}
      </div>

      {/* Price */}
      <div className={`text-[10px] font-bold mt-auto pt-1 ${isSelected ? 'text-amber-400' : 'text-slate-300'}`}>
        +Rp {(item.price / 1000).toFixed(0)}k/day
      </div>
    </motion.button>
  );
}

interface ExtraCardProps {
  extra: Extra;
  isSelected: boolean;
  onClick: () => void;
}

export function ExtraCard({ extra, isSelected, onClick }: ExtraCardProps) {
  return (
    <motion.button
      id={`extra-card-${extra.id}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all
        ${isSelected
          ? 'border-amber-400 bg-amber-500/15 text-amber-300'
          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500'
        }
      `}
    >
      <span className="text-base">{extra.emoji}</span>
      <span className="leading-tight">{extra.name}</span>
      {!isSelected && <span className="text-[10px] text-slate-500 ml-auto">+add</span>}
      {isSelected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-[10px] text-amber-400 ml-auto"
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
}
