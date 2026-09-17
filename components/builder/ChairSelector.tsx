'use client';

import React from 'react';
import { CHAIRS } from '@/data/products';
import { useWorkspaceStore } from '@/store/workspaceStore';
import CustomizerProductCard from './CustomizerProductCard';

export default function ChairSelector() {
  const { chair, setChair } = useWorkspaceStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ padding: '0 4px 4px' }}>
        <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: 0 }}>
          Pilih 1 kursi ergonomis yang menopang postur kerja Anda.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {CHAIRS.map((item) => (
          <CustomizerProductCard
            key={item.id}
            product={item}
            selected={chair?.id === item.id}
            onSelect={() => setChair(item)}
            isMultiSelect={false}
          />
        ))}
      </div>
    </div>
  );
}
