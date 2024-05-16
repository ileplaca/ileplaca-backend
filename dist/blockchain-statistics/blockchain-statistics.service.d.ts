import { SalariesStats, SecretInfosStats } from './blockchain-statistics.types';
export declare class BlockchainStatisticsService {
    getSalariesStats(fromDate: Date): Promise<SalariesStats>;
    getSecretInfosStats(fromDate: Date): Promise<SecretInfosStats>;
    getSalariesStatsUser(fromDate: Date): Promise<any>;
    getSecretInfosStatsUser(fromDate: Date): Promise<any>;
}
