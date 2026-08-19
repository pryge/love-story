import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AdminLoginDto, PinLoginDto } from './dto/auth.dto';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async loginAdmin(dto: AdminLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    const accessToken = await this.generateToken(
      user.id,
      user.email,
      user.role,
    );

    return {
      message: 'Welcome back, Admin',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
    };
  }

  async loginPin(dto: PinLoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { role: Role.KITTY },
    });

    if (!user) {
      throw new UnauthorizedException('Kitty account not found');
    }

    const isPinValid = await bcrypt.compare(dto.pin, user.password);
    if (!isPinValid) {
      throw new UnauthorizedException('Wrong secret PIN code! Try again ❤️');
    }

    const accessToken = await this.generateToken(
      user.id,
      user.email,
      user.role,
    );

    return {
      message: `Welcome back, ${user.name}!`,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
    };
  }

  async generateToken(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    return this.jwtService.signAsync(payload);
  }
}
