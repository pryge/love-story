'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Star, X } from '@/components/UI';
import styles from './KittyOurDates.module.css';
import { CalculatedDateInfo } from './kittyOurDates.utils';

interface OurDatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  dates: CalculatedDateInfo[];
}

export const OurDatesModal: React.FC<OurDatesModalProps> = ({
  isOpen,
  onClose,
  dates,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);


  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalWindow}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Всі наші дати 🗓️</h3>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            title="Закрити"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.modalList}>
          {dates.map((item) => (
            <div key={item.id} className={styles.dateItem}>
              <div className={styles.itemLeft}>
                <div className={styles.dateBadge}>
                  <span className={styles.badgeDay}>{item.dayStr}</span>
                  <span className={styles.badgeMonth}>{item.monthStr}</span>
                </div>
                <div className={styles.itemInfo}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemCountdown}>{item.countdownText}</span>
                  <span className={styles.modalTag}>{item.category}</span>
                </div>
              </div>

              {item.isFavorite && (
                <Star size={16} className={styles.starIcon} fill="currentColor" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};
