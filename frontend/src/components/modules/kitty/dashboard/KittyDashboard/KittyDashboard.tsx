'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/UI/Button/Button';
import styles from './KatiaDashboard.module.css';

export const KatiaDashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>💖 Особистий кабінет Каті</h1>
      <p className={styles.text}>Привіт, <strong>{user?.name || 'Катя'}</strong>! ❤️</p>
      <p className={styles.text}>Твоя роль: <span className={styles.roleBadge}>{user?.role}</span></p>
      <p className={styles.text}>
        Тут будуть твої купони, Wishlist, 100 причин кохання та лічильник часу разом!
      </p>
      <Button variant="pink" onClick={handleLogout}>
        Вийти з акаунта
      </Button>
    </div>
  );
};
