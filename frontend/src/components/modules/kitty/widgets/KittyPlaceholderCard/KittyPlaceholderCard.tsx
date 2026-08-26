'use client';

import React from 'react';
import { Sparkles } from '@/components/UI';
import styles from './KittyPlaceholderCard.module.css';

export type WidgetSpan = '1/3' | '2/3' | '3/3' | '1/2';

interface KittyPlaceholderCardProps {
  title?: string;
  subtitle?: string;
  span?: WidgetSpan;
}

export const KittyPlaceholderCard: React.FC<KittyPlaceholderCardProps> = ({
  title = 'Новий віджет ✨',
  subtitle = 'Тут незабаром зʼявиться віджет',
  span = '1/2',
}) => {
  const getSpanClass = () => {
    switch (span) {
      case '1/3':
        return styles.span13;
      case '2/3':
        return styles.span23;
      case '3/3':
        return styles.span33;
      case '1/2':
      default:
        return styles.span12;
    }
  };

  return (
    <div className={`${styles.card} ${getSpanClass()}`}>
      <div className={styles.spanBadge}>{span} ширина</div>
      <Sparkles size={24} className={styles.icon} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

