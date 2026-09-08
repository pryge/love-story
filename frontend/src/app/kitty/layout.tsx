'use client';

import React from 'react';
import { BackgroundEffects } from '@/components/UI';
import { KittyHeader, KittyFooter, KittyBottomNav } from '@/components/modules/kitty/layout';

export default function KittyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <BackgroundEffects />
      <KittyHeader />
      <div style={{ flex: 1 }}>{children}</div>
      <KittyFooter />
      <KittyBottomNav />
    </div>
  );
}
