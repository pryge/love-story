import { create } from 'zustand';
import { User } from '@/types/auth';
import { authService } from '@/services/auth.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,
  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
      document.cookie = `accessToken=${token}; path=/; max-age=86400; SameSite=Lax`;
    }
    set({ user, token, isLoading: false });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      document.cookie = 'accessToken=; path=/; max-age=0; SameSite=Lax';
    }
    set({ user: null, token: null, isLoading: false });
  },
  initAuth: async () => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('accessToken');
    if (!token) {
      set({ isLoading: false });
      return;
    }
    try {
      const user = await authService.getMe(token);
      set({ user, token, isLoading: false });
    } catch {
      get().logout();
    }
  },
}));
