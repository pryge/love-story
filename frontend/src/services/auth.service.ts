import { AdminLoginDto, PinLoginDto, AuthResponse, User } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const authService = {
  async loginAdmin(data: AdminLoginDto): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/login-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Admin login failed');
    return result;
  },

  async loginPin(data: PinLoginDto): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/login-pin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'PIN login failed');
    return result;
  },

  async getMe(token: string): Promise<User> {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to fetch user profile');
    return result;
  },
};
