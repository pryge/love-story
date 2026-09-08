import { create } from 'zustand';

interface ConsoleLoaderStoreState {
  isConsoleLoaderEnabled: boolean;
  initStore: () => void;
  toggleConsoleLoader: () => void;
}

export const useConsoleLoaderStore = create<ConsoleLoaderStoreState>((set, get) => ({
  isConsoleLoaderEnabled: true,

  initStore: () => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('console_loader_enabled');
    const isEnabled = saved ? saved === 'true' : true;
    set({ isConsoleLoaderEnabled: isEnabled });
  },

  toggleConsoleLoader: () => {
    const nextState = !get().isConsoleLoaderEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('console_loader_enabled', String(nextState));
    }
    set({ isConsoleLoaderEnabled: nextState });
  },
}));
