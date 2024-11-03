import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from './user.repository.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  async findAll(): Promise<User[]> {
    return this.userRepositoryService.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepositoryService.findOne(id);
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.userRepositoryService.create(user);
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    return this.userRepositoryService.update(id, user);
  }

  async remove(id: number): Promise<void> {
    return this.userRepositoryService.remove(id);
  }
}
