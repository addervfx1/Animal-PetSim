import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './activity/entities/activity.entity';
import { Animal } from './animal/entities/animal.entity';
import { Challenge } from './challenge/entities/challenge.entity';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserRepositoryService } from './user/user.repository.service';
import { AnimalService } from './animal/animal.service';
import { AnimalController } from './animal/animal.controller';
import { AnimalRepositoryService } from './animal/animal.repository.service';
import { ActivityService } from './activity/activity.service';
import { ActivityController } from './activity/activity.controller';
import { ActivityRepositoryService } from './activity/activity.repository.service';
import { ChallengeService } from './challenge/challenge.service';
import { ChallengeController } from './challenge/challenge.controller';
import { ChallengeRepositoryService } from './challenge/challenge.repository.service';
import { UserTokenGateway } from './user/gateways/userToken/userToken.gateway';
import { ItemService } from './item/item.service';
import { ItemRepositoryService } from './item/item.repository.service';
import { ItemController } from './item/item.controller';
import { Item } from './item/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Animal, Activity, Challenge, Item])
  ],
  controllers: [
    UserController,
    AnimalController,
    ActivityController,
    ChallengeController,
    ItemController
  ],
  providers: [
    UserService,
    UserRepositoryService,
    AnimalService,
    AnimalRepositoryService,
    ActivityService,
    ActivityRepositoryService,
    ChallengeService,
    ChallengeRepositoryService,
    UserTokenGateway,
    ItemService,
    ItemRepositoryService
  ],
  exports: [
    UserService,
    AnimalService,
    ActivityService,
    ChallengeService,
  ],
})
export class GameModule {}
