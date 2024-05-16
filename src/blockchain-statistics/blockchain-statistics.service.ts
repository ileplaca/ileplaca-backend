import { Injectable } from '@nestjs/common';
import { companiesSalariesContract, passingSecretInfoContract } from '../smart-contract';
import { SalariesStats, SecretInfosStats } from './blockchain-statistics.types';
import { insertObjectIntoStats } from './blockchain-statistics.helpers';


@Injectable()
export class BlockchainStatisticsService {
  /**
   *
   * @param fromDate example: new Date(2022, 11, 11)
   * @returns Promise<SalariesStats>
   */
  async getSalariesStats (fromDate: Date): Promise<SalariesStats> {
    const salaries = (await companiesSalariesContract.getSalaries())
    .filter(salary => {
      if (Number(salary[15])*1000 >= Number(fromDate)) {
        return true
      }
    });

    const stats: SalariesStats = {
      amount: salaries.length,
      first: 0,
      last: 0,
      speed_of_growth: 0,
      role: [],
      experience: 0,
      employment_type: [],
      operating_mode: [],
      salary_currency: [],
    }

    salaries.forEach((salary) => {
      const [
        salary_id,
        owner_address,
        first,
        last,
        speed_of_growth,
        company_id,
        company_name,
        role,
        experience,
        opinion,
        location,
        employment_type,
        operating_mode,
        salary_currency,
        experience_in_company,
        created_at
      ] = salary;

      stats.first += Number(first);
      stats.last += Number(last);
      stats.speed_of_growth += Number(speed_of_growth);
      stats.experience += Number(experience);

      insertObjectIntoStats(stats.role, role)
      insertObjectIntoStats(stats.employment_type, employment_type)
      insertObjectIntoStats(stats.operating_mode, operating_mode)
      insertObjectIntoStats(stats.salary_currency, salary_currency)
    })

    stats.first = Math.ceil(stats.first / salaries.length);
    stats.last = Math.ceil(stats.last / salaries.length);
    stats.speed_of_growth = Math.ceil(stats.speed_of_growth / salaries.length);
    stats.experience = Math.ceil(stats.experience / salaries.length);

    return stats
  }

  /**
   *
   * @param fromDate example: new Date(2022, 11, 11)
   * @returns Promise<SecretInfosStats>
   */
  async getSecretInfosStats (fromDate: Date): Promise<SecretInfosStats> {
    const secretInfos = (await passingSecretInfoContract.getSecretInfos()).filter(secretInfo => {
      if (Number(secretInfo[8])*1000 >= Number(fromDate)) {
        return true
      }
    });

    const stats: SecretInfosStats = {
      amount: 0,
      price: 0
    }

    stats.amount = secretInfos.length;

    secretInfos.forEach(secretInfo => {
      stats.price += Number(secretInfo[2]);
    })

    stats.price = Math.ceil(stats.price / secretInfos.length);

    return stats
  }

  async getSalariesStatsUser (fromDate: Date): Promise<any> {

  }

  async getSecretInfosStatsUser (fromDate: Date): Promise<any> {
    
  }
}
