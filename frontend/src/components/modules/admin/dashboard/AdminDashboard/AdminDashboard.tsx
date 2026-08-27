'use client';

import React from 'react';
import { AdminLayout } from '../../layout';
import { AdminDatesWidget } from '../../widgets/AdminDatesWidget';
import styles from './AdminDashboard.module.css';

export const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      {(activeTab) => {
        switch (activeTab) {
          case 'dates':
            return <AdminDatesWidget />;
          case 'quotes':
            return (
              <div className={styles.cardPlaceholder}>
                <h2 className={styles.title}>💬 Керування Цитатами</h2>
                <p>Тут зʼявиться можливість додавати та редагувати цитати кохання.</p>
              </div>
            );
          case 'wishlist':
            return (
              <div className={styles.cardPlaceholder}>
                <h2 className={styles.title}>🎁 Керування Wishlist</h2>
                <p>Тут можна буде додавати нові бажання для Каті та помічати сюрпризи.</p>
              </div>
            );
          case 'sins':
            return (
              <div className={styles.cardPlaceholder}>
                <h2 className={styles.title}>📜 Керування Гріхоміром</h2>
                <p>Тут можна буде відстежувати та керувати вибаченнями.</p>
              </div>
            );
          case 'settings':
          default:
            return (
              <div className={styles.cardPlaceholder}>
                <h2 className={styles.title}>⚙️ Налаштування кабінету</h2>
                <p>Параметри безпеки, сповіщень та інтеграцій.</p>
              </div>
            );
        }
      }}
    </AdminLayout>
  );
};
