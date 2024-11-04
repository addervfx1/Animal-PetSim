import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Activity } from './entities/activity.entity';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity-dto';
import { UpdateActivityDto } from './dto/update-activity-dto';



@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async findAll(): Promise<Activity[]> {
    return await this.activityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Activity> {
    return await this.activityService.findOne(id);
  }

  @Post()
  async create(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    return await this.activityService.create(createActivityDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateActivityDto: UpdateActivityDto): Promise<Activity> {
    return await this.activityService.update(id, updateActivityDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.activityService.remove(id);
  }
}
