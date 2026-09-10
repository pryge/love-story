'use client';

import React from 'react';
import styles from './KittyDashboard.module.css';
import {
  KittyHeroGreeting,
  KittyQuoteCard,
  TogetherTimer,
  KittySinometer,
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

        <div className={styles.twoColSection}>
          <AnimateIn direction="up" delay={0.3} className={styles.flexItem}>
            <KittyQuoteCard />
          </AnimateIn>

          <AnimateIn direction="up" delay={0.4} className={styles.flexItem}>
            <KittySinometer />
          </AnimateIn>
        </div>
      </div>
    </main>
  );
};
