import { Module } from '@nestjs/common';
import { SinsController } from './sins.controller';
import { SinsService } from './sins.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SinsController],
  providers: [SinsService],
  exports: [SinsService],
})
export class SinsModule {}
