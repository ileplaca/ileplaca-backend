import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): Promise<{
        slug: string;
        id: number;
        title: string;
        description: string;
        created_at: Date;
        user: import("../users/entities/user.entity").User;
    }[]>;
    findOne(id: string): Promise<import("./entities/post.entity").Post>;
    create(createPostDto: CreatePostDto): Promise<import("./entities/post.entity").Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("./entities/post.entity").Post>;
    remove(id: string): Promise<import("./entities/post.entity").Post>;
    removeAll(): Promise<void>;
}
