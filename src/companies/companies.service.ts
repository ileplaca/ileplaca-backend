import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { FindByNameAndLocationDto } from './dto/find-by-name-and-location.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>
  ) {}

  async findByNameAndLocation (findByNameAndLocationDto: FindByNameAndLocationDto) {
    if (!findByNameAndLocationDto.name) {
      findByNameAndLocationDto.name = '';
    }

    if (!findByNameAndLocationDto.location) {
      findByNameAndLocationDto.location = '';
    }
    return await this.companiesRepository
      .createQueryBuilder('company')
      .where('LOWER(company.name) LIKE LOWER(:name)',
        { name: `%${findByNameAndLocationDto.name}%` })
      .andWhere('LOWER(company.location) LIKE LOWER(:location)',
        { location: `%${findByNameAndLocationDto.location}%`})
      .getMany()
  }

  async findOneByName (name: string) {
    return await this.companiesRepository.findOne({ where: { name }, relations: { salaries: true } })
  }

  async findByNIP (NIP: string) {
    return await this.companiesRepository.find({ where: { NIP }})
  }

  async create(createCompaniesSalaryDto: CreateCompanyDto) {
    const newPost = this.companiesRepository.create(createCompaniesSalaryDto);
    return await this.companiesRepository.save(newPost);
  }

  async findAll() {
    return await this.companiesRepository.find();
  }

  async findOne(id: number) {
    return await this.companiesRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const existingEntity = await this.companiesRepository.findOneBy({ id });

    if (!existingEntity) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return await this.companiesRepository.remove(existingEntity)
  }
}
