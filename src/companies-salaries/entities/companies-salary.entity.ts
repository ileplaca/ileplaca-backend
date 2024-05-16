import { Company } from "../../companies/entities/company.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CompaniesSalary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int"})
  first: number;

  @Column({ type: "int"})
  last: number;
  
  @Column({ type: "int"})
  speed_of_growth: number;

  @Column({ type: "text"})
  role: string;
  
  @Column({ type: "int"})
  experience: number;
  
  @Column({ type: "text"})
  opinion: string;
  
  @Column({ type: "text"})
  employment_type: string;

  @Column({ type: "text"})
  operating_mode: string;

  @Column({ type: "text"})
  salary_currency: string;

  @Column({ type: "text"})
  experience_in_company: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Company, (company) => company.salaries)
  @JoinColumn()
  company: Company
}
