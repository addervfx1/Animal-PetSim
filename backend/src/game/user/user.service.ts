import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from './user.repository.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  async findAll(): Promise<User[]> {
    return await this.userRepositoryService.findAll();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepositoryService.findOne(id);
  }

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepositoryService.create(user);
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    return await this.userRepositoryService.update(id, user);
  }

  async remove(id: number): Promise<void> {
    return await this.userRepositoryService.remove(id);
  }
}
