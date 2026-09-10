'use client';

import React from 'react';
import { Calendar, Crown, FileText, Gift, LayoutDashboard, Settings, X } from '@/components/UI';
import styles from './AdminSidebar.module.css';

export type AdminTab = 'dashboard' | 'dates' | 'quotes' | 'wishlist' | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onTabChange,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Головна', icon: <LayoutDashboard size={18} /> },
    { id: 'dates', label: 'Наші дати', icon: <Calendar size={18} /> },
    { id: 'quotes', label: 'Цитати', icon: <FileText size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Gift size={18} /> },
    { id: 'settings', label: 'Налаштування', icon: <Settings size={18} /> },
  ];

  const handleSelectTab = (tab: AdminTab) => {
    onTabChange(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside
      className={`${styles.sidebar} ${
        isOpenMobile ? styles.mobileOpen : ''
      }`}
    >
      <div className={styles.brand}>
        <div className={styles.brandLeft}>
          <Crown size={20} className={styles.brandIcon} />
          <span>Admin Panel</span>
        </div>

        {onCloseMobile && (
          <button
            type="button"
            className={styles.closeBtnMobile}
            onClick={onCloseMobile}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className={styles.nav}>
        <span className={styles.navSectionTitle}>Керування модулями</span>
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.navItem} ${
              activeTab === item.id ? styles.active : ''
            }`}
            onClick={() => handleSelectTab(item.id)}
          >
            <span className={styles.itemIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.footer}>
        Love Story Control v2.0
      </div>
    </aside>
  );
};
