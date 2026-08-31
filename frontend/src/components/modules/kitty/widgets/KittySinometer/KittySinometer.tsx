'use client';

import React, { useState, useEffect } from 'react';

import { Heart, FileText, Plus, Check, Sparkles } from '@/components/UI';
import { FallingHearts } from '@/components/UI/FallingHearts/FallingHearts';
import styles from './KittySinometer.module.css';
import { useSinsStore } from '@/store/useSinsStore';

const SEVERITIES = [
  'Маленький грішок 🐣',
  'Середня провина 🙈',
  'Серйозний проступок 💥',
  'Загладити провину смачненьким 🍰',
];

export const KittySinometer: React.FC = () => {
  const { sins, fetchSins, createSin, forgiveSin } = useSinsStore();
  const [showHearts, setShowHearts] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState(SEVERITIES[0]);
  const [hint, setHint] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSins();
  }, [fetchSins]);

  const activeSins = sins.filter((s) => !s.isForgiven);

  const handleAddSin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await createSin({
        title: title.trim(),
        severity,
        hint: hint.trim() || 'Обійняти та поцілувати 💖',
      });
      setTitle('');
      setHint('');
      setIsAdding(false);
    } catch {
      alert('Не вдалося додати провину');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgive = async (id: string) => {
    setLoadingId(id);
    try {
      await forgiveSin(id);
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 2500);
    } catch {
      alert('Не вдалося пробачити');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className={styles.card}>
      {showHearts && <FallingHearts count={25} />}

      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <FileText size={20} className={styles.icon} />
          <h3 className={styles.title}>Гріхомір 📜</h3>
        </div>

        <div className={styles.headerControls}>
          {activeSins.length > 0 && (
            <span className={styles.badge}>{activeSins.length} провини</span>
          )}

          <button
            type="button"
            className={styles.addToggleBtn}
            onClick={() => setIsAdding(!isAdding)}
          >
            <Plus size={14} />
            <span>{isAdding ? 'Закрити' : 'Зафіксувати гріх'}</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleAddSin} className={styles.formBox}>
          <span className={styles.formTitle}>Зафіксувати нову провину Олега 💥</span>

          <div className={styles.inputRow}>
            <input
              type="text"
              className={styles.input}
              placeholder="Що зробив/не зробив Олег? (наприклад: Забув какао)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <select
              className={styles.select}
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              {SEVERITIES.map((sev) => (
                <option key={sev} value={sev}>
                  {sev}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            className={styles.input}
            placeholder="💡 Чим загладити провину? (наприклад: Купити шоколадку 🍫)"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
          />

          <button
            type="submit"
            className={styles.submitAddBtn}
            disabled={isSubmitting}
          >
            <Check size={14} />
            <span>{isSubmitting ? 'Збереження...' : 'Зафіксувати'}</span>
          </button>
        </form>
      )}

      {activeSins.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyEmoji}>😇✨</span>
          <p className={styles.emptyText}>Олег ангел! Жодних провинок немає</p>
          <span className={styles.emptySubtext}>Все пробачено та кохання панує ♥</span>
        </div>
      ) : (
        <div className={styles.sinsList}>
          {activeSins.map((sin) => (
            <div key={sin.id} className={styles.sinItem}>
              <div className={styles.sinInfo}>
                <span className={styles.sinTitle}>{sin.title}</span>
                <span className={styles.sinSeverity}>{sin.severity}</span>
                {sin.hint && (
                  <span className={styles.hintBadge}>
                    <Sparkles size={12} /> Чим загладити: {sin.hint}
                  </span>
                )}
              </div>

              <button
                type="button"
                className={styles.forgiveBtn}
                disabled={loadingId === sin.id}
                onClick={() => handleForgive(sin.id)}
              >
                <Heart size={14} fill="currentColor" />
                <span>{loadingId === sin.id ? 'Пробачаю...' : 'Простити ♥'}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
