'use client';

import { motion } from 'framer-motion';
import { Extra } from '@/lib/types';
import { EXTRAS } from '@/lib/catalog';
import { ExtraCard } from './ItemCard';

interface BottomExtrasProps {
  selectedExtras: Extra[];
  onToggleExtra: (extra: Extra) => void;
}

const SECTIONS: {
  id: Extra['section'];
  label: string;
  emoji: string;
  accent: string;
  border: string;
  topBar: string;
}[] = [
  {
    id: 'coffee',
    label: 'Coffee Station',
    emoji: '☕',
    accent: '#f59e0b',
    border: 'rgba(245,158,11,0.15)',
    topBar: 'linear-gradient(90deg,#f59e0b,#d97706)',
  },
  {
    id: 'outdoor',
    label: 'Outdoor Gear',
    emoji: '🏄',
    accent: '#38bdf8',
    border: 'rgba(56,189,248,0.15)',
    topBar: 'linear-gradient(90deg,#38bdf8,#0ea5e9)',
  },
  {
    id: 'relax',
    label: 'Relax Zone',
    emoji: '🛋️',
    accent: '#a78bfa',
    border: 'rgba(167,139,250,0.15)',
    topBar: 'linear-gradient(90deg,#a78bfa,#8b5cf6)',
  },
  {
    id: 'garage',
    label: 'Garage Space',
    emoji: '🔧',
    accent: '#94a3b8',
    border: 'rgba(148,163,184,0.15)',
    topBar: 'linear-gradient(90deg,#94a3b8,#64748b)',
  },
];

export default function BottomExtras({ selectedExtras, onToggleExtra }: BottomExtrasProps) {
  return (
    <div style={{ borderTop: '1px solid rgba(30,41,59,0.8)', background: 'rgba(8,14,26,0.92)' }}>
      <div className="grid grid-cols-4">
        {SECTIONS.map((section, idx) => {
          const sectionExtras = EXTRAS.filter(e => e.section === section.id);
          const selectedCount = selectedExtras.filter(e => e.section === section.id).length;

          return (
            <div
              key={section.id}
              className="relative flex flex-col p-3"
              style={{
                borderRight: idx < 3 ? '1px solid rgba(30,41,59,0.6)' : 'none',
                background: selectedCount > 0
                  ? `linear-gradient(180deg, rgba(${section.accent === '#f59e0b' ? '245,158,11' : section.accent === '#38bdf8' ? '56,189,248' : section.accent === '#a78bfa' ? '167,139,250' : '148,163,184'},0.04) 0%, transparent 100%)`
                  : 'transparent',
              }}
            >
              {/* Top color bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-full opacity-70"
                style={{ background: section.topBar }}
              />

              {/* Section header */}
              <div className="flex items-center gap-2 mb-2 mt-0.5">
                <span className="text-base">{section.emoji}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: section.accent }}>
                  {section.label}
                </span>
                {selectedCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="ml-auto w-4 h-4 rounded-full text-[8px] font-black flex items-center justify-center"
                    style={{ background: section.accent, color: '#0f172a' }}
                  >
                    {selectedCount}
                  </motion.div>
                )}
              </div>

              {/* Extra items */}
              <div className="flex flex-col gap-1.5">
                {sectionExtras.map(extra => (
                  <ExtraCard
                    key={extra.id}
                    extra={extra}
                    isSelected={selectedExtras.some(e => e.id === extra.id)}
                    onClick={() => onToggleExtra(extra)}
                    accentColor={section.accent}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
