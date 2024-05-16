"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesSalariesModule = void 0;
const common_1 = require("@nestjs/common");
const companies_salaries_service_1 = require("./companies-salaries.service");
const companies_salaries_controller_1 = require("./companies-salaries.controller");
const typeorm_1 = require("@nestjs/typeorm");
const companies_salary_entity_1 = require("./entities/companies-salary.entity");
let CompaniesSalariesModule = class CompaniesSalariesModule {
};
exports.CompaniesSalariesModule = CompaniesSalariesModule;
exports.CompaniesSalariesModule = CompaniesSalariesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([companies_salary_entity_1.CompaniesSalary]),
        ],
        controllers: [companies_salaries_controller_1.CompaniesSalariesController],
        providers: [companies_salaries_service_1.CompaniesSalariesService],
        exports: [companies_salaries_service_1.CompaniesSalariesService]
    })
], CompaniesSalariesModule);
//# sourceMappingURL=companies-salaries.module.js.map