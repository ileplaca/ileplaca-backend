"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainStatisticsModule = void 0;
const common_1 = require("@nestjs/common");
const blockchain_statistics_service_1 = require("./blockchain-statistics.service");
const blockchain_statistics_controller_1 = require("./blockchain-statistics.controller");
let BlockchainStatisticsModule = class BlockchainStatisticsModule {
};
exports.BlockchainStatisticsModule = BlockchainStatisticsModule;
exports.BlockchainStatisticsModule = BlockchainStatisticsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [blockchain_statistics_controller_1.BlockchainStatisticsController],
        providers: [blockchain_statistics_service_1.BlockchainStatisticsService],
        exports: [blockchain_statistics_service_1.BlockchainStatisticsService]
    })
], BlockchainStatisticsModule);
//# sourceMappingURL=blockchain-statistics.module.js.map