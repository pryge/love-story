import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDto, PinLoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

interface RequestWithUser {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/login-admin
  @Post('login-admin')
  async loginAdmin(@Body() dto: AdminLoginDto) {
    return this.authService.loginAdmin(dto);
  }

  // POST /auth/login-pin
  @Post('login-pin')
  async loginPin(@Body() dto: PinLoginDto) {
    return this.authService.loginPin(dto);
  }

  // GET /auth/me
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }
}
