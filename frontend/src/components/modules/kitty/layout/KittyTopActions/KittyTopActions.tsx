'use client';

import React from 'react';
import { Moon, Sun, LogOut } from '@/components/UI';
import { useKittyHeader } from '@/components/modules/kitty/layout/KittyHeader/useKittyHeader';
import styles from './KittyTopActions.module.css';

export const KittyTopActions: React.FC = () => {
  const { isNightMode, handleLogout, toggleTheme } = useKittyHeader();

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.btn}
        onClick={toggleTheme}
        title={isNightMode ? 'Денний режим' : 'Нічний режим'}
        aria-label={isNightMode ? 'Переключити на денний режим' : 'Переключити на нічний режим'}
      >
        {isNightMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <button
        type="button"
        className={styles.btn}
        onClick={handleLogout}
        title="Вийти"
        aria-label="Вийти"
      >
        <LogOut size={16} />
      </button>
    </div>
  );
};
