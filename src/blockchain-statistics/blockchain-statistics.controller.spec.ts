import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainStatisticsController } from './blockchain-statistics.controller';
import { BlockchainStatisticsService } from './blockchain-statistics.service';

describe('BlockchainStatisticsController', () => {
  let controller: BlockchainStatisticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockchainStatisticsController],
      providers: [BlockchainStatisticsService],
    }).compile();

    controller = module.get<BlockchainStatisticsController>(BlockchainStatisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
