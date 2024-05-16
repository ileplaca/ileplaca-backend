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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompaniesSalaryDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCompaniesSalaryDto {
}
exports.CreateCompaniesSalaryDto = CreateCompaniesSalaryDto;
__decorate([
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2147483647),
    __metadata("design:type", Number)
], CreateCompaniesSalaryDto.prototype, "first", void 0);
__decorate([
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2147483647),
    __metadata("design:type", Number)
], CreateCompaniesSalaryDto.prototype, "last", void 0);
__decorate([
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2147483647),
    __metadata("design:type", Number)
], CreateCompaniesSalaryDto.prototype, "speed_of_growth", void 0);
__decorate([
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", String)
], CreateCompaniesSalaryDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateCompaniesSalaryDto.prototype, "experience", void 0);
__decorate([
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateCompaniesSalaryDto.prototype, "opinion", void 0);
__decorate([
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateCompaniesSalaryDto.prototype, "employment_type", void 0);
__decorate([
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateCompaniesSalaryDto.prototype, "operating_mode", void 0);
__decorate([
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateCompaniesSalaryDto.prototype, "salary_currency", void 0);
__decorate([
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateCompaniesSalaryDto.prototype, "experience_in_company", void 0);
//# sourceMappingURL=create-companies-salary.dto.js.map