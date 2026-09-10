'use client';

import React from 'react';
import styles from './BackgroundEffects.module.css';

export type BgVariant = 'sparkles';

interface BackgroundEffectsProps {
  variant?: BgVariant;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = () => {
  return (
    <div className={styles.container} aria-hidden="true">
      <div className={styles.ambientGlow} />
      <div className={styles.ambientGlow2} />
    </div>
  );
};
