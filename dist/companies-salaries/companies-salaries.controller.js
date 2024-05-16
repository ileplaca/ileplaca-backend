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
exports.CompaniesSalariesController = void 0;
const common_1 = require("@nestjs/common");
const companies_salaries_service_1 = require("./companies-salaries.service");
const create_companies_salary_dto_1 = require("./dto/create-companies-salary.dto");
const update_companies_salary_dto_1 = require("./dto/update-companies-salary.dto");
let CompaniesSalariesController = class CompaniesSalariesController {
    constructor(companiesSalariesService) {
        this.companiesSalariesService = companiesSalariesService;
    }
    async create(createCompaniesSalaryDto) {
        return await this.companiesSalariesService.create(createCompaniesSalaryDto);
    }
    async findAll() {
        return await this.companiesSalariesService.findAll();
    }
    async findOne(id) {
        return await this.companiesSalariesService.findOne(+id);
    }
    async getStats(fromDate) {
        return await this.companiesSalariesService.getStats(new Date(fromDate.year, fromDate.month, fromDate.day));
    }
    async update(id, updateCompaniesSalaryDto) {
        return await this.companiesSalariesService.update(+id, updateCompaniesSalaryDto);
    }
    async remove(id) {
        return await this.companiesSalariesService.remove(+id);
    }
};
exports.CompaniesSalariesController = CompaniesSalariesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_companies_salary_dto_1.CreateCompaniesSalaryDto]),
    __metadata("design:returntype", Promise)
], CompaniesSalariesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompaniesSalariesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompaniesSalariesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('stats'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompaniesSalariesController.prototype, "getStats", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_companies_salary_dto_1.UpdateCompaniesSalaryDto]),
    __metadata("design:returntype", Promise)
], CompaniesSalariesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompaniesSalariesController.prototype, "remove", null);
exports.CompaniesSalariesController = CompaniesSalariesController = __decorate([
    (0, common_1.Controller)('companies-salaries'),
    __metadata("design:paramtypes", [companies_salaries_service_1.CompaniesSalariesService])
], CompaniesSalariesController);
//# sourceMappingURL=companies-salaries.controller.js.map