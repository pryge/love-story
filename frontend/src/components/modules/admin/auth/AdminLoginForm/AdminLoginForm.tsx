'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/auth.service';
import { Crown, Mail, Lock, ArrowRight, Loader } from '@/components/UI';
import styles from './AdminLoginForm.module.css';

export const AdminLoginForm: React.FC = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState('admin@lovestory.app');
  const [password, setPassword] = useState('OlehAndKatiaForewer');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const data = await authService.loginAdmin({ email, password });
      setAuth(data.user, data.accessToken);
      router.push('/admin');
    } catch {
      setError('Невірний Email або Пароль доступу');
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      {isLoading && <Loader variant='simple' />}

      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <Crown size={28} />
        </div>

        <h1 className={styles.title}>Авторизація</h1>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email розробника</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                type="email"
                required
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Пароль</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type="password"
                required
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className={styles.submitButton}>
            <span>{isLoading ? 'Авторизація...' : 'Увійти у Панель'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <p className={styles.footerNote}>
          <span>⚡ Секретна зона доступу</span>
        </p>
      </div>
    </main>
  );
};
