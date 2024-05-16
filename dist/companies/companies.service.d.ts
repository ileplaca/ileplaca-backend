import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { FindByNameAndLocationDto } from './dto/find-by-name-and-location.dto';
export declare class CompaniesService {
    private readonly companiesRepository;
    constructor(companiesRepository: Repository<Company>);
    findByNameAndLocation(findByNameAndLocationDto: FindByNameAndLocationDto): Promise<Company[]>;
    findOneByName(name: string): Promise<Company>;
    findByNIP(NIP: string): Promise<Company[]>;
    create(createCompaniesSalaryDto: CreateCompanyDto): Promise<Company>;
    findAll(): Promise<Company[]>;
    findOne(id: number): Promise<Company>;
    remove(id: number): Promise<Company>;
}
