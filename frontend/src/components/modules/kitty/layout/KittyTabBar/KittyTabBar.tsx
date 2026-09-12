'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, MessageCircle, Heart, Sparkles } from '@/components/UI';
import styles from './KittyTabBar.module.css';

interface TabItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  exact?: boolean;
}

const TAB_ITEMS: TabItem[] = [
  { label: 'Разом', href: '/kitty', icon: Home, exact: true },
  { label: 'Дати', href: '/kitty/dates', icon: Calendar },
  { label: 'Фрази', href: '/kitty/phrases', icon: MessageCircle },
  { label: 'Вішліст', href: '/kitty/wishlist', icon: Heart },
  { label: 'Забава', href: '/kitty/fun', icon: Sparkles },
];

export const KittyTabBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.tabBar} aria-label="Навігація">
      {TAB_ITEMS.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className={styles.iconWrap}>
              <Icon size={22} className={styles.icon} />
              {isActive && <span className={styles.activeIndicator} />}
            </span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
