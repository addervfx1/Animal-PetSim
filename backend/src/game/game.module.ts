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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Animal, Activity, Challenge]), 
  ],
  controllers: [
    UserController,
    AnimalController,
    ActivityController,
    ChallengeController,
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
  ],
  exports: [
    UserService,
    AnimalService,
    ActivityService,
    ChallengeService,
  ],
})
export class GameModule {}
