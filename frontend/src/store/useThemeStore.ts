import { create } from 'zustand';
import type { BgVariant } from '@/components/UI/BackgroundEffects/BackgroundEffects';

export type ThemeScope = 'kitty' | 'admin';

interface ThemeState {
  isNightMode: boolean;
  bgVariant: BgVariant;
  scope: ThemeScope;
  initTheme: (scope?: ThemeScope) => void;
  toggleTheme: () => void;
  toggleBgVariant: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isNightMode: false,
  bgVariant: 'aurora',
  scope: 'kitty',

  initTheme: (scope: ThemeScope = 'kitty') => {
    if (typeof window === 'undefined') return;

    const themeKey = `${scope}_theme`;
    const savedTheme = localStorage.getItem(themeKey);
    const isDark = savedTheme === 'dark';

    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    const savedBg = localStorage.getItem(`${scope}_bg_variant`) as BgVariant;
    const bg =
      savedBg === 'sparkles' || savedBg === 'aurora' ? savedBg : 'aurora';

    set({ isNightMode: isDark, bgVariant: bg, scope });
  },

  toggleTheme: () => {
    const scope = get().scope;
    const next = !get().isNightMode;
    const themeKey = `${scope}_theme`;

    if (typeof window !== 'undefined') {
      if (next) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem(themeKey, 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(themeKey, 'light');
      }
    }
    set({ isNightMode: next });
  },

  toggleBgVariant: () => {
    const scope = get().scope;
    const next = get().bgVariant === 'aurora' ? 'sparkles' : 'aurora';
    const bgKey = `${scope}_bg_variant`;

    if (typeof window !== 'undefined') {
      localStorage.setItem(bgKey, next);
    }
    set({ bgVariant: next });
  },
}));
