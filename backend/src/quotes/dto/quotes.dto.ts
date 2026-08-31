import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateQuoteSchema = z.object({
  text: z.string().min(1, 'Текст цитати обовʼязковий'),
});

export class CreateQuoteDto extends createZodDto(CreateQuoteSchema) {}
