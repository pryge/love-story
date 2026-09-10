'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Moon, LogOut, Terminal, Menu, X } from '@/components/UI';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeStore } from '@/store/useThemeStore';
import { useConsoleLoaderStore } from '@/store/useConsoleLoaderStore';
import styles from './AdminHeader.module.css';

interface AdminHeaderProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleMobileMenu,
  isMobileMenuOpen,
}) => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { isNightMode, initTheme, toggleTheme } = useThemeStore();
  const { isConsoleLoaderEnabled, initStore, toggleConsoleLoader } = useConsoleLoaderStore();

  useEffect(() => {
    initTheme('admin');
    initStore();
  }, [initTheme, initStore]);

  const handleLogout = () => {
    logout();
    router.push('/login/admin');
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        {onToggleMobileMenu && (
          <button
            type="button"
            className={styles.menuToggleBtn}
            onClick={onToggleMobileMenu}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
        <div className={styles.greeting}>
          <span>Вітаємо, <strong>{user?.name || 'Admin'}</strong> 👋</span>
          <span className={styles.userRole}>{user?.role || 'ADMIN'}</span>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={toggleConsoleLoader}
          title={isConsoleLoaderEnabled ? 'Вимкнути консольний лоадер' : 'Увімкнути консольний лоадер'}
          style={{ opacity: isConsoleLoaderEnabled ? 1 : 0.4 }}
        >
          <Terminal size={18} />
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
          title="Вийти з акаунта"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};
