import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInResponse } from './auth.types';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(usernameOrEmail: string, pass: string): Promise<SignInResponse> {
    const user = await this.usersService.findOneWithPassword(usernameOrEmail);
    const isPasswordsMatch = await bcrypt.compare(pass, user?.password)

    if (!isPasswordsMatch) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: result
    };
  }
}