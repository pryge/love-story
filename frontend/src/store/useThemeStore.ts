import { create } from 'zustand';

interface ThemeState {
  isNightMode: boolean;
  initTheme: (scope?: string) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isNightMode: false,

  initTheme: () => {
    if (typeof window === 'undefined') return;

    const savedTheme = localStorage.getItem('kitty_theme');
    let isDark: boolean;
    if (savedTheme) {
      isDark = savedTheme === 'dark';
    } else {
      const currentHour = new Date().getHours();
      isDark = currentHour >= 22 || currentHour < 7;
    }

    const themeValue = isDark ? 'dark' : 'light';
    if (document.documentElement.getAttribute('data-theme') !== themeValue) {
      document.documentElement.setAttribute('data-theme', themeValue);
    }

    set({ isNightMode: isDark });
  },

  toggleTheme: () => {
    const next = !get().isNightMode;
    const themeValue = next ? 'dark' : 'light';

    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeValue);
      localStorage.setItem('kitty_theme', themeValue);
    }
    set({ isNightMode: next });
  },
}));
