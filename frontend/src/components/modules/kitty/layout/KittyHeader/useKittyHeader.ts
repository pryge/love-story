import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeStore } from '@/store/useThemeStore';
import { getRandomQuote } from './kittyHeader.constants';

export const useKittyHeader = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { isNightMode, bgVariant, initTheme, toggleTheme, toggleBgVariant } =
    useThemeStore();

  const [quote, setQuote] = useState(getRandomQuote);
  const [isChangingQuote, setIsChangingQuote] = useState(false);

  useEffect(() => {
    initTheme('kitty');
  }, [initTheme]);

  const refreshQuote = () => {
    setIsChangingQuote(true);
    setTimeout(() => {
      setQuote(getRandomQuote());
      setIsChangingQuote(false);
    }, 200);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return {
    quote,
    isNightMode,
    bgVariant,
    isChangingQuote,
    handleLogout,
    toggleTheme,
    toggleBgVariant,
    refreshQuote,
  };
};
