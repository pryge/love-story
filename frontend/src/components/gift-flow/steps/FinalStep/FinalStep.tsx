'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GIFT_CONTENT } from '../../content';
import { FallingHearts } from '@/components/UI/FallingHearts/FallingHearts';
import styles from './FinalStep.module.css';

export const FinalStep: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const shareData = {
      title: 'Love Story 💖',
      text: 'Дивись, що мені подарували ♥',
      url,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy link
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Clipboard API not available
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* Falling hearts background */}
      <div className={styles.heartsOverlay}>
        <FallingHearts count={30} />
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.heartEmoji}>♥</div>

        <h1 className={styles.title}>{GIFT_CONTENT.finalText}</h1>

        <button className={styles.shareBtn} onClick={handleShare}>
          {copied ? '✓ Посилання скопійовано' : 'Поділитися 💌'}
        </button>

        {/* Toast */}
        <AnimatePresence>
          {copied && (
            <motion.div
              className={styles.toast}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              Посилання скопійовано ♥
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
