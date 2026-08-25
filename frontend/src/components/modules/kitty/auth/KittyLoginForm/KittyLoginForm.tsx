'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/auth.service';
import { FallingHearts } from '@/components/UI/FallingHearts/FallingHearts';
import styles from './KittyLoginForm.module.css';

export const KittyLoginForm: React.FC = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + num);
      setError('');
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError('');
  };

  useEffect(() => {
    if (pin.length === 4) {
      const submitPin = async () => {
        try {
          const data = await authService.loginPin({ pin });
          setAuth(data.user, data.accessToken);
          router.push('/kitty');
        } catch {
          setError('Хмм, згадай дату нашої першої зустрічі... 😉');
          setIsShaking(true);
          setTimeout(() => {
            setIsShaking(false);
            setPin('');
          }, 500);
        }
      };
      submitPin();
    }
  }, [pin, router, setAuth]);

  return (
    <main className={styles.container}>
      <FallingHearts count={20} />

      <div className={`${styles.card} ${isShaking ? styles.shake : ''}`}>
        <h1 className={styles.title}>Наші спогади під замком 🔒</h1>
        <p className={styles.subtitle}>Введи наш 4-значний секретний PIN-код</p>

        <div className={styles.dotsContainer}>
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`${styles.dot} ${
                pin.length > index ? styles.dotFilled : ''
              }`}
            />
          ))}
        </div>

        <div className={styles.hintCard}>
          {error || 'Підказка: 4 цифри кохання'}
        </div>

        <div className={styles.keypad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              className={styles.keyButton}
              onClick={() => handleKeyPress(num)}
            >
              {num}
            </button>
          ))}
          <div className={styles.emptyKey} />
          <button
            type="button"
            className={styles.keyButton}
            onClick={() => handleKeyPress('0')}
          >
            0
          </button>
          <button
            type="button"
            className={styles.keyButton}
            onClick={handleDelete}
          >
            ⌫
          </button>
        </div>

        <p className={styles.footerNote}>Тільки для нас двох ♥</p>
      </div>
    </main>
  );
};
