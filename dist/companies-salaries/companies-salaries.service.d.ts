import { CreateCompaniesSalaryDto } from './dto/create-companies-salary.dto';
import { UpdateCompaniesSalaryDto } from './dto/update-companies-salary.dto';
import { CompaniesSalary } from './entities/companies-salary.entity';
import { Repository } from 'typeorm';
import { SalariesStats } from '../blockchain-statistics/blockchain-statistics.types';
export declare class CompaniesSalariesService {
    private readonly companiesSalariesRepository;
    constructor(companiesSalariesRepository: Repository<CompaniesSalary>);
    create(createCompaniesSalaryDto: CreateCompaniesSalaryDto): Promise<CompaniesSalary>;
    findAll(): Promise<CompaniesSalary[]>;
    findOne(id: number): Promise<CompaniesSalary>;
    update(id: number, updateCompaniesSalaryDto: UpdateCompaniesSalaryDto): Promise<CompaniesSalary>;
    remove(id: number): Promise<CompaniesSalary>;
    getStats(fromDate: Date): Promise<SalariesStats>;
}
