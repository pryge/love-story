import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeStore } from '@/store/useThemeStore';

export const useKittyHeader = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { isNightMode, bgVariant, initTheme, toggleTheme, toggleBgVariant } =
    useThemeStore();

  useEffect(() => {
    initTheme('kitty');
  }, [initTheme]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return {
    isNightMode,
    bgVariant,
    handleLogout,
    toggleTheme,
    toggleBgVariant,
  };
};

