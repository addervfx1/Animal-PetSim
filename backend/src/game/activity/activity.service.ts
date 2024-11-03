import { Injectable } from '@nestjs/common';
import { ActivityRepositoryService } from './activity.repository.service';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity-dto';
import { UpdateActivityDto } from './dto/update-activity-dto';

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepositoryService: ActivityRepositoryService) {}

  async findAll(): Promise<Activity[]> {
    return this.activityRepositoryService.findAll();
  }

  async findOne(id: number): Promise<Activity> {
    return this.activityRepositoryService.findOne(id);
  }

  async create(activity: CreateActivityDto): Promise<Activity> {
    return this.activityRepositoryService.create(activity);
  }

  async update(id: number, activity: UpdateActivityDto): Promise<Activity> {
    return this.activityRepositoryService.update(id, activity);
  }

  async remove(id: number): Promise<void> {
    return this.activityRepositoryService.remove(id);
  }
}
