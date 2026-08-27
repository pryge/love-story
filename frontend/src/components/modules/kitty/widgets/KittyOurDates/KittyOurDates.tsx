'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Star, ChevronRight, X } from '@/components/UI';
import styles from './KittyOurDates.module.css';
import { ImportantDate, INITIAL_IMPORTANT_DATES } from './kittyOurDates.constants';
import { getAllCalculatedDates } from './kittyOurDates.utils';
import { datesService } from '@/services/dates.service';

export const KittyOurDates: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dates, setDates] = useState<ImportantDate[]>(INITIAL_IMPORTANT_DATES);

  useEffect(() => {
    let isMounted = true;
    datesService.getDates().then((data) => {
      if (isMounted && data.length > 0) {
        setDates(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const allCalculated = getAllCalculatedDates(dates);
  const displayDates = isExpanded ? allCalculated : allCalculated.slice(0, 2);

  return (
    <div className={`${styles.card} ${isExpanded ? styles.cardElevated : ''}`}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <Calendar size={20} className={styles.titleIcon} />
          <span>Наші дати</span>
          {isExpanded && <span className={styles.countBadge}>({allCalculated.length})</span>}
        </div>

        <button
          type="button"
          className={`${styles.allBtn} ${isExpanded ? styles.allBtnActive : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{isExpanded ? 'Згорнути' : 'Всі'}</span>
          {isExpanded ? <X size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      <div className={`${styles.datesList} ${isExpanded ? styles.expandedList : styles.collapsedList}`}>
        {displayDates.map((item, index) => {
          const isLast = index === displayDates.length - 1;
          return (
            <div key={item.id} className={styles.dateItem}>
              <div className={styles.itemLeft}>
                <div className={styles.badgeContainer}>
                  <div className={styles.dateBadge}>
                    <span className={styles.badgeDay}>{item.dayStr}</span>
                    <span className={styles.badgeMonth}>{item.monthStr}</span>
                  </div>
                  {isExpanded && !isLast && <div className={styles.timelineLine} />}
                </div>

                <div className={styles.itemInfo}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemCountdown}>{item.countdownText}</span>
                  {isExpanded && <span className={styles.modalTag}>{item.category}</span>}
                </div>
              </div>

              {item.isFavorite && (
                <Star size={16} className={styles.starIcon} fill="currentColor" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
