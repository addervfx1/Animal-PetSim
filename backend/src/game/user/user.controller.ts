import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { LoginDto } from './dto/login-dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto): Promise<{accessToken: string, refreshToken: string}> {
    return await this.userService.create(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{accessToken: string, refreshToken: string}> {
    return await this.userService.login(loginDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.userService.remove(id);
  }
}
