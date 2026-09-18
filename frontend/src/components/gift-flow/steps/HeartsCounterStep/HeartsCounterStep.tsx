'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GIFT_CONTENT } from '../../content';
import { KittyMosaicReveal } from '../../components/KittyMosaicReveal/KittyMosaicReveal';
import styles from './HeartsCounterStep.module.css';

interface HeartsCounterStepProps {
  onNext: () => void;
}

const HOLD_DURATION_MS = 5000; // 5 seconds full hold to reveal
const DECAY_RATE = 0.015; // how fast progress decays per frame when released

export const HeartsCounterStep: React.FC<HeartsCounterStepProps> = ({ onNext }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const progressMV = useMotionValue(0);
  const progressSpring = useSpring(progressMV, { stiffness: 100, damping: 20 });

  const isHoldingRef = useRef(false);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const progressRef = useRef(0);

  // Counter value derived from progress
  const counterMV = useTransform(progressSpring, [0, 1], [0, GIFT_CONTENT.heartsCount]);
  const [displayCount, setDisplayCount] = useState(0);
  const [mosaicProgress, setMosaicProgress] = useState(0);

  useEffect(() => {
    const unsubCounter = counterMV.on('change', (v) => {
      setDisplayCount(Math.round(v));
    });
    const unsubSpring = progressSpring.on('change', (v) => {
      setMosaicProgress(v);
    });
    return () => {
      unsubCounter();
      unsubSpring();
    };
  }, [counterMV, progressSpring]);

  // Build the phrase with counter
  const phrase = GIFT_CONTENT.heartsCounterPhrase.replace('{N}', String(displayCount));

  /* ── Animation loop ── */
  const animationLoop = useCallback(() => {
    if (isComplete) return;

    if (isHoldingRef.current) {
      const elapsed = performance.now() - startTimeRef.current;
      const newProgress = Math.min(elapsed / HOLD_DURATION_MS, 1);
      progressRef.current = newProgress;
      progressMV.set(newProgress);

      if (newProgress >= 1 && !isComplete) {
        setIsComplete(true);
        setTimeout(() => setShowNext(true), 1200);
        return;
      }
    } else {
      // Decay progress
      if (progressRef.current > 0) {
        progressRef.current = Math.max(0, progressRef.current - DECAY_RATE);
        progressMV.set(progressRef.current);
      }
    }

    rafRef.current = requestAnimationFrame(animationLoop);
  }, [progressMV, isComplete]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animationLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animationLoop]);

  /* ── Press handlers ── */
  const handlePointerDown = useCallback(() => {
    if (isComplete) return;
    isHoldingRef.current = true;
    // Calculate start time based on current progress so it continues from where it was
    startTimeRef.current = performance.now() - progressRef.current * HOLD_DURATION_MS;
  }, [isComplete]);

  const handlePointerUp = useCallback(() => {
    isHoldingRef.current = false;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Counter phrase */}
        <motion.p
          className={styles.counterPhrase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {phrase}
        </motion.p>

        {/* Mosaic reveal area — press and hold */}
        <div
          className={styles.mosaicWrap}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'none', userSelect: 'none' }}
        >
          <KittyMosaicReveal
            imageSrc={GIFT_CONTENT.mosaicPhotoSrc}
            word={GIFT_CONTENT.mosaicWord}
            progress={mosaicProgress}
            width={360}
            height={450}
          />

          {/* Hold hint overlay */}
          {!isComplete && (
            <motion.div
              className={styles.holdHint}
              animate={{
                opacity: isHoldingRef.current ? 0 : 0.9,
              }}
            >
              <span className={styles.holdIcon}>👆</span>
              <span className={styles.holdText}>Тримай, щоб побачити</span>
            </motion.div>
          )}
        </div>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <motion.div
            className={styles.progressFill}
            style={{ scaleX: progressSpring }}
          />
        </div>

        {/* Next button after complete */}
        {showNext && (
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
      </div>
    </div>
  );
};
