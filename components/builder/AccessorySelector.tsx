'use client';

import React from 'react';
import { TECH, ACCESSORIES } from '@/data/products';
import { useWorkspaceStore } from '@/store/workspaceStore';
import CustomizerProductCard from './CustomizerProductCard';

// ── Tech is split into subcategories for the selector ────────────────────
const DISPLAY_TECH   = TECH.filter((t) => t.subCategory === 'display');
const INPUT_TECH     = TECH.filter((t) => t.subCategory === 'input');
const AUDIO_TECH     = TECH.filter((t) => t.subCategory === 'audio');
const VIDEO_TECH     = TECH.filter((t) => t.subCategory === 'video');

export default function AccessorySelector() {
  const { tech, accessories, toggleTech, toggleAccessory } = useWorkspaceStore();

  const isTechSelected = (id: string) => tech.some((t) => t.id === id);
  const isAccSelected  = (id: string) => accessories.some((a) => a.id === id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Monitors (Display) ─────────────────────────── */}
      <div>
        <SectionLabel>🖥 Layar (Monitor)</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DISPLAY_TECH.map((item) => (
            <CustomizerProductCard
              key={item.id}
              product={item}
              selected={isTechSelected(item.id)}
              onSelect={() => toggleTech(item)}
              isMultiSelect={true}
            />
          ))}
        </div>
      </div>

      {/* ── Keyboard & Mouse (Input) ───────────────────── */}
      <div>
        <SectionLabel>⌨️ Keyboard & Mouse</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {INPUT_TECH.map((item) => (
            <CustomizerProductCard
              key={item.id}
              product={item}
              selected={isTechSelected(item.id)}
              onSelect={() => toggleTech(item)}
              isMultiSelect={true}
            />
          ))}
        </div>
      </div>

      {/* ── Audio (Speakers) ──────────────────────────── */}
      <div>
        <SectionLabel>🔊 Speaker Studio</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {AUDIO_TECH.map((item) => (
            <CustomizerProductCard
              key={item.id}
              product={item}
              selected={isTechSelected(item.id)}
              onSelect={() => toggleTech(item)}
              isMultiSelect={true}
            />
          ))}
        </div>
      </div>

      {/* ── Video (Webcam) ────────────────────────────── */}
      {VIDEO_TECH.length > 0 && (
        <div>
          <SectionLabel>📹 Kamera & Video</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {VIDEO_TECH.map((item) => (
              <CustomizerProductCard
                key={item.id}
                product={item}
                selected={isTechSelected(item.id)}
                onSelect={() => toggleTech(item)}
                isMultiSelect={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Accessories & Lifestyle ────────────────────── */}
      <div>
        <SectionLabel>🌿 Aksesoris & Suasana</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ACCESSORIES.map((item) => (
            <CustomizerProductCard
              key={item.id}
              product={item}
              selected={isAccSelected(item.id)}
              onSelect={() => toggleAccessory(item)}
              isMultiSelect={true}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

// ── Helper ─────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--ink-soft)',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        margin: '0 0 8px 4px',
      }}
    >
      {children}
    </p>
  );
}
