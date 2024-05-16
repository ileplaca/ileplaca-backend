import { UsersService } from '../users/users.service';
import { SignInResponse } from './auth.types';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(usernameOrEmail: string, pass: string): Promise<SignInResponse>;
}
