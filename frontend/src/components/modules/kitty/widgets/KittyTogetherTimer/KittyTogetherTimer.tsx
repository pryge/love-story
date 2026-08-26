'use client';

import React, { useState, useEffect } from 'react';
import styles from './KittyTogetherTimer.module.css';
import { calculateTimeTogether, DEFAULT_START_DATE, TimeTogether } from './togetherTimer.utils';

interface TogetherTimerProps {
  startDate?: Date;
}

export const TogetherTimer: React.FC<TogetherTimerProps> = ({ startDate = DEFAULT_START_DATE }) => {
  const [time, setTime] = useState<TimeTogether>(() => calculateTimeTogether(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeTogether(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.eyebrow}>МИ РАЗОМ</span>
        <div className={styles.liveBadge}>
          <span className={styles.pulseDot} />
          LIVE
        </div>
      </div>

      <h2 className={styles.summaryTitle}>{time.formattedSummary}</h2>

      <div className={styles.counterGrid}>
        <div className={styles.timeBlock}>
          <span className={styles.num}>{time.years}</span>
          <span className={styles.unit}>роки</span>
        </div>
        <div className={styles.timeBlock}>
          <span className={styles.num}>{time.months}</span>
          <span className={styles.unit}>міс.</span>
        </div>
        <div className={styles.timeBlock}>
          <span className={styles.num}>{time.days}</span>
          <span className={styles.unit}>дні</span>
        </div>
        <div className={styles.timeBlock}>
          <span className={styles.num}>{time.hours}</span>
          <span className={styles.unit}>год.</span>
        </div>
        <div className={styles.timeBlock}>
          <span className={styles.num}>{time.minutes}</span>
          <span className={styles.unit}>хв.</span>
        </div>
        <div className={styles.timeBlock}>
          <span className={styles.num}>{time.seconds}</span>
          <span className={styles.unit}>сек.</span>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <span>Від 15 лютого 2023</span>
        <span className={styles.foreverText}>
          і назавжди <span className={styles.heartIcon}>♥</span>
        </span>
      </div>
    </div>
  );
};
