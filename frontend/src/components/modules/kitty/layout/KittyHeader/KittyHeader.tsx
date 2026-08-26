'use client';

import React from 'react';
import { Sparkles, Star, Moon, Sun, LogOut, RefreshCw } from '@/components/UI';
import { useKittyHeader } from './useKittyHeader';
import styles from './KittyHeader.module.css';

export const KittyHeader: React.FC<{
  bgVariant?: 'aurora' | 'sparkles';
  onToggleBgVariant?: () => void;
}> = ({ bgVariant: externalBg, onToggleBgVariant }) => {
  const {
    quote,
    isNightMode,
    bgVariant: internalBg,
    isChangingQuote,
    handleLogout,
    toggleTheme,
    toggleBgVariant: internalToggleBg,
    refreshQuote,
  } = useKittyHeader();

  const currentBg = externalBg ?? internalBg;
  const handleToggleBg = onToggleBgVariant ?? internalToggleBg;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.quoteSection}>
          {quote && (
            <button
              type="button"
              className={`${styles.quoteBadge} ${
                isChangingQuote ? styles.quoteBadgeChanging : ''
              }`}
              onClick={refreshQuote}
              title="Натисни, щоб оновити цитату ✨"
            >
              <Sparkles size={16} className={styles.quoteIcon} />
              <span className={styles.quoteText}>{quote}</span>
              <RefreshCw size={12} className={styles.refreshIcon} />
            </button>
          )}
        </div>

        <div className={styles.controlsSection}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={handleToggleBg}
            title={
              currentBg === 'aurora'
                ? 'Змінити фон на Іскорки'
                : 'Змінити фон на Aurora Градієнт'
            }
          >
            {currentBg === 'aurora' ? <Star size={18} /> : <Sparkles size={18} />}
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleTheme}
            title={isNightMode ? 'Денний режим' : 'Нічний режим'}
          >
            {isNightMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={handleLogout}
            title="Вийти"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
