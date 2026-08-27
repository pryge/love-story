import { create } from 'zustand';


export type ThemeScope = 'kitty' | 'admin';

interface ThemeState {
  isNightMode: boolean;
  scope: ThemeScope;
  initTheme: (scope?: ThemeScope) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isNightMode: false,
  scope: 'kitty',

  initTheme: (scope: ThemeScope = 'kitty') => {
    if (typeof window === 'undefined') return;

    const themeKey = `${scope}_theme`;
    const savedTheme = localStorage.getItem(themeKey);
    const isDark = savedTheme
      ? savedTheme === 'dark'
      : scope === 'admin';

    const themeValue = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeValue);

    set({ isNightMode: isDark, scope });
  },

  toggleTheme: () => {
    const scope = get().scope;
    const next = !get().isNightMode;
    const themeKey = `${scope}_theme`;
    const themeValue = next ? 'dark' : 'light';

    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeValue);
      localStorage.setItem(themeKey, themeValue);
    }
    set({ isNightMode: next });
  },
}));



