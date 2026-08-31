'use client';

import React, { useState, useEffect } from 'react';

import { FileText, Trash2, Sparkles, Check, Clock } from '@/components/UI';
import styles from './AdminSinsWidget.module.css';
import { useSinsStore } from '@/store/useSinsStore';

type FilterType = 'all' | 'pending' | 'forgiven';

export const AdminSinsWidget: React.FC = () => {
  const { sins, fetchSins, deleteSin } = useSinsStore();
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    fetchSins();
  }, [fetchSins]);

  const handleDelete = async (id: string) => {
    if (!confirm('Видалити цю провину із записів?')) return;
    try {
      await deleteSin(id);
    } catch {
      alert('Помилка видалення');
    }
  };

  const pendingSins = sins.filter((s) => !s.isForgiven);
  const forgivenSins = sins.filter((s) => s.isForgiven);

  const sortedSins = [...sins].sort((a, b) => {
    if (a.isForgiven !== b.isForgiven) {
      return a.isForgiven ? 1 : -1;
    }
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  const filteredSins = sortedSins.filter((s) => {
    if (filter === 'pending') return !s.isForgiven;
    if (filter === 'forgiven') return s.isForgiven;
    return true;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <FileText size={20} className={styles.headerIcon} />
          <span>Гріхомір Каті 📜</span>
        </div>

        <div className={styles.filterGroup}>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('all')}
          >
            Всі ({sins.length})
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === 'pending' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('pending')}
          >
            Активні ({pendingSins.length})
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === 'forgiven' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('forgiven')}
          >
            Пробачені ({forgivenSins.length})
          </button>
        </div>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.statCard}>
          <span className={styles.statVal}>{pendingSins.length}</span>
          <span className={styles.statLabel}>Активних ⏳</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statVal}>{forgivenSins.length}</span>
          <span className={styles.statLabel}>Пробачено ♥</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statVal}>{sins.length}</span>
          <span className={styles.statLabel}>Всього записів</span>
        </div>
      </div>

      {filteredSins.length === 0 ? (
        <div className={styles.emptyState}>
          <p>
            {filter === 'pending'
              ? 'Жодної активної провини! Ти ангел 😇✨'
              : filter === 'forgiven'
              ? 'Пробачених провинок поки немає.'
              : 'Катя ще не зафіксувала жодної провини.'}
          </p>
        </div>
      ) : (
        <div className={styles.sinsList}>
          {filteredSins.map((item) => (
            <div
              key={item.id}
              className={`${styles.sinRow} ${item.isForgiven ? styles.sinRowForgiven : ''}`}
            >
              <div className={styles.sinLeft}>
                <div className={styles.tagRow}>
                  <span className={styles.severityBadge}>{item.severity}</span>
                  {item.isForgiven ? (
                    <span className={styles.forgivenBadge}>
                      <Check size={13} /> Пробачено ♥
                    </span>
                  ) : (
                    <span className={styles.pendingBadge}>
                      <Clock size={13} /> Чекає виправлення ⏳
                    </span>
                  )}
                </div>

                <span className={styles.sinTitle}>{item.title}</span>

                {item.hint && (
                  <div className={styles.hintRow}>
                    <Sparkles size={13} />
                    <span>💡 Як загладити: {item.hint}</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => handleDelete(item.id)}
                title="Видалити"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
