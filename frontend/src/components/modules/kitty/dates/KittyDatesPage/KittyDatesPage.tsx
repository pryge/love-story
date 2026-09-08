'use client';

import React from 'react';
import { AnimateIn } from '@/components/UI';
import styles from './KittyDatesPage.module.css';

export const KittyDatesPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <AnimateIn direction="up" delay={0.1}>
        <div className={styles.header}>
          <h1 className={styles.title}>Наші Важливі Дати 🗓️✨</h1>
          <p className={styles.subtitle}>
            Хронологія нашого кохання та незабутніх моментів
          </p>
        </div>
      </AnimateIn>
    </div>
  );
};
