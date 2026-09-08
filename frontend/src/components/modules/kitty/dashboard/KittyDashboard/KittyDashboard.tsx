'use client';

import React from 'react';
import styles from './KittyDashboard.module.css';
import {
  KittyHeroGreeting,
  KittyQuoteCard,
  TogetherTimer,
  KittySinometer,
  KittyStatsWidget,
} from '../../widgets';
import { AnimateIn } from '@/components/UI';

export const KittyDashboard: React.FC = () => {
  return (
    <main className={styles.mainContent}>
      <div className={styles.widgetsGrid}>
        <div className={styles.colSpan23}>
          <AnimateIn direction="up" delay={0.1}>
            <KittyHeroGreeting />
          </AnimateIn>
        </div>

        <div className={styles.colSpan13}>
          <AnimateIn direction="up" delay={0.15}>
            <KittyStatsWidget />
          </AnimateIn>
        </div>

        <div className={styles.colSpanFull}>
          <AnimateIn direction="up" delay={0.2}>
            <TogetherTimer />
          </AnimateIn>
        </div>

        <div className={styles.colSpan12}>
          <AnimateIn direction="up" delay={0.3}>
            <KittyQuoteCard />
          </AnimateIn>
        </div>

        <div className={styles.colSpan12}>
          <AnimateIn direction="up" delay={0.4}>
            <KittySinometer />
          </AnimateIn>
        </div>
      </div>
    </main>
  );
};

