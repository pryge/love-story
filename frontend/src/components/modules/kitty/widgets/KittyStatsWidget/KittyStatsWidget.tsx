'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, Heart } from '@/components/UI';
import styles from './KittyStatsWidget.module.css';
import { useSinsStore } from '@/store/useSinsStore';

export const KittyStatsWidget: React.FC = () => {
  const { sins, fetchSins } = useSinsStore();

  useEffect(() => {
    fetchSins();
  }, [fetchSins]);

  const activeSinsCount = sins.filter((s) => !s.isForgiven).length;

  let colorTier: 'Green' | 'Amber' | 'Red' = 'Green';
  let percent = 0;

  if (activeSinsCount === 0) {
    colorTier = 'Green';
    percent = 100;
  } else if (activeSinsCount <= 2) {
    colorTier = 'Amber';
    percent = activeSinsCount === 1 ? 40 : 65;
  } else {
    colorTier = 'Red';
    percent = Math.min(100, 75 + (activeSinsCount - 3) * 10);
  }

  return (
    <div className={styles.card}>
      <div className={styles.statRow}>
        <div className={styles.rowHeader}>
          <div className={styles.labelGroup}>
            <FileText size={15} className={styles.labelIcon} />
            <span>Гріхомір</span>
          </div>

          <span className={`${styles.valueBadge} ${styles[`value${colorTier}`]}`}>
            {activeSinsCount === 0 ? '0 гріхів (Чисто 😇)' : `${activeSinsCount} гріхи (${percent}%)`}
          </span>
        </div>

        <div className={styles.track}>
          <div
            className={`${styles.fill} ${styles[`fill${colorTier}`]}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className={styles.statRow}>
        <div className={styles.rowHeader}>
          <div className={styles.labelGroup}>
            <Sparkles size={15} className={styles.labelIcon} />
            <span style={{ opacity: 0.6 }}>Статистика #2</span>
          </div>

          <span className={`${styles.valueBadge} ${styles.valuePlaceholder}`}>
            Скоро буде ✨
          </span>
        </div>

        <div className={`${styles.track} ${styles.trackPlaceholder}`} />
      </div>

      <div className={styles.statRow}>
        <div className={styles.rowHeader}>
          <div className={styles.labelGroup}>
            <Heart size={15} className={styles.labelIcon} />
            <span style={{ opacity: 0.6 }}>Статистика #3</span>
          </div>

          <span className={`${styles.valueBadge} ${styles.valuePlaceholder}`}>
            Скоро буде ✨
          </span>
        </div>

        <div className={`${styles.track} ${styles.trackPlaceholder}`} />
      </div>
    </div>
  );
};
