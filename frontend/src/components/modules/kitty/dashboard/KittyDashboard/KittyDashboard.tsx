'use client';

import React from 'react';
import styles from './KittyDashboard.module.css';
import { KittyHeader, KittyFooter } from '../../layout';
import { KittyHeroGreeting } from '../../widgets';
import { BackgroundEffects, AnimateIn } from '@/components/UI';
import { useKittyHeader } from '../../layout/KittyHeader/useKittyHeader';

export const KittyDashboard: React.FC = () => {
  const { bgVariant, toggleBgVariant } = useKittyHeader();

  return (
    <div className={styles.pageLayout}>
      <BackgroundEffects variant={bgVariant} />
      <KittyHeader bgVariant={bgVariant} onToggleBgVariant={toggleBgVariant} />

      <main className={styles.mainContent}>
        <AnimateIn direction="up" delay={0.1}>
          <KittyHeroGreeting />
        </AnimateIn>
      </main>

      <AnimateIn direction="fade" delay={0.3}>
        <KittyFooter />
      </AnimateIn>
    </div>
  );
};
