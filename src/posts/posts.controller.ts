import { Controller, Get, Patch, Param, Delete, Body, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Post()
  create (@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto)
  }

  @Roles(Role.AdminBlog, Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto)
  }

  // @Roles(Role.AdminBlog, Role.Admin)
  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.postsService.remove(+id)
  }

  @Delete()
  removeAll () {
    return this.postsService.removeAll()
  }
}