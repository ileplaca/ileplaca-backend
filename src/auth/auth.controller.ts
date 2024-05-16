import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIntDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn (@Body() signInDto: SignIntDto) {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }
}
