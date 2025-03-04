import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create (@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  // TODO: remove all add guards
  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
