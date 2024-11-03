import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal-dto';
import { UpdateAnimalDto } from './dto/update-animal-dto';


@Injectable()
export class AnimalRepositoryService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
  ) {}

  async findAll(): Promise<Animal[]> {
    return this.animalRepository.find();
  }

  async findOne(id: number): Promise<Animal> {
    return this.animalRepository.findOne({ where: { id } });
  }

  async create(animal: CreateAnimalDto): Promise<Animal> {
    return this.animalRepository.save(animal);
  }

  async update(id: number, animal: UpdateAnimalDto): Promise<Animal> {
    await this.animalRepository.update(id, animal);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.animalRepository.delete(id);
  }
}
