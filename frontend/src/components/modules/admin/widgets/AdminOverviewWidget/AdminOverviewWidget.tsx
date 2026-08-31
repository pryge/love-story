'use client';

import React, { useState, useEffect } from 'react';
import styles from './AdminOverviewWidget.module.css';
import { AdminSinsWidget } from '../AdminSinsWidget';
import { datesService } from '@/services/dates.service';
import { quotesService } from '@/services/quotes.service';
import { useSinsStore } from '@/store/useSinsStore';

export const AdminOverviewWidget: React.FC = () => {
  const [datesCount, setDatesCount] = useState(0);
  const [quotesCount, setQuotesCount] = useState(0);
  const { sins, fetchSins } = useSinsStore();

  useEffect(() => {
    let isMounted = true;

    datesService.getDates().then((data) => {
      if (isMounted) setDatesCount(data.length);
    });

    quotesService.getQuotes().then((data) => {
      if (isMounted) setQuotesCount(data.length);
    });

    fetchSins();

    return () => {
      isMounted = false;
    };
  }, [fetchSins]);

  const activeSinsCount = sins.filter((s) => !s.isForgiven).length;

  return (
    <div className={styles.container}>
      <div className={styles.widgetsGrid}>
        <div className={styles.colSpan23}>
          <div className={styles.welcomeCard}>
            <h2 className={styles.welcomeTitle}>Вітаємо в Адмін-Панелі Олега 👋</h2>
            <p className={styles.welcomeSub}>
              Головний центр керування історією кохання: дати, цитати та Гріхомір Каті.
            </p>
          </div>
        </div>

        <div className={styles.colSpan13}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryTitle}>Огляд системи</span>

            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryVal}>{datesCount}</span>
                <span className={styles.summaryLabel}>Дати</span>
              </div>

              <div className={styles.summaryItem}>
                <span className={styles.summaryVal}>{quotesCount}</span>
                <span className={styles.summaryLabel}>Цитати</span>
              </div>

              <div className={styles.summaryItem}>
                <span className={styles.summaryVal}>{activeSinsCount}</span>
                <span className={styles.summaryLabel}>Гріхи</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.colSpanFull}>
          <div className={styles.widgetBox}>
            <AdminSinsWidget />
          </div>
        </div>
      </div>
    </div>
  );
};
