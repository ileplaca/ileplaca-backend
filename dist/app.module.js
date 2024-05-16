"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const blockchain_statistics_module_1 = require("./blockchain-statistics/blockchain-statistics.module");
const posts_module_1 = require("./posts/posts.module");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./posts/entities/post.entity");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/entities/user.entity");
const config_1 = require("@nestjs/config");
const companies_salaries_module_1 = require("./companies-salaries/companies-salaries.module");
const companies_salary_entity_1 = require("./companies-salaries/entities/companies-salary.entity");
const companies_module_1 = require("./companies/companies.module");
const company_entity_1 = require("./companies/entities/company.entity");
const dotenv = require("dotenv");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            blockchain_statistics_module_1.BlockchainStatisticsModule,
            posts_module_1.PostsModule,
            typeorm_1.TypeOrmModule.forRoot({
                url: process.env.DATABASE_URL,
                type: 'postgres',
                entities: [post_entity_1.Post, user_entity_1.User, companies_salary_entity_1.CompaniesSalary, company_entity_1.Company],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            companies_salaries_module_1.CompaniesSalariesModule,
            companies_module_1.CompaniesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map