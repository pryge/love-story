'use client';

import React from 'react';
import { AnimateIn, Sparkles } from '@/components/UI';
import styles from './KittyPhrasesPage.module.css';

export const KittyPhrasesPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <AnimateIn direction="up" delay={0.1}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <Sparkles size={24} className={styles.iconAccent} />
            Фразочки Олега 💬
          </h1>
          <p className={styles.subtitle}>
            Спеціальна колекція особливих фраз та висловлювань
          </p>
        </div>
      </AnimateIn>
    </div>
  );
};
