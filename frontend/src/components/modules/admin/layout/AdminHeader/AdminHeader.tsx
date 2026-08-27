'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Moon, LogOut } from '@/components/UI';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeStore } from '@/store/useThemeStore';
import styles from './AdminHeader.module.css';

export const AdminHeader: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { isNightMode, initTheme, toggleTheme } = useThemeStore();

  useEffect(() => {
    initTheme('admin');
  }, [initTheme]);

  const handleLogout = () => {
    logout();
    router.push('/login/admin');
  };

  return (
    <header className={styles.header}>
      <div className={styles.greeting}>
        <span>Вітаємо, <strong>{user?.name || 'Admin'}</strong> 👋</span>
        <span className={styles.userRole}>{user?.role || 'ADMIN'}</span>
      </div>

      <div className={styles.controls}>
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
          title="Вийти з акаунта"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};
