'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GIFT_CONTENT } from '../../content';
import styles from './TeaserStep.module.css';

interface TeaserStepProps {
  onNext: () => void;
}

export const TeaserStep: React.FC<TeaserStepProps> = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(onNext, 2200);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className={styles.container}>
      <motion.p
        className={styles.phrase}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {GIFT_CONTENT.teaserPhrase}
      </motion.p>
    </div>
  );
};
