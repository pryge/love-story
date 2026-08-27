'use client';

import React from 'react';
import { Calendar, Crown, FileText, Gift, Heart, Settings } from '@/components/UI';
import styles from './AdminSidebar.module.css';

export type AdminTab = 'dates' | 'quotes' | 'wishlist' | 'sins' | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const navItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dates', label: 'Наші дати', icon: <Calendar size={18} /> },
    { id: 'quotes', label: 'Цитати', icon: <FileText size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Gift size={18} /> },
    { id: 'sins', label: 'Гріхомір', icon: <Heart size={18} /> },
    { id: 'settings', label: 'Налаштування', icon: <Settings size={18} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Crown size={20} className={styles.brandIcon} />
        <span>Admin Panel</span>
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
            onClick={() => onTabChange(item.id)}
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
