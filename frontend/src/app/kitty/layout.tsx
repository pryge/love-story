'use client';

import React from 'react';
import { ConsoleLoader } from '@/components/common';
import { BackgroundEffects } from '@/components/UI';
import { KittyHeader, KittyFooter, KittyBottomNav } from '@/components/modules/kitty/layout';

export default function KittyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ConsoleLoader />
      <BackgroundEffects />
      <KittyHeader />
      <div style={{ flex: 1 }}>{children}</div>
      <KittyFooter />
      <KittyBottomNav />
    </div>
  );
}
