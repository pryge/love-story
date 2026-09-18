'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './PhotoMoment.module.css';

interface PhotoMomentProps {
  src: string;
  caption: string;
  alt?: string;
}

export const PhotoMoment: React.FC<PhotoMomentProps> = ({
  src,
  caption,
  alt = 'Фото',
}) => {
  return (
    <motion.div
      className={styles.polaroid}
      initial={{ opacity: 0, rotate: -2, y: 20 }}
      animate={{ opacity: 1, rotate: -1.5, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.photoFrame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={styles.photo} />
      </div>
      <p className={styles.caption}>{caption}</p>
    </motion.div>
  );
};
