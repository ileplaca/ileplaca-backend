import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<"Success" | "Failed">;
    findAll(): Promise<User[]>;
    findOne(usernameOrEmail: string): Promise<User>;
    findOneWithPassword(usernameOrEmail: string): Promise<User>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
