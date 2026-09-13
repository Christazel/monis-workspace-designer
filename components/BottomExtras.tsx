'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Extra } from '@/lib/types';
import { EXTRAS } from '@/lib/catalog';
import { ExtraCard } from './ItemCard';

interface BottomExtrasProps {
  selectedExtras: Extra[];
  onToggleExtra: (extra: Extra) => void;
}

const SECTIONS: { id: Extra['section']; label: string; emoji: string; color: string }[] = [
  { id: 'coffee',  label: 'Coffee Station', emoji: '☕', color: 'text-yellow-400' },
  { id: 'outdoor', label: 'Outdoor Gear',   emoji: '🏄', color: 'text-blue-400' },
  { id: 'relax',   label: 'Relax Zone',     emoji: '🛋️', color: 'text-purple-400' },
  { id: 'garage',  label: 'Garage Space',   emoji: '🔧', color: 'text-slate-300' },
];

export default function BottomExtras({ selectedExtras, onToggleExtra }: BottomExtrasProps) {
  return (
    <div className="border-t border-slate-800 bg-slate-900/70 backdrop-blur-sm">
      <div className="max-w-full overflow-x-auto">
        <div className="flex gap-0 divide-x divide-slate-800 min-w-max lg:min-w-0 lg:grid lg:grid-cols-4">
          {SECTIONS.map((section) => {
            const sectionExtras = EXTRAS.filter(e => e.section === section.id);
            const selectedCount = selectedExtras.filter(e => e.section === section.id).length;

            return (
              <div key={section.id} className="flex-1 p-3 min-w-[180px] lg:min-w-0">
                {/* Section header */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-base">{section.emoji}</span>
                  <span className={`text-xs font-semibold ${section.color}`}>{section.label}</span>
                  {selectedCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto text-[9px] font-bold bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full"
                    >
                      {selectedCount}
                    </motion.span>
                  )}
                </div>

                {/* Items */}
                <div className="flex flex-col gap-1.5">
                  {sectionExtras.map((extra) => (
                    <ExtraCard
                      key={extra.id}
                      extra={extra}
                      isSelected={selectedExtras.some(e => e.id === extra.id)}
                      onClick={() => onToggleExtra(extra)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
