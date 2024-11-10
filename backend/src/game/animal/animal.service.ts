import { Injectable } from '@nestjs/common';
import { AnimalRepositoryService } from './animal.repository.service';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal-dto';
import { UpdateAnimalDto } from './dto/update-animal-dto';

@Injectable()
export class AnimalService {
  constructor(private readonly animalRepositoryService: AnimalRepositoryService) {}

  async findAll(): Promise<Animal[]> {
    return await this.animalRepositoryService.findAll();
  }

  async findOne(id: number): Promise<Animal> {
    return await this.animalRepositoryService.findOne(id);
  }
  
  async findOneByUser(id: number): Promise<Animal> {
    return await this.animalRepositoryService.findOneByUser(id);
  }

  async create(animal: CreateAnimalDto): Promise<Animal> {
    return await this.animalRepositoryService.create(animal);
  }

  async update(id: number, animal: UpdateAnimalDto): Promise<Animal> {
    return await this.animalRepositoryService.update(id, animal);
  }

  async remove(id: number): Promise<void> {
    return await this.animalRepositoryService.remove(id);
  }
}
