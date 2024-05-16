import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../roles/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create (createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, process.env.BCRYPT_ROUND);
    const userDto = {
      ...createUserDto,
      password: hashedPassword,
      roles: [Role.User]
    }
    const newUser = this.usersRepository.create(userDto);

    try {
      await this.usersRepository.save(newUser)
      return "Success"
    } catch {
      return "Failed"
    }
  }

  async findAll (): Promise<User[]> {
    return this.usersRepository.find({ select: {
      created_at: true,
      email: true,
      id: true,
      roles: true,
      username: true
    }});
  }

  async findOne (usernameOrEmail: string): Promise<User> {
    let user: User | undefined;
    user = await this.usersRepository.findOne(
      { 
        where: { username: usernameOrEmail },
        select: {
          created_at: true,
          email: true,
          id: true,
          roles: true,
          username: true
        }
      }
    );

    if (!user) {
      user = await this.usersRepository.findOne(
        {
          where: { username: usernameOrEmail },
          select: {
            created_at: true,
            email: true,
            id: true,
            roles: true,
            username: true
          }
        }
      );
    }

    return user
  }

  async findOneWithPassword (usernameOrEmail: string): Promise<User> {
    let user: User | undefined;
    user = await this.usersRepository.findOne(
      {
        where: { username: usernameOrEmail },
      }
    );

    if (!user) {
      user = await this.usersRepository.findOne(
        {
          where: { username: usernameOrEmail },
        }
      );
    }

    return user
  }

  async remove (id: number) {
    return await this.usersRepository.delete({ id })
  }
}
