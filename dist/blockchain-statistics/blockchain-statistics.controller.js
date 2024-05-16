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
exports.BlockchainStatisticsController = void 0;
const common_1 = require("@nestjs/common");
const blockchain_statistics_service_1 = require("./blockchain-statistics.service");
let BlockchainStatisticsController = class BlockchainStatisticsController {
    constructor(blockchainStatisticsService) {
        this.blockchainStatisticsService = blockchainStatisticsService;
    }
    getCompaniesSalariesStats(fromDate) {
        return this.blockchainStatisticsService.getSalariesStats(new Date(fromDate.year, fromDate.month, fromDate.day));
    }
    getSecretInfosStats(fromDate) {
        return this.blockchainStatisticsService.getSecretInfosStats(new Date(fromDate.year, fromDate.month, fromDate.day));
    }
};
exports.BlockchainStatisticsController = BlockchainStatisticsController;
__decorate([
    (0, common_1.Get)('companies-salaries'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockchainStatisticsController.prototype, "getCompaniesSalariesStats", null);
__decorate([
    (0, common_1.Get)('secret-infos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockchainStatisticsController.prototype, "getSecretInfosStats", null);
exports.BlockchainStatisticsController = BlockchainStatisticsController = __decorate([
    (0, common_1.Controller)('blockchain-statistics'),
    __metadata("design:paramtypes", [blockchain_statistics_service_1.BlockchainStatisticsService])
], BlockchainStatisticsController);
//# sourceMappingURL=blockchain-statistics.controller.js.map