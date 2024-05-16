import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesSalariesController } from './companies-salaries.controller';
import { CompaniesSalariesService } from './companies-salaries.service';

describe('CompaniesSalariesController', () => {
  let controller: CompaniesSalariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesSalariesController],
      providers: [CompaniesSalariesService],
    }).compile();

    controller = module.get<CompaniesSalariesController>(CompaniesSalariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
