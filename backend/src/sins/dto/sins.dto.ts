import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateSinSchema = z.object({
  title: z.string().min(1, 'Опис провини обовʼязковий'),
  severity: z.string().optional(),
  hint: z.string().optional(),
  isForgiven: z.boolean().optional(),
});

export class CreateSinDto extends createZodDto(CreateSinSchema) {}
