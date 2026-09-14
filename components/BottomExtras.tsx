'use client';

import { motion } from 'framer-motion';
import { Coffee, Waves, Sofa, Wrench, LucideProps } from 'lucide-react';
import React from 'react';
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
  sublabel: string;
  icon: React.ComponentType<LucideProps>;
  accent: string;
  rgb: string;
}[] = [
  {
    id: 'coffee',
    label: 'Coffee',
    sublabel: 'Barista setup',
    icon: Coffee,
    accent: '#f59e0b',
    rgb: '245,158,11',
  },
  {
    id: 'outdoor',
    label: 'Outdoor',
    sublabel: 'Bali lifestyle',
    icon: Waves,
    accent: '#38bdf8',
    rgb: '56,189,248',
  },
  {
    id: 'relax',
    label: 'Relax',
    sublabel: 'Chill zone',
    icon: Sofa,
    accent: '#a78bfa',
    rgb: '167,139,250',
  },
  {
    id: 'garage',
    label: 'Storage',
    sublabel: 'Workspace',
    icon: Wrench,
    accent: '#94a3b8',
    rgb: '148,163,184',
  },
];

export default function BottomExtras({ selectedExtras, onToggleExtra }: BottomExtrasProps) {
  return (
    <div className="panel-border-t" style={{ background: 'rgba(10,15,30,0.95)' }}>
      <div className="grid grid-cols-4">
        {SECTIONS.map((section, idx) => {
          const sectionExtras = EXTRAS.filter(e => e.section === section.id);
          const selectedCount = selectedExtras.filter(e => e.section === section.id).length;
          const SectionIcon = section.icon;

          return (
            <div
              key={section.id}
              className="relative flex flex-col p-2.5"
              style={{
                borderRight: idx < 3 ? '1px solid rgba(51,65,100,0.35)' : 'none',
              }}
            >
              {/* Accent bar at top */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `rgba(${section.rgb},0.5)` }}
              />

              {/* Section header */}
              <div className="flex items-center gap-1.5 mb-2">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    background: `rgba(${section.rgb},0.12)`,
                    color: section.accent,
                  }}
                >
                  <SectionIcon size={11} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold leading-none" style={{ color: section.accent }}>
                    {section.label}
                  </div>
                  <div className="text-[8.5px] leading-tight mt-0.5" style={{ color: '#334155' }}>
                    {section.sublabel}
                  </div>
                </div>
                {selectedCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="ml-auto w-4 h-4 rounded-full text-[8px] font-black flex items-center justify-center shrink-0"
                    style={{ background: section.accent, color: '#0a0f1e' }}
                  >
                    {selectedCount}
                  </motion.div>
                )}
              </div>

              {/* Extra items */}
              <div className="flex flex-col gap-1">
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
