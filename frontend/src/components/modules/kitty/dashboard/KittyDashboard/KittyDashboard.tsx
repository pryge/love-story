'use client';

import React from 'react';
import styles from './KittyDashboard.module.css';
import { KittyHeader, KittyFooter } from '../../layout';
import {
  KittyHeroGreeting,
  KittyQuoteCard,
  TogetherTimer,
  KittyPlaceholderCard,
} from '../../widgets';
import { BackgroundEffects, AnimateIn } from '@/components/UI';
import { useKittyHeader } from '../../layout/KittyHeader/useKittyHeader';

export const KittyDashboard: React.FC = () => {
  const { bgVariant, toggleBgVariant } = useKittyHeader();

  return (
    <div className={styles.pageLayout}>
      <BackgroundEffects variant={bgVariant} />
      <KittyHeader bgVariant={bgVariant} onToggleBgVariant={toggleBgVariant} />

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
              <KittyPlaceholderCard span="1/2" title="Віджет 1/2 ✨" subtitle="Нижня сітка віджетів" />
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

