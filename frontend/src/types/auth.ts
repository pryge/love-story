export type Role = 'ADMIN' | 'KITTY';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface AdminLoginDto {
  email: string;
  password: string;
}

export interface PinLoginDto {
  pin: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
}
