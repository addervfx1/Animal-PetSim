import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UpdateItemDto } from './dto/update-item-dto';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item-dto';
import { ItemType } from './enum/itemType.enum';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemService.findAll();
  }
  
  @Get('by-user/:id')
  async findOneByUser(@Param('id') id: number): Promise<Item> {
  return await this.itemService.findOneByUser(id);
}

  @Get('by-type/:type')
  async findAllByType(@Param('type') type: ItemType): Promise<Item[]> {
   return await this.itemService.findAllByType(type);
  }
  
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Item> {
    return await this.itemService.findOne(id);
  }
  
  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemService.create(createItemDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
    return await this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.itemService.remove(id);
  }
}
