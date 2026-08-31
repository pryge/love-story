import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/quotes.dto';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  async findAll() {
    return this.quotesService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateQuoteDto) {
    return this.quotesService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateQuoteDto) {
    return this.quotesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.quotesService.remove(id);
  }
}
