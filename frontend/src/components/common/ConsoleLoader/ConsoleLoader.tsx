'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styles from './ConsoleLoader.module.css';
import { ROMANTIC_LOGS } from './consoleLoader.constants';
import { useConsoleLoaderStore } from '@/store/useConsoleLoaderStore';

interface ConsoleLoaderProps {
  onComplete?: () => void;
}

export const ConsoleLoader: React.FC<ConsoleLoaderProps> = ({ onComplete }) => {
  const { isConsoleLoaderEnabled, initStore } = useConsoleLoaderStore();

  useEffect(() => {
    initStore();
  }, [initStore]);

  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState<string>('');
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [visibleLogs]);

  useEffect(() => {
    if (lineIndex >= ROMANTIC_LOGS.length) {
      const timer = setTimeout(() => {
        setIsCompleted(true);
        if (onComplete) onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }

    const targetLine = ROMANTIC_LOGS[lineIndex];

    if (charIndex < targetLine.length) {
      const charTimer = setTimeout(
        () => {
          setCurrentText((prev) => prev + targetLine[charIndex]);
          setCharIndex((prev) => prev + 1);
        },
        20 + Math.random() * 20,
      );

      return () => clearTimeout(charTimer);
    } else {
      const lineTimer = setTimeout(
        () => {
          setVisibleLogs((prev) => [...prev, targetLine]);
          setCurrentText('');
          setCharIndex(0);
          setLineIndex((prev) => prev + 1);
        },
        100 + Math.random() * 150,
      );

      return () => clearTimeout(lineTimer);
    }
  }, [lineIndex, charIndex, onComplete]);

  if (!isConsoleLoaderEnabled || isCompleted) return null;

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className={styles.consoleContent} ref={containerRef}>
            <AnimatePresence mode="popLayout">
              {visibleLogs.slice(-5).map((log) => (
                <motion.div
                  key={log}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={styles.logLine}
                >
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>

            {lineIndex < ROMANTIC_LOGS.length && (
              <div ref={activeLineRef} className={styles.logLine}>
                {currentText}
                <span className={styles.cursor}>▊</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
