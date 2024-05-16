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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./entities/post.entity");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const blockchain_statistics_service_1 = require("../blockchain-statistics/blockchain-statistics.service");
const axios_1 = require("axios");
const dates_1 = require("../utils/types/dates");
const slugify_1 = require("slugify");
const companies_salaries_service_1 = require("../companies-salaries/companies-salaries.service");
let PostsService = class PostsService {
    constructor(postsRepository, blockchainStatisticsService, companiesSalariesService) {
        this.postsRepository = postsRepository;
        this.blockchainStatisticsService = blockchainStatisticsService;
        this.companiesSalariesService = companiesSalariesService;
    }
    async generatePost(postDto, dataFrom, type) {
        const text = type === 'salary' ? `Generate a small article about that data, it's about recruitment offers, the data is from that ${dataFrom}, data in json: ${JSON.stringify(postDto)}`
            : `Generate a small article about that data, it's about secret informations, the data is from that ${dataFrom}, data in json: ${JSON.stringify(postDto)}`;
        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/text/generation",
            headers: {
                authorization: `Bearer ${process.env.EDNNAI_API_KEY}`,
            },
            data: {
                providers: "cohere",
                text,
                temperature: 0.2,
                max_tokens: 500,
                fallback_providers: "",
            },
        };
        try {
            const { data } = await axios_1.default.request(options);
            const dateNow = new Date();
            const date = `${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()}`;
            const post = {
                title: dataFrom === dates_1.DateOfPost.MONTH ? `Companies salaries statistics for the ${dates_1.DateOfPost.MONTH} of ${date}` : `Companies salaries statistics for the ${dates_1.DateOfPost.YEAR} of ${date}`,
                description: data.cohere.generated_text,
                user: 43
            };
            return this.create(post);
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadGatewayException();
        }
    }
    async createPostAfterMonth() {
        const dateNow = new Date();
        const year = dateNow.getFullYear();
        const month = dateNow.getMonth() === 1 ? 1 : dateNow.getMonth() - 1;
        const salariesStats = await this.companiesSalariesService.getStats(new Date(year, month, 1));
        const blockchainSalariesStats = await this.blockchainStatisticsService.getSalariesStats(new Date(year, month, 1));
        const blockchainSecretInfosStats = await this.blockchainStatisticsService.getSecretInfosStats(new Date(year, month, 1));
        await this.generatePost(salariesStats, dates_1.DateOfPost.MONTH, 'salary');
        await this.generatePost(blockchainSalariesStats, dates_1.DateOfPost.MONTH, 'salary');
        await this.generatePost(blockchainSecretInfosStats, dates_1.DateOfPost.MONTH, 'secret_info');
    }
    async createPostReportOnEndOfTheYear() {
        const dateNow = new Date();
        const year = dateNow.getFullYear() - 1;
        const month = dateNow.getMonth();
        const salariesStats = await this.companiesSalariesService.getStats(new Date(year, month, 1));
        const blockchainSalariesStats = await this.blockchainStatisticsService.getSalariesStats(new Date(year, month, 1));
        const blockchainSecretInfosStats = await this.blockchainStatisticsService.getSalariesStats(new Date(year, month, 1));
        await this.generatePost(salariesStats, dates_1.DateOfPost.YEAR, 'salary');
        await this.generatePost(blockchainSecretInfosStats, dates_1.DateOfPost.YEAR, 'salary');
        await this.generatePost(blockchainSalariesStats, dates_1.DateOfPost.YEAR, 'secret_info');
    }
    async create(createPostDto) {
        const newPost = this.postsRepository.create(createPostDto);
        return await this.postsRepository.save(newPost);
    }
    async findAll() {
        const posts = await this.postsRepository.find({
            relations: {
                user: true
            },
            select: {
                user: {
                    created_at: true,
                    email: true,
                    id: true,
                    roles: true,
                    username: true
                }
            }
        });
        const postsWithSlug = posts.map(post => ({
            ...post,
            slug: (0, slugify_1.default)(post.title)
        }));
        return postsWithSlug;
    }
    async findOne(id) {
        return await this.postsRepository.findOne({
            where: { id },
            relations: {
                user: true
            },
            select: {
                user: {
                    created_at: true,
                    email: true,
                    id: true,
                    roles: true,
                    username: true
                }
            }
        });
    }
    async update(id, updatePostDto) {
        const existingEntity = await this.postsRepository.findOneBy({ id });
        if (!existingEntity) {
            throw new common_1.NotFoundException(`Post with id ${id} not found`);
        }
        const updatedEntity = this.postsRepository.merge(existingEntity, updatePostDto);
        return await this.postsRepository.save(updatedEntity);
    }
    async remove(id) {
        const existingEntity = await this.postsRepository.findOneBy({ id });
        if (!existingEntity) {
            throw new common_1.NotFoundException(`Post with id ${id} not found`);
        }
        return await this.postsRepository.remove(existingEntity);
    }
    async removeAll() {
        const existingEntity = await this.postsRepository.find();
        existingEntity.forEach((post) => {
            this.postsRepository.remove(post);
        });
    }
};
exports.PostsService = PostsService;
__decorate([
    (0, schedule_1.Cron)('0 0 0 1 * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsService.prototype, "createPostAfterMonth", null);
__decorate([
    (0, schedule_1.Cron)('0 0 0 31 12 *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsService.prototype, "createPostReportOnEndOfTheYear", null);
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        blockchain_statistics_service_1.BlockchainStatisticsService,
        companies_salaries_service_1.CompaniesSalariesService])
], PostsService);
//# sourceMappingURL=posts.service.js.map