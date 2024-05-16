import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainStatisticsService } from './blockchain-statistics.service';

describe('BlockchainStatisticsService', () => {
  let service: BlockchainStatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockchainStatisticsService],
    }).compile();

    service = module.get<BlockchainStatisticsService>(BlockchainStatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
