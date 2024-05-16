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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_entity_1 = require("./entities/company.entity");
const typeorm_2 = require("typeorm");
let CompaniesService = class CompaniesService {
    constructor(companiesRepository) {
        this.companiesRepository = companiesRepository;
    }
    async findByNameAndLocation(findByNameAndLocationDto) {
        if (!findByNameAndLocationDto.name) {
            findByNameAndLocationDto.name = '';
        }
        if (!findByNameAndLocationDto.location) {
            findByNameAndLocationDto.location = '';
        }
        return await this.companiesRepository
            .createQueryBuilder('company')
            .where('LOWER(company.name) LIKE LOWER(:name)', { name: `%${findByNameAndLocationDto.name}%` })
            .andWhere('LOWER(company.location) LIKE LOWER(:location)', { location: `%${findByNameAndLocationDto.location}%` })
            .getMany();
    }
    async findOneByName(name) {
        return await this.companiesRepository.findOne({ where: { name }, relations: { salaries: true } });
    }
    async findByNIP(NIP) {
        return await this.companiesRepository.find({ where: { NIP } });
    }
    async create(createCompaniesSalaryDto) {
        const newPost = this.companiesRepository.create(createCompaniesSalaryDto);
        return await this.companiesRepository.save(newPost);
    }
    async findAll() {
        return await this.companiesRepository.find();
    }
    async findOne(id) {
        return await this.companiesRepository.findOneBy({ id });
    }
    async remove(id) {
        const existingEntity = await this.companiesRepository.findOneBy({ id });
        if (!existingEntity) {
            throw new common_1.NotFoundException(`Post with id ${id} not found`);
        }
        return await this.companiesRepository.remove(existingEntity);
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map