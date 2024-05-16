import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FindByNameAndLocationDto } from './dto/find-by-name-and-location.dto';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(createCompanyDto: CreateCompanyDto): Promise<import("./entities/company.entity").Company>;
    findAll(): Promise<import("./entities/company.entity").Company[]>;
    findByNIP(nip: string): Promise<import("./entities/company.entity").Company[]>;
    findByName(name: string): Promise<import("./entities/company.entity").Company>;
    findByNameAndLocation(findByNameAndLocationDto: FindByNameAndLocationDto): Promise<import("./entities/company.entity").Company[]>;
    findOne(id: string): Promise<import("./entities/company.entity").Company>;
    remove(id: string): Promise<import("./entities/company.entity").Company>;
}
