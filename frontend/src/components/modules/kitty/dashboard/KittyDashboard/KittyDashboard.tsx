'use client';

import React from 'react';
import styles from './KittyDashboard.module.css';
import {
  KittyHeroGreeting,
  KittyQuoteCard,
  TogetherTimer,
} from '../../widgets';
import { AnimateIn } from '@/components/UI';

export const KittyDashboard: React.FC = () => {
  return (
    <main className={styles.mainContent}>
      <div className={styles.widgetsContainer}>
        <AnimateIn direction="up" delay={0.1}>
          <KittyHeroGreeting />
        </AnimateIn>

        <AnimateIn direction="up" delay={0.2}>
          <TogetherTimer />
        </AnimateIn>

        <AnimateIn direction="up" delay={0.3}>
          <KittyQuoteCard />
        </AnimateIn>
      </div>
    </main>
  );
};
