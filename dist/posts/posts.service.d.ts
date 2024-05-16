import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { BlockchainStatisticsService } from '../blockchain-statistics/blockchain-statistics.service';
import { DateOfPostType } from '../utils/types/dates';
import { CompaniesSalariesService } from '../companies-salaries/companies-salaries.service';
export declare class PostsService {
    private readonly postsRepository;
    private readonly blockchainStatisticsService;
    private readonly companiesSalariesService;
    constructor(postsRepository: Repository<Post>, blockchainStatisticsService: BlockchainStatisticsService, companiesSalariesService: CompaniesSalariesService);
    generatePost(postDto: any, dataFrom: DateOfPostType, type: 'secret_info' | 'salary'): Promise<Post>;
    createPostAfterMonth(): Promise<void>;
    createPostReportOnEndOfTheYear(): Promise<void>;
    create(createPostDto: CreatePostDto): Promise<Post>;
    findAll(): Promise<{
        slug: string;
        id: number;
        title: string;
        description: string;
        created_at: Date;
        user: import("../users/entities/user.entity").User;
    }[]>;
    findOne(id: number): Promise<Post>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<Post>;
    remove(id: number): Promise<Post>;
    removeAll(): Promise<void>;
}
