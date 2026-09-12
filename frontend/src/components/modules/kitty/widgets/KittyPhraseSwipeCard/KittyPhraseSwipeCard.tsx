'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from '@/components/UI';
import { quotesService, Quote } from '@/services/quotes.service';
import styles from './KittyPhraseSwipeCard.module.css';

const FALLBACK_QUOTES: Quote[] = [
  { id: 'fallback-1', text: 'Ти — мій найулюбленіший простір 🌸' },
  { id: 'fallback-2', text: 'Кожен день з тобою — як маленьке свято ✨' },
  { id: 'fallback-3', text: 'Ти робиш мене найщасливішим 💖' },
];

const SWIPE_THRESHOLD = 80;

export const KittyPhraseSwipeCard: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newText, setNewText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 0, 200], [-12, 0, 12]);
  const cardOpacity = useTransform(
    dragX,
    [-200, -100, 0, 100, 200],
    [0.6, 0.85, 1, 0.85, 0.6]
  );

  const loadQuotes = useCallback(async () => {
    const data = await quotesService.getQuotes();
    setQuotes(data.length > 0 ? data : FALLBACK_QUOTES);
    return data;
  }, []);

  useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  const totalQuotes = quotes.length;
  const currentQuote = quotes[currentIndex];

  const goToNext = useCallback(() => {
    if (isAnimating || totalQuotes === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalQuotes);
    dragX.set(0);
  }, [isAnimating, totalQuotes, dragX]);

  const goToPrev = useCallback(() => {
    if (isAnimating || totalQuotes === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalQuotes) % totalQuotes);
    dragX.set(0);
  }, [isAnimating, totalQuotes, dragX]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const offset = info.offset.x;
      if (Math.abs(offset) > SWIPE_THRESHOLD) {
        setIsAnimating(true);
        if (offset > 0) {
          goToPrev();
        } else {
          goToNext();
        }
        dragX.set(0);
        setTimeout(() => setIsAnimating(false), 300);
      }
    },
    [goToNext, goToPrev, dragX]
  );

  const handleCreateQuote = useCallback(async () => {
    const trimmed = newText.trim();
    if (!trimmed || isSaving) return;
    setIsSaving(true);
    try {
      await quotesService.createQuote({ text: trimmed });
      const freshQuotes = await loadQuotes();
      // Jump to the last (newly added) quote
      setCurrentIndex(Math.max(freshQuotes.length - 1, 0));
      setNewText('');
      setShowForm(false);
    } catch {
      // silently fail — user can retry
    } finally {
      setIsSaving(false);
    }
  }, [newText, isSaving, loadQuotes]);

  if (quotes.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Завантаження фраз...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Card area */}
      <div className={styles.cardArea}>
        <motion.div
          key={currentIndex}
          className={styles.card}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={handleDragEnd}
          style={{ x: dragX, rotate, opacity: cardOpacity }}
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <span className={styles.quoteMark}>&ldquo;</span>
          <p className={styles.quoteText}>{currentQuote?.text}</p>
          <span className={styles.authorTag}>— для моєї Каті ♥</span>
        </motion.div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrowBtn}
          onClick={goToPrev}
          aria-label="Попередня фраза"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Progress dots */}
        <div className={styles.dots}>
          {quotes.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.arrowBtn}
          onClick={goToNext}
          aria-label="Наступна фраза"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Counter */}
      <span className={styles.counter}>
        {currentIndex + 1} / {totalQuotes}
      </span>

      {/* FAB — Add quote */}
      <button
        type="button"
        className={styles.fab}
        onClick={() => setShowForm(true)}
        aria-label="Додати фразу"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Add-quote form overlay */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className={styles.formOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className={styles.formCard}
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={styles.formTitle}>Нова фраза 💌</span>
              <textarea
                className={styles.formTextarea}
                placeholder="Напиши щось тепле..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                rows={3}
                maxLength={300}
                autoFocus
              />
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.formCancel}
                  onClick={() => { setShowForm(false); setNewText(''); }}
                >
                  Скасувати
                </button>
                <button
                  type="button"
                  className={styles.formSave}
                  onClick={handleCreateQuote}
                  disabled={!newText.trim() || isSaving}
                >
                  {isSaving ? 'Зберігаю…' : 'Зберегти'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
