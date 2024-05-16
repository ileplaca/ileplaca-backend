import { BlockchainStatisticsService } from './blockchain-statistics.service';
import { SalariesStats, SecretInfosStats } from './blockchain-statistics.types';
import { BodyDate } from '../../src/utils/types/dates';
export declare class BlockchainStatisticsController {
    private readonly blockchainStatisticsService;
    constructor(blockchainStatisticsService: BlockchainStatisticsService);
    getCompaniesSalariesStats(fromDate: BodyDate): Promise<SalariesStats>;
    getSecretInfosStats(fromDate: BodyDate): Promise<SecretInfosStats>;
}
