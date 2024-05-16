import { Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateCompaniesSalaryDto {
  @Min(0)
  @Max(2147483647)
  first: number;

  @Min(0)
  @Max(2147483647)
  last: number;

  @Min(0)
  @Max(2147483647)
  speed_of_growth: number;

  @MinLength(4)
  @MaxLength(80)
  role: string;
  
  @MinLength(1)
  @MaxLength(20)
  experience: string;
  
  @MinLength(4)
  @MaxLength(500)
  opinion: string;
  
  @MinLength(4)
  @MaxLength(50)
  employment_type: string;

  @MinLength(4)
  @MaxLength(50)
  operating_mode: string;

  @MinLength(1)
  @MaxLength(20)
  salary_currency: string;

  @MinLength(1)
  @MaxLength(20)
  experience_in_company: string;

  company: number
}
