import { PartialType } from '@nestjs/mapped-types';
import { CreateCompaniesSalaryDto } from './create-companies-salary.dto';

export class UpdateCompaniesSalaryDto extends PartialType(CreateCompaniesSalaryDto) {}
