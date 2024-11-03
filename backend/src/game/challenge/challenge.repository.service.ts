import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';
import { CreateChallengeDto } from './dto/create-challenge-dto';
import { UpdateChallengeDto } from './dto/update-challenge-dto';

@Injectable()
export class ChallengeRepositoryService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
  ) {}

  async findAll(): Promise<Challenge[]> {
    return this.challengeRepository.find();
  }

  async findOne(id: number): Promise<Challenge> {
    return this.challengeRepository.findOne({ where: { id } });
  }

  async create(challenge: CreateChallengeDto): Promise<Challenge> {
    return this.challengeRepository.save(challenge);
  }

  async update(id: number, challenge: UpdateChallengeDto): Promise<Challenge> {
    await this.challengeRepository.update(id, challenge);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.challengeRepository.delete(id);
  }
}
