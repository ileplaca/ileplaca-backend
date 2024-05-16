import { CompaniesSalary } from "../../companies-salaries/entities/companies-salary.entity";
import { Salary } from "../../smart-contract/companies-salaries.types";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  name: string;

  @Column({ type: "text"})
  location: string

  @Column({ type: "text"})
  icon: string;

  @Column({ type: "text", unique: true })
  NIP: string

  @Column({ type: "text"})
  sector: string

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => CompaniesSalary, (salary) => salary.company)
  salaries: Salary[];
}
