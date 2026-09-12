'use client';

import React from 'react';
import { ConsoleLoader } from '@/components/common';
import { BackgroundEffects } from '@/components/UI';
import { KittyFooter, KittyTabBar } from '@/components/modules/kitty/layout';
import { KittyTopActions } from '@/components/modules/kitty/layout/KittyTopActions/KittyTopActions';

export default function KittyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ConsoleLoader />
      <BackgroundEffects />

      {/* Кнопки теми + виходу — fixed у верхньому правому куті */}
      <KittyTopActions />

      {/* Основний контент зі збільшеним нижнім відступом для таб-бару */}
      <div style={{ flex: 1, paddingBottom: 'calc(86px + env(safe-area-inset-bottom, 0px))' }}>
        {children}
      </div>

      <KittyFooter />
      <KittyTabBar />
    </div>
  );
}
