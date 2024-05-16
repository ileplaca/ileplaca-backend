import { Module } from '@nestjs/common';
import { BlockchainStatisticsService } from './blockchain-statistics.service';
import { BlockchainStatisticsController } from './blockchain-statistics.controller';

@Module({
  imports: [],
  controllers: [BlockchainStatisticsController],
  providers: [BlockchainStatisticsService],
  exports: [BlockchainStatisticsService]
})
export class BlockchainStatisticsModule {}
