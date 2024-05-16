import { Salary } from "../../smart-contract/companies-salaries.types";
export declare class Company {
    id: number;
    name: string;
    location: string;
    icon: string;
    NIP: string;
    sector: string;
    created_at: Date;
    salaries: Salary[];
}
