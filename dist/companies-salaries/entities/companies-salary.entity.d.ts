import { Company } from "../../companies/entities/company.entity";
export declare class CompaniesSalary {
    id: number;
    first: number;
    last: number;
    speed_of_growth: number;
    role: string;
    experience: number;
    opinion: string;
    employment_type: string;
    operating_mode: string;
    salary_currency: string;
    experience_in_company: string;
    created_at: Date;
    company: Company;
}
