'use client';

import React from 'react';
import { Sparkles, Moon, Sun, LogOut } from '@/components/UI';
import { useKittyHeader } from './useKittyHeader';
import styles from './KittyHeader.module.css';

export const KittyHeader: React.FC = () => {
  const { isNightMode, handleLogout, toggleTheme } = useKittyHeader();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brandSection}>
          <span className={styles.brandLogo}>
            <Sparkles size={18} className={styles.brandIcon} />
            Katya&apos;s Space
          </span>
        </div>

        <div className={styles.controlsSection}>
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


