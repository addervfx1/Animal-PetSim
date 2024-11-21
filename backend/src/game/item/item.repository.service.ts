import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item-dto';
import { UpdateItemDto } from './dto/update-item-dto';

@Injectable()
export class ItemRepositoryService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    return await this.itemRepository.findOne({ where: { id } });
  }
  
  async findOneByUser(userId: number): Promise<Item | null> {
    const Item = await this.itemRepository.findOne({
        where: { user: { id: userId } },
        relations: ['user'],
    });

    return Item || null;
}

  async create(Item: CreateItemDto): Promise<Item> {
    return await this.itemRepository.save(Item);
  }

  async update(id: number, Item: UpdateItemDto): Promise<Item> {
    await this.itemRepository.update(id, Item);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
