import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity-dto';
import { UpdateActivityDto } from './dto/update-activity-dto';


@Injectable()
export class ActivityRepositoryService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async findAll(): Promise<Activity[]> {
    return await this.activityRepository.find();
  }

  async findOne(id: number): Promise<Activity> {
    return await this.activityRepository.findOne({ where: { id } });
  }

  async create(activity: CreateActivityDto): Promise<Activity> {
    return await this.activityRepository.save(activity);
  }

  async update(id: number, activity: UpdateActivityDto): Promise<Activity> {
    await await this.activityRepository.update(id, activity);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await await this.activityRepository.delete(id);
  }
}
