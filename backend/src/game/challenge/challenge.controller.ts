import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Challenge } from './entities/challenge.entity';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge-dto';
import { UpdateChallengeDto } from './dto/update-challenge-dto';


@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get()
  async findAll(): Promise<Challenge[]> {
    return this.challengeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Challenge> {
    return this.challengeService.findOne(id);
  }

  @Post()
  async create(@Body() createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    return this.challengeService.create(createChallengeDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateChallengeDto: UpdateChallengeDto): Promise<Challenge> {
    return this.challengeService.update(id, updateChallengeDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.challengeService.remove(id);
  }
}
