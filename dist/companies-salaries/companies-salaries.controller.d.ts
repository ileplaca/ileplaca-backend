import { CompaniesSalariesService } from './companies-salaries.service';
import { CreateCompaniesSalaryDto } from './dto/create-companies-salary.dto';
import { UpdateCompaniesSalaryDto } from './dto/update-companies-salary.dto';
import { BodyDate } from '../utils/types/dates';
export declare class CompaniesSalariesController {
    private readonly companiesSalariesService;
    constructor(companiesSalariesService: CompaniesSalariesService);
    create(createCompaniesSalaryDto: CreateCompaniesSalaryDto): Promise<import("./entities/companies-salary.entity").CompaniesSalary>;
    findAll(): Promise<import("./entities/companies-salary.entity").CompaniesSalary[]>;
    findOne(id: string): Promise<import("./entities/companies-salary.entity").CompaniesSalary>;
    getStats(fromDate: BodyDate): Promise<import("../blockchain-statistics/blockchain-statistics.types").SalariesStats>;
    update(id: string, updateCompaniesSalaryDto: UpdateCompaniesSalaryDto): Promise<import("./entities/companies-salary.entity").CompaniesSalary>;
    remove(id: string): Promise<import("./entities/companies-salary.entity").CompaniesSalary>;
}
