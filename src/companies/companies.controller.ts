import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FindByNameAndLocationDto } from './dto/find-by-name-and-location.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get('nip/:nip')
  findByNIP(@Param('nip') nip: string) {
    return this.companiesService.findByNIP(nip);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.companiesService.findOneByName(name);
  }

  @Post('search')
  findByNameAndLocation(@Body() findByNameAndLocationDto: FindByNameAndLocationDto) {
    return this.companiesService.findByNameAndLocation(findByNameAndLocationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
