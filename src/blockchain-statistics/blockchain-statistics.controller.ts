import { Body, Controller, Get } from '@nestjs/common';
import { BlockchainStatisticsService } from './blockchain-statistics.service';
import { SalariesStats, SecretInfosStats } from './blockchain-statistics.types';
import { BodyDate } from '../../src/utils/types/dates';


@Controller('blockchain-statistics')
export class BlockchainStatisticsController {
  constructor(private readonly blockchainStatisticsService: BlockchainStatisticsService) {}

  @Get('companies-salaries')
  getCompaniesSalariesStats (@Body() fromDate: BodyDate): Promise<SalariesStats> {
    return this.blockchainStatisticsService.getSalariesStats(new Date(fromDate.year, fromDate.month, fromDate.day));
  }

  @Get('secret-infos')
  getSecretInfosStats (@Body() fromDate: BodyDate): Promise<SecretInfosStats> {
    return this.blockchainStatisticsService.getSecretInfosStats(new Date(fromDate.year, fromDate.month, fromDate.day));
  }
}
