import { AuthService } from './auth.service';
import { SignIntDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignIntDto): Promise<import("./auth.types").SignInResponse>;
}
