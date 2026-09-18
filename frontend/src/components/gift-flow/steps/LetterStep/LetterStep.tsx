'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GIFT_CONTENT } from '../../content';
import { PhotoMoment } from '../../components/PhotoMoment/PhotoMoment';
import styles from './LetterStep.module.css';

interface LetterStepProps {
  onNext: () => void;
}

export const LetterStep: React.FC<LetterStepProps> = ({ onNext }) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const lines = GIFT_CONTENT.letterLines;

  /* ── Auto-scroll to latest line ── */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [visibleLines, currentText]);

  /* ── Typewriter loop (same pattern as ConsoleLoader) ── */
  useEffect(() => {
    if (lineIndex >= lines.length) {
      const timer = setTimeout(() => {
        setIsTypingDone(true);
        setTimeout(() => setShowPhoto(true), 400);
        setTimeout(() => setShowButton(true), 1200);
      }, 500);
      return () => clearTimeout(timer);
    }

    const targetLine = lines[lineIndex];

    if (charIndex < targetLine.length) {
      const charTimer = setTimeout(
        () => {
          setCurrentText((prev) => prev + targetLine[charIndex]);
          setCharIndex((prev) => prev + 1);
        },
        30 + Math.random() * 30,
      );
      return () => clearTimeout(charTimer);
    } else {
      const lineTimer = setTimeout(
        () => {
          setVisibleLines((prev) => [...prev, targetLine]);
          setCurrentText('');
          setCharIndex(0);
          setLineIndex((prev) => prev + 1);
        },
        200 + Math.random() * 200,
      );
      return () => clearTimeout(lineTimer);
    }
  }, [lineIndex, charIndex, lines]);

  return (
    <div className={styles.container}>
      <div className={styles.letterCard} ref={scrollRef}>
        <div className={styles.letterContent}>
          <AnimatePresence mode="popLayout">
            {visibleLines.map((line, i) => (
              <motion.p
                key={`line-${i}`}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={styles.letterLine}
              >
                {line}
              </motion.p>
            ))}
          </AnimatePresence>

          {lineIndex < lines.length && (
            <p className={styles.letterLine}>
              {currentText}
              <span className={styles.cursor}>▊</span>
            </p>
          )}
        </div>

        {/* Polaroid after typing finishes */}
        <AnimatePresence>
          {showPhoto && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={styles.photoWrap}
            >
              <PhotoMoment
                src={GIFT_CONTENT.photoSrc}
                caption={GIFT_CONTENT.photoCaption}
                alt={GIFT_CONTENT.photoAlt}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={styles.buttonWrap}
            >
              <button className={styles.nextBtn} onClick={onNext}>
                Далі →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
