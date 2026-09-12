'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@/components/UI';
import { CalculatedDateInfo } from '@/components/modules/kitty/widgets/KittyOurDates/kittyOurDates.utils';
import styles from './KittyTimeCapsule.module.css';

interface KittyTimeCapsuleProps {
  date: CalculatedDateInfo | null;
  onClose: () => void;
}

export const KittyTimeCapsule: React.FC<KittyTimeCapsuleProps> = ({
  date,
  onClose,
}) => {

  // Lock body scroll when open
  useEffect(() => {
    if (date) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [date]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {date && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Close button */}
          <motion.button
            className={styles.closeBtn}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            aria-label="Закрити"
          >
            <X size={20} />
          </motion.button>

          {/* Content */}
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            {/* Category */}
            <motion.span
              className={styles.category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              {date.category}
            </motion.span>

            {/* Title — fade up */}
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
            >
              {date.title}
            </motion.h2>

            {/* Date badge */}
            <motion.div
              className={styles.dateBadge}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
            >
              <span className={styles.badgeDay}>{date.dayStr}</span>
              <span className={styles.badgeMonth}>{date.monthStr}</span>
            </motion.div>

            {/* Countdown */}
            <motion.p
              className={styles.countdown}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {date.countdownText}
            </motion.p>

            {/* Favorite star */}
            {date.isFavorite && (
              <motion.span
                className={styles.favStar}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.75, type: 'spring', stiffness: 200 }}
              >
                ⭐ Особлива дата
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
