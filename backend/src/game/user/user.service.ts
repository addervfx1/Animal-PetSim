import { ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryService } from './user.repository.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import UserBuilder from './builder/user.builder';
import { UserTokenGateway } from './gateways/userToken/userToken.gateway';
import { LoginDto } from './dto/login-dto';
import SecurityHelper from './helpers/SecurityHelper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly userTokenGateway: UserTokenGateway,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepositoryService.findAll();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepositoryService.findOne(id);
  }

  async create(user: CreateUserDto): Promise<{accessToken: string, refreshToken: string}> {
    const existsUser = await this.userRepositoryService.findByEmail(user.email);

    if(existsUser){
        console.log(`User with email ${user.email} already registered`);
        throw new ConflictException();
    }

    const userObj = await this.userRepositoryService.create(
        UserBuilder.buildUser(
          user.name, 
          user.email, 
          user.password
        )
    );

    const [accessToken, refreshToken] = await this.userTokenGateway.generateTokens(userObj);
    
    return {accessToken, refreshToken};
  }
  
  async login(loginDto: LoginDto): Promise<{accessToken: string, refreshToken: string}> {
    const user = await this.userRepositoryService.findByEmail(loginDto.email);

    if(!user)
        throw new UnauthorizedException(HttpStatus.FORBIDDEN);

    if(!SecurityHelper.IsHashVerified(user.password, loginDto.password))
        throw new UnauthorizedException(HttpStatus.FORBIDDEN);

    const [accessToken, refreshToken] = await this.userTokenGateway.generateTokens(user);
    
    return {accessToken, refreshToken};
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    return await this.userRepositoryService.update(id, user);
  }

  async remove(id: number): Promise<void> {
    return await this.userRepositoryService.remove(id);
  }
}
