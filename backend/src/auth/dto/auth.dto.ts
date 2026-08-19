import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Admin
export const AdminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

//Kitty
export const PinLoginSchema = z.object({
  pin: z
    .string()
    .length(4, 'PIN code must be exactly 4 digits')
    .regex(/^\d+$/, 'PIN code must contain only numbers'),
});

export class AdminLoginDto extends createZodDto(AdminLoginSchema) {}
export class PinLoginDto extends createZodDto(PinLoginSchema) {}
