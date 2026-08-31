'use client';

import React, { useState } from 'react';
import { AdminHeader } from '../AdminHeader/AdminHeader';
import { AdminSidebar, AdminTab } from '../AdminSidebar/AdminSidebar';
import styles from './AdminLayout.module.css';

interface AdminLayoutProps {
  children?: (activeTab: AdminTab) => React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  return (
    <div className={styles.wrapper}>
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.mainWrapper}>
        <AdminHeader />
        <main className={styles.content}>
          {typeof children === 'function' ? children(activeTab) : children}
        </main>
      </div>
    </div>
  );
};
