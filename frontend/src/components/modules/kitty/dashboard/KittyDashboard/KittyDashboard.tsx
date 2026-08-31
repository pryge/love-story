'use client';

import React from 'react';
import styles from './KittyDashboard.module.css';
import { KittyHeader, KittyFooter } from '../../layout';
import {
  KittyHeroGreeting,
  KittyQuoteCard,
  TogetherTimer,
  KittySinometer,
  KittyPlaceholderCard,
  KittyStatsWidget,
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
            <AnimateIn direction="up" delay={0.35}>
              <KittyPlaceholderCard
                span="1/2"
                title="Наші дати 🗓️"
                subtitle="Готуємо новий унікальний дизайн ✨"
              />
            </AnimateIn>
          </div>

          <div className={styles.colSpan12}>
            <AnimateIn direction="up" delay={0.4}>
              <KittySinometer />
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
