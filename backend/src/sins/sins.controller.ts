import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SinsService } from './sins.service';
import { CreateSinDto } from './dto/sins.dto';

@Controller('sins')
export class SinsController {
  constructor(private readonly sinsService: SinsService) {}

  @Get()
  async findAll() {
    return this.sinsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateSinDto) {
    return this.sinsService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateSinDto) {
    return this.sinsService.update(id, dto);
  }

  @Put(':id/forgive')
  async forgive(@Param('id') id: string) {
    return this.sinsService.forgive(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sinsService.remove(id);
  }
}
