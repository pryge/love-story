import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DatesService, CreateImportantDateDto } from './dates.service';

@Controller('dates')
export class DatesController {
  constructor(private readonly datesService: DatesService) {}

  @Get()
  async findAll() {
    return this.datesService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateImportantDateDto) {
    return this.datesService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateImportantDateDto) {
    return this.datesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.datesService.remove(id);
  }
}
