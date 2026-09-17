'use client';

import React from 'react';
import { DESKS } from '@/data/products';
import { useWorkspaceStore } from '@/store/workspaceStore';
import CustomizerProductCard from './CustomizerProductCard';

export default function DeskSelector() {
  const { desk, setDesk } = useWorkspaceStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ padding: '0 4px 4px' }}>
        <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: 0 }}>
          Pilih 1 meja kerja utama untuk ruangan Anda.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {DESKS.map((item) => (
          <CustomizerProductCard
            key={item.id}
            product={item}
            selected={desk?.id === item.id}
            onSelect={() => setDesk(item)}
            isMultiSelect={false}
          />
        ))}
      </div>
    </div>
  );
}
