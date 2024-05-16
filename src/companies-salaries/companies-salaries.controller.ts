import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompaniesSalariesService } from './companies-salaries.service';
import { CreateCompaniesSalaryDto } from './dto/create-companies-salary.dto';
import { UpdateCompaniesSalaryDto } from './dto/update-companies-salary.dto';
import { BodyDate } from '../utils/types/dates';

@Controller('companies-salaries')
export class CompaniesSalariesController {
  constructor(private readonly companiesSalariesService: CompaniesSalariesService) {}

  @Post()
  async create(@Body() createCompaniesSalaryDto: CreateCompaniesSalaryDto) {
    return await this.companiesSalariesService.create(createCompaniesSalaryDto);
  }

  @Get()
  async findAll() {
    return await this.companiesSalariesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.companiesSalariesService.findOne(+id);
  }

  @Post('stats')
  async getStats(@Body() fromDate: BodyDate) {
    return await this.companiesSalariesService.getStats(new Date(fromDate.year, fromDate.month, fromDate.day));
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCompaniesSalaryDto: UpdateCompaniesSalaryDto) {
    return await this.companiesSalariesService.update(+id, updateCompaniesSalaryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.companiesSalariesService.remove(+id);
  }
}
