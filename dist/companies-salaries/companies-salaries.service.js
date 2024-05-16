"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesSalariesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const companies_salary_entity_1 = require("./entities/companies-salary.entity");
const typeorm_2 = require("typeorm");
const blockchain_statistics_helpers_1 = require("../blockchain-statistics/blockchain-statistics.helpers");
let CompaniesSalariesService = class CompaniesSalariesService {
    constructor(companiesSalariesRepository) {
        this.companiesSalariesRepository = companiesSalariesRepository;
    }
    async create(createCompaniesSalaryDto) {
        const newCompaniesSalary = this.companiesSalariesRepository.create(createCompaniesSalaryDto);
        return await this.companiesSalariesRepository.save(newCompaniesSalary);
    }
    async findAll() {
        return await this.companiesSalariesRepository.find();
    }
    async findOne(id) {
        return await this.companiesSalariesRepository.findOneBy({ id });
    }
    async update(id, updateCompaniesSalaryDto) {
        const existingEntity = await this.companiesSalariesRepository.findOneBy({ id });
        if (!existingEntity) {
            throw new common_1.NotFoundException(`Post with id ${id} not found`);
        }
        const updatedEntity = this.companiesSalariesRepository.merge(existingEntity, updateCompaniesSalaryDto);
        return await this.companiesSalariesRepository.save(updatedEntity);
    }
    async remove(id) {
        const existingEntity = await this.companiesSalariesRepository.findOneBy({ id });
        if (!existingEntity) {
            throw new common_1.NotFoundException(`Post with id ${id} not found`);
        }
        return await this.companiesSalariesRepository.remove(existingEntity);
    }
    async getStats(fromDate) {
        const salaries = (await this.findAll())
            .filter(salary => {
            if (Number(salary.created_at) >= Number(fromDate)) {
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
            salary_currency: []
        };
        salaries.forEach((salary) => {
            stats.first += Number(salary.first);
            stats.last += Number(salary.last);
            stats.speed_of_growth += Number(salary.speed_of_growth);
            stats.experience += Number(salary.experience);
            (0, blockchain_statistics_helpers_1.insertObjectIntoStats)(stats.role, salary.role);
            (0, blockchain_statistics_helpers_1.insertObjectIntoStats)(stats.employment_type, salary.employment_type);
            (0, blockchain_statistics_helpers_1.insertObjectIntoStats)(stats.operating_mode, salary.operating_mode);
            (0, blockchain_statistics_helpers_1.insertObjectIntoStats)(stats.salary_currency, salary.salary_currency);
        });
        stats.first = Math.ceil(stats.first / salaries.length);
        stats.last = Math.ceil(stats.last / salaries.length);
        stats.speed_of_growth = Math.ceil(stats.speed_of_growth / salaries.length);
        stats.experience = Math.ceil(stats.experience / salaries.length);
        return stats;
    }
};
exports.CompaniesSalariesService = CompaniesSalariesService;
exports.CompaniesSalariesService = CompaniesSalariesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(companies_salary_entity_1.CompaniesSalary)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompaniesSalariesService);
//# sourceMappingURL=companies-salaries.service.js.map