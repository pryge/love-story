import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateImportantDateDto } from './dto/dates.dto';

@Injectable()
export class DatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.importantDate.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(dto: CreateImportantDateDto) {
    return this.prisma.importantDate.create({
      data: {
        title: dto.title,
        monthDay: dto.monthDay,
        isFavorite: dto.isFavorite ?? false,
        category: dto.category || 'Памʼятна дата',
      },
    });
  }

  async update(id: string, dto: CreateImportantDateDto) {
    const existing = await this.prisma.importantDate.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Дату не знайдено');
    }

    return this.prisma.importantDate.update({
      where: { id },
      data: {
        title: dto.title,
        monthDay: dto.monthDay,
        isFavorite: dto.isFavorite ?? false,
        category: dto.category || 'Памʼятна дата',
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.importantDate.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Дату не знайдено');
    }

    return this.prisma.importantDate.delete({
      where: { id },
    });
  }
}
