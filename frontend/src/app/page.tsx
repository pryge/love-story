'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function RootPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role === 'ADMIN') {
      router.push('/admin');
    } else if (user.role === 'KITTY') {
      router.push('/kitty');
    }
  }, [user, router]);

  return (
    <p style={{ textAlign: 'center', padding: 40, fontFamily: 'sans-serif' }}>
      Завантаження...
    </p>
  );
}
