import { Post } from "../../posts/entities/post.entity";
import { Role } from "../../roles/role.enum";
export declare class User {
    id: number;
    username: string;
    email: string;
    password?: string;
    roles: Role[];
    created_at: Date;
    posts: Post[];
}
