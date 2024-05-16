import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    create(createUserDto: CreateUserDto): Promise<"Success" | "Failed">;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
