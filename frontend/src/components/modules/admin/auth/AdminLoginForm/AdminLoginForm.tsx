'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/auth.service';
import { Button, Input } from '@/components/UI';
import styles from './AdminLoginForm.module.css';

export const AdminLoginForm: React.FC = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState('admin@lovestory.app');
  const [password, setPassword] = useState('OlehAndKatiaForewer');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await authService.loginAdmin({ email, password });
      setAuth(data.user, data.accessToken);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>👑 Вхід для Адміна (Олег)</h3>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@lovestory.app"
        />
        <Input
          type="password"
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <Button type="submit" variant="primary" fullWidth>
          Увійти як Admin
        </Button>
      </form>
    </div>
  );
};
