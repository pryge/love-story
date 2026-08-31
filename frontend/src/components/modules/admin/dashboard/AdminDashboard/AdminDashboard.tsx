'use client';

import React from 'react';
import { AdminLayout } from '../../layout';
import { AdminDatesWidget } from '../../widgets/AdminDatesWidget';
import { AdminQuotesWidget } from '../../widgets/AdminQuotesWidget';
import { AdminOverviewWidget } from '../../widgets/AdminOverviewWidget';
import styles from './AdminDashboard.module.css';

export const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      {(activeTab) => {
        switch (activeTab) {
          case 'dashboard':
            return <AdminOverviewWidget />;
          case 'dates':
            return <AdminDatesWidget />;
          case 'quotes':
            return <AdminQuotesWidget />;
          case 'wishlist':
            return (
              <div className={styles.cardPlaceholder}>
                <h2 className={styles.title}>🎁 Керування Wishlist</h2>
                <p>Тут можна буде додавати нові бажання для Каті та помічати сюрпризи.</p>
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
