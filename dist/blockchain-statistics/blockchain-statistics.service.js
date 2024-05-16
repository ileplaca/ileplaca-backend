"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainStatisticsService = void 0;
const common_1 = require("@nestjs/common");
const smart_contract_1 = require("../smart-contract");
const blockchain_statistics_helpers_1 = require("./blockchain-statistics.helpers");
let BlockchainStatisticsService = class BlockchainStatisticsService {
    async getSalariesStats(fromDate) {
        const salaries = (await smart_contract_1.companiesSalariesContract.getSalaries())
            .filter(salary => {
            if (Number(salary[15]) * 1000 >= Number(fromDate)) {
                return true;
            }
        });
        const stats = {
            amount: salaries.length,
            first: 0,
            last: 0,
            speed_of_growth: 0,
            role: [],
            experience: 0,
            employment_type: [],
            operating_mode: [],
            salary_currency: [],
        };
        salaries.forEach((salary) => {
            const [salary_id, owner_address, first, last, speed_of_growth, company_id, company_name, role, experience, opinion, location, employment_type, operating_mode, salary_currency, experience_in_company, created_at] = salary;
            stats.first += Number(first);
            stats.last += Number(last);
            stats.speed_of_growth += Number(speed_of_growth);
            stats.experience += Number(experience);
            (0, blockchain_statistics_helpers_1.insertObjectIntoStats)(stats.role, role);
            (0, blockchain_statistics_helpers_1.insertObjectIntoStats)(stats.employment_type, employment_type);
            (0, blockchain_statistics_helpers_1.insertObjectIntoStats)(stats.operating_mode, operating_mode);
            (0, blockchain_statistics_helpers_1.insertObjectIntoStats)(stats.salary_currency, salary_currency);
        });
        stats.first = Math.ceil(stats.first / salaries.length);
        stats.last = Math.ceil(stats.last / salaries.length);
        stats.speed_of_growth = Math.ceil(stats.speed_of_growth / salaries.length);
        stats.experience = Math.ceil(stats.experience / salaries.length);
        return stats;
    }
    async getSecretInfosStats(fromDate) {
        const secretInfos = (await smart_contract_1.passingSecretInfoContract.getSecretInfos()).filter(secretInfo => {
            if (Number(secretInfo[8]) * 1000 >= Number(fromDate)) {
                return true;
            }
        });
        const stats = {
            amount: 0,
            price: 0
        };
        stats.amount = secretInfos.length;
        secretInfos.forEach(secretInfo => {
            stats.price += Number(secretInfo[2]);
        });
        stats.price = Math.ceil(stats.price / secretInfos.length);
        return stats;
    }
    async getSalariesStatsUser(fromDate) {
    }
    async getSecretInfosStatsUser(fromDate) {
    }
};
exports.BlockchainStatisticsService = BlockchainStatisticsService;
exports.BlockchainStatisticsService = BlockchainStatisticsService = __decorate([
    (0, common_1.Injectable)()
], BlockchainStatisticsService);
//# sourceMappingURL=blockchain-statistics.service.js.map