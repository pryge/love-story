import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export class CreateQuoteDto {
  text: string;
}

@Injectable()
export class QuotesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateQuoteDto) {
    return await this.prisma.quote.create({
      data: {
        text: dto.text,
      },
    });
  }

  async update(id: string, dto: CreateQuoteDto) {
    const existing = await this.prisma.quote.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Цитату не знайдено');
    }

    return await this.prisma.quote.update({
      where: { id },
      data: { text: dto.text },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.quote.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Цитату не знайдено');
    }

    return await this.prisma.quote.delete({
      where: { id },
    });
  }
}
