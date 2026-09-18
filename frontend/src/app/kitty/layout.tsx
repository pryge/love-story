'use client';

import React from 'react';
import { BackgroundEffects } from '@/components/UI';

export default function KittyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100dvh', position: 'relative' }}>
      <BackgroundEffects />
      {children}
    </div>
  );
}
