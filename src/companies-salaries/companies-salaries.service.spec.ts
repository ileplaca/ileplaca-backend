import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesSalariesService } from './companies-salaries.service';

describe('CompaniesSalariesService', () => {
  let service: CompaniesSalariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesSalariesService],
    }).compile();

    service = module.get<CompaniesSalariesService>(CompaniesSalariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
