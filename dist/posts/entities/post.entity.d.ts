import { User } from "../../users/entities/user.entity";
export declare class Post {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    user: User;
}
