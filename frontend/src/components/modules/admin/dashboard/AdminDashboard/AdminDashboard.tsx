'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/UI';
import styles from './AdminDashboard.module.css';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>👑 Панель Адміністратора</h1>
      <p className={styles.text}>Вітаємо, <strong>{user?.name || 'Admin'}</strong>!</p>
      <p className={styles.text}>Твоя роль: <span className={styles.roleBadge}>{user?.role}</span></p>
      <p className={styles.text}>
        Тут буде повний контроль над сайтом, налаштуваннями, керуванням вибаченнями та сюрпризами.
      </p>
      <Button variant="secondary" onClick={handleLogout}>
        Вийти з акаунта
      </Button>
    </div>
  );
};
