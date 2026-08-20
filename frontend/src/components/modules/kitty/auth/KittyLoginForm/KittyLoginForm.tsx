'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/auth.service';
import { Button, Input } from '@/components/UI';
import styles from './KittyLoginForm.module.css';

export const KittyLoginForm: React.FC = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [pin, setPin] = useState('1501');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await authService.loginPin({ pin });
      setAuth(data.user, data.accessToken);
      router.push('/kitty');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>🐱 Вхід для Kitty</h3>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="password"
          maxLength={4}
          label="4-значний PIN код"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="••••"
        />
        <Button type="submit" variant="pink" fullWidth>
          Увійти за PIN-кодом ❤️
        </Button>
      </form>
    </div>
  );
};
