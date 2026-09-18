'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { GIFT_CONTENT } from '../../content';
import styles from './GateStep.module.css';

interface GateStepProps {
  onNext: () => void;
}

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export const GateStep: React.FC<GateStepProps> = ({ onNext }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const normalized = normalize(answer);
      const expected = normalize(GIFT_CONTENT.gateAnswer);

      if (normalized === expected) {
        setError(false);
        onNext();
      } else {
        setError(true);
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
        inputRef.current?.focus();
      }
    },
    [answer, onNext],
  );

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.lockIcon}>🔒</div>

        <h1 className={styles.title}>{GIFT_CONTENT.gateTitle}</h1>

        <p className={styles.hint}>{GIFT_CONTENT.gateHint}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <motion.div
            animate={shaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={styles.inputWrap}
          >
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Твоя відповідь..."
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              autoFocus
              autoComplete="off"
            />
          </motion.div>

          {error && (
            <motion.p
              className={styles.errorText}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Спробуй ще раз, це не зовсім те ♥
            </motion.p>
          )}

          <button type="submit" className={styles.submitBtn} disabled={!answer.trim()}>
            Відкрити
          </button>
        </form>
      </motion.div>
    </div>
  );
};
