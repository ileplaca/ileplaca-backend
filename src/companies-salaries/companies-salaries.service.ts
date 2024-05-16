import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompaniesSalaryDto } from './dto/create-companies-salary.dto';
import { UpdateCompaniesSalaryDto } from './dto/update-companies-salary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesSalary } from './entities/companies-salary.entity';
import { Repository } from 'typeorm';
import { insertObjectIntoStats } from '../blockchain-statistics/blockchain-statistics.helpers';
import { SalariesStats } from '../blockchain-statistics/blockchain-statistics.types';


@Injectable()
export class CompaniesSalariesService {
  constructor(
    @InjectRepository(CompaniesSalary)
    private readonly companiesSalariesRepository: Repository<CompaniesSalary>
  ) {}

  async create(createCompaniesSalaryDto: CreateCompaniesSalaryDto) {
    const newCompaniesSalary = this.companiesSalariesRepository.create(createCompaniesSalaryDto as unknown as CompaniesSalary);
    return await this.companiesSalariesRepository.save(newCompaniesSalary);
  }

  async findAll() {
    return await this.companiesSalariesRepository.find();
  }

  async findOne(id: number) {
    return await this.companiesSalariesRepository.findOneBy({ id });
  }

  async update(id: number, updateCompaniesSalaryDto: UpdateCompaniesSalaryDto) {
    const existingEntity = await this.companiesSalariesRepository.findOneBy({ id });

    if (!existingEntity) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    const updatedEntity = this.companiesSalariesRepository.merge(existingEntity, updateCompaniesSalaryDto as unknown as CompaniesSalary);
    return await this.companiesSalariesRepository.save(updatedEntity);
  }

  async remove(id: number) {
    const existingEntity = await this.companiesSalariesRepository.findOneBy({ id });

    if (!existingEntity) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return await this.companiesSalariesRepository.remove(existingEntity)
  }

  /**
   *
   * @param fromDate example: new Date(2022, 11, 11)
   * @returns Promise<SalariesStats>
   */
  async getStats (fromDate: Date) {
    const salaries = (await this.findAll())
    .filter(salary => {
      if (Number(salary.created_at) >= Number(fromDate)) {
        return true
      }
    });

    const stats: SalariesStats = {
      amount: salaries.length,
      first: 0,
      last: 0,
      speed_of_growth: 0,
      role: [],
      experience: 0,
      employment_type: [],
      operating_mode: [],
      salary_currency: []
    }

    salaries.forEach((salary) => {
      stats.first += Number(salary.first);
      stats.last += Number(salary.last);
      stats.speed_of_growth += Number(salary.speed_of_growth);
      stats.experience += Number(salary.experience);

      insertObjectIntoStats(stats.role, salary.role)
      insertObjectIntoStats(stats.employment_type, salary.employment_type)
      insertObjectIntoStats(stats.operating_mode, salary.operating_mode)
      insertObjectIntoStats(stats.salary_currency, salary.salary_currency)
    })

    stats.first = Math.ceil(stats.first / salaries.length);
    stats.last = Math.ceil(stats.last / salaries.length);
    stats.speed_of_growth = Math.ceil(stats.speed_of_growth / salaries.length);
    stats.experience = Math.ceil(stats.experience / salaries.length);

    return stats
  }
}
