import { CompaniesSalaries } from '../smart-contract/companies-salaries.types';
import { PassingSecretInfo } from '../smart-contract/passing-secret-info.types';
export declare function getSmartContracts(): {
    passingSecretInfoContract: PassingSecretInfo;
    companiesSalariesContract: CompaniesSalaries;
};
export declare const passingSecretInfoContract: PassingSecretInfo, companiesSalariesContract: CompaniesSalaries;
