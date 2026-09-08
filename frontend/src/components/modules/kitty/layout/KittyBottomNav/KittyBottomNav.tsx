'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, MessageSquare } from '@/components/UI';
import styles from './KittyBottomNav.module.css';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Головна', href: '/kitty', icon: Home },
  { label: 'Дати', href: '/kitty/dates', icon: Calendar },
  { label: 'Фрази', href: '/kitty/phrases', icon: MessageSquare },
];

export const KittyBottomNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.bottomNav} aria-label="Мобільна навігація">
      <div className={styles.container}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <div className={styles.iconWrapper}>
                <Icon size={20} className={styles.icon} />
              </div>
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
