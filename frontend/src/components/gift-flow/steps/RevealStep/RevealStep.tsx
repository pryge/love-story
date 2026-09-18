'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GIFT_CONTENT } from '../../content';
import styles from './RevealStep.module.css';

interface RevealStepProps {
  onNext: () => void;
}

export const RevealStep: React.FC<RevealStepProps> = ({ onNext }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setIsRevealed(true), 800);
    const t2 = setTimeout(() => setShowButton(true), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Pre-reveal teaser */}
      <AnimatePresence mode="wait">
        {!isRevealed && (
          <motion.div
            key="pre"
            className={styles.preReveal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.preIcon}>✨</span>
            <p className={styles.preText}>Я дещо придумав...</p>
          </motion.div>
        )}

        {isRevealed && (
          <motion.div
            key="reveal"
            className={styles.revealCard}
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {GIFT_CONTENT.surpriseImageSrc && (
              <div className={styles.surpriseImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={GIFT_CONTENT.surpriseImageSrc}
                  alt="Сюрприз"
                  className={styles.surpriseImage}
                />
              </div>
            )}

            <div className={styles.surpriseContent}>
              <h2 className={styles.surpriseTitle}>{GIFT_CONTENT.surpriseTitle}</h2>
              <p className={styles.surpriseText}>{GIFT_CONTENT.surpriseText}</p>
            </div>

            <AnimatePresence>
              {showButton && (
                <motion.button
                  className={styles.nextBtn}
                  onClick={onNext}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Далі →
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
