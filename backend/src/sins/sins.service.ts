import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSinDto } from './dto/sins.dto';

@Injectable()
export class SinsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.sin.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateSinDto) {
    return await this.prisma.sin.create({
      data: {
        title: dto.title,
        severity: dto.severity || 'Маленький грішок 🐣',
        hint: dto.hint || 'Обійняти та поцілувати 💖',
        isForgiven: dto.isForgiven ?? false,
      },
    });
  }

  async update(id: string, dto: CreateSinDto) {
    const existing = await this.prisma.sin.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Гріх не знайдено');
    }

    return await this.prisma.sin.update({
      where: { id },
      data: {
        title: dto.title ?? existing.title,
        severity: dto.severity ?? existing.severity,
        hint: dto.hint ?? existing.hint,
        isForgiven: dto.isForgiven ?? existing.isForgiven,
      },
    });
  }

  async forgive(id: string) {
    const existing = await this.prisma.sin.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Гріх не знайдено');
    return await this.prisma.sin.update({
      where: { id },
      data: { isForgiven: true },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.sin.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Гріх не знайдено');
    }

    return await this.prisma.sin.delete({
      where: { id },
    });
  }
}
