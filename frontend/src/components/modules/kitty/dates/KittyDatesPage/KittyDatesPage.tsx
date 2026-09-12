'use client';

import React, { useState, useEffect } from 'react';
import { Star } from '@/components/UI';
import { AnimateIn } from '@/components/UI';
import { datesService } from '@/services/dates.service';
import { ImportantDate } from '@/components/modules/kitty/widgets/KittyOurDates/kittyOurDates.constants';
import {
  CalculatedDateInfo,
  getAllCalculatedDates,
} from '@/components/modules/kitty/widgets/KittyOurDates/kittyOurDates.utils';
import { KittyTimeCapsule } from '@/components/modules/kitty/widgets/KittyTimeCapsule/KittyTimeCapsule';
import styles from './KittyDatesPage.module.css';

export const KittyDatesPage: React.FC = () => {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<CalculatedDateInfo | null>(null);

  useEffect(() => {
    datesService.getDates().then(setDates);
  }, []);

  const calculated = getAllCalculatedDates(dates);

  return (
    <div className={styles.container}>
      <AnimateIn direction="up" delay={0.1}>
        <div className={styles.header}>
          <h1 className={styles.title}>Наші Важливі Дати 🗓️</h1>
          <p className={styles.subtitle}>
            Натисни на дату, щоб зануритись у спогади
          </p>
        </div>
      </AnimateIn>

      <div className={styles.datesList}>
        {calculated.map((item, index) => (
          <AnimateIn key={item.id} direction="up" delay={0.15 + index * 0.08}>
            <button
              type="button"
              className={styles.dateCard}
              onClick={() => setSelectedDate(item)}
            >
              <div className={styles.cardLeft}>
                <div className={styles.dateBadge}>
                  <span className={styles.badgeDay}>{item.dayStr}</span>
                  <span className={styles.badgeMonth}>{item.monthStr}</span>
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardTitle}>{item.title}</span>
                  <span className={styles.cardCountdown}>
                    {item.countdownText}
                  </span>
                  <span className={styles.cardCategory}>{item.category}</span>
                </div>
              </div>

              {item.isFavorite && (
                <Star
                  size={16}
                  className={styles.starIcon}
                  fill="currentColor"
                />
              )}
            </button>
          </AnimateIn>
        ))}
      </div>

      <KittyTimeCapsule
        date={selectedDate}
        onClose={() => setSelectedDate(null)}
      />
    </div>
  );
};
