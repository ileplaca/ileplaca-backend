export type Salary = [
  salary_id: bigint,
  owner_address: string,
  first: bigint,
  last: bigint,
  speed_of_growth: bigint,
  company_id: bigint,
  company_name: string,
  role: string,
  experience: string,
  opinion: string,
  location: string,
  employment_type: string,
  operating_mode: string,
  salary_currency: string,
  experience_in_company: string,
  created_at: bigint
];

export interface CompaniesSalaries {
  addSalary: (salary: Salary) => void;
  getSalaries: () => Promise<Salary[]>;
  addSalaryRate: (salary_id: number, rate: boolean) => Promise<void>;
  removeSalaryRate: (salary_id: number) => Promise<void>;
  changeSalaryRate: (salary_id: number) => Promise<void>;
}

