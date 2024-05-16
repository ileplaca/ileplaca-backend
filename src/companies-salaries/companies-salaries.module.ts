import { Module } from '@nestjs/common';
import { CompaniesSalariesService } from './companies-salaries.service';
import { CompaniesSalariesController } from './companies-salaries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesSalary } from './entities/companies-salary.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompaniesSalary]),
  ],
  controllers: [CompaniesSalariesController],
  providers: [CompaniesSalariesService],
  exports: [CompaniesSalariesService]
})
export class CompaniesSalariesModule {}
