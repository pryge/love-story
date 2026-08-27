'use client';

import React from 'react';
import styles from './KittyDashboard.module.css';
import { KittyHeader, KittyFooter } from '../../layout';
import {
  KittyHeroGreeting,
  KittyQuoteCard,
  TogetherTimer,
  KittyPlaceholderCard,
  KittyOurDates,
} from '../../widgets';
import { BackgroundEffects, AnimateIn } from '@/components/UI';

export const KittyDashboard: React.FC = () => {
  return (
    <div className={styles.pageLayout}>
      <BackgroundEffects />
      <KittyHeader />

      <main className={styles.mainContent}>
        <div className={styles.widgetsGrid}>
          <div className={styles.colSpan23}>
            <AnimateIn direction="up" delay={0.1}>
              <KittyHeroGreeting />
            </AnimateIn>
          </div>

          <div className={styles.colSpan13}>
            <AnimateIn direction="up" delay={0.15}>
              <KittyPlaceholderCard span="1/3" title="Віджет 1/3 ✨" subtitle="Праворуч від привітання" />
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
            <AnimateIn direction="up" delay={0.35}>
              <KittyOurDates />
            </AnimateIn>
          </div>
        </div>
      </main>




      <AnimateIn direction="fade" delay={0.5}>
        <KittyFooter />
      </AnimateIn>
    </div>
  );
};

