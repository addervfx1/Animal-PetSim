import { Injectable } from '@nestjs/common';
import { ChallengeRepositoryService } from './challenge.repository.service';
import { Challenge } from './entities/challenge.entity';
import { CreateChallengeDto } from './dto/create-challenge-dto';
import { UpdateChallengeDto } from './dto/update-challenge-dto';

@Injectable()
export class ChallengeService {
  constructor(private readonly challengeRepositoryService: ChallengeRepositoryService) {}

  async findAll(): Promise<Challenge[]> {
    return this.challengeRepositoryService.findAll();
  }

  async findOne(id: number): Promise<Challenge> {
    return this.challengeRepositoryService.findOne(id);
  }

  async create(challenge: CreateChallengeDto): Promise<Challenge> {
    return this.challengeRepositoryService.create(challenge);
  }

  async update(id: number, challenge: UpdateChallengeDto): Promise<Challenge> {
    return this.challengeRepositoryService.update(id, challenge);
  }

  async remove(id: number): Promise<void> {
    return this.challengeRepositoryService.remove(id);
  }
}
