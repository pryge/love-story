import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from '@/components/UI';
import { FallingHearts } from '@/components/UI/FallingHearts/FallingHearts';
import styles from './NotFound.module.css';

export const NotFound = () => {
  return (
    <main className={styles.container}>
      <FallingHearts count={22} />

      <div className={styles.card}>
        <Sparkles className={styles.heartIcon} />

        <div className={styles.number404}>404</div>
        <div className={styles.divider} />

        <h1 className={styles.title}>Упс, тут порожньо</h1>
        <p className={styles.description}>
          Цієї сторіночки немає, але головне, що ми не губимо один одного. ❤️
        </p>

        <Link href="/" className={styles.button}>
          <ArrowLeft size={18} />
          <span>Повернутися назад</span>
        </Link>

        <p className={styles.subnote}>
          ✨ Де б ти не блукала, я завжди поряд ✨
        </p>
      </div>
    </main>
  );
};
