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
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const toggleMobile = () => setIsMobileOpen((prev) => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <div className={styles.wrapper}>
      {isMobileOpen && (
        <div className={styles.overlay} onClick={closeMobile} />
      )}

      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpenMobile={isMobileOpen}
        onCloseMobile={closeMobile}
      />

      <div className={styles.mainWrapper}>
        <AdminHeader
          onToggleMobileMenu={toggleMobile}
          isMobileMenuOpen={isMobileOpen}
        />
        <main className={styles.content}>
          {typeof children === 'function' ? children(activeTab) : children}
        </main>
      </div>
    </div>
  );
};
