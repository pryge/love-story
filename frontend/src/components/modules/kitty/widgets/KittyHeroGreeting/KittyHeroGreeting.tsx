'use client';

import React, { useState } from 'react';
import { getGreetingPartsByHour } from './kittyHeroGreeting.constants';
import { Sparkles } from '@/components/UI';
import styles from './KittyHeroGreeting.module.css';

export const KittyHeroGreeting: React.FC = () => {
  const [greeting] = useState(getGreetingPartsByHour);

  return (
    <section className={styles.heroGrid}>
      <div className={styles.leftGreetingCard}>
        <div className={styles.badgeRow}>
          <span className={styles.pillBadge}>
            <Sparkles size={14} className={styles.badgeIcon} />
            Для найдорожчої у світі
          </span>
        </div>

        <h1 className={styles.title}>
          <span>{greeting.prefix}</span>{' '}
          <span className={styles.scriptAccent}>{greeting.accent}</span>
        </h1>
      </div>

      <div className={styles.rightWidgetsSpace}></div>
    </section>
  );
};
