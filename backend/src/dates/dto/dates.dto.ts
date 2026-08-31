import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateImportantDateSchema = z.object({
  title: z.string().min(1, 'Назва події обовʼязкова'),
  monthDay: z.string().min(1, 'Дата обовʼязкова'),
  isFavorite: z.boolean().optional(),
  category: z.string().optional(),
});

export class CreateImportantDateDto extends createZodDto(
  CreateImportantDateSchema,
) {}
