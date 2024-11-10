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
    return await this.animalRepository.find();
  }

  async findOne(id: number): Promise<Animal> {
    return await this.animalRepository.findOne({ where: { id } });
  }
  
  async findOneByUser(userId: number): Promise<Animal | null> {
    const animal = await this.animalRepository.findOne({
        where: { user: { id: userId } },
        relations: ['user'],
    });

    return animal || null;
}

  async create(animal: CreateAnimalDto): Promise<Animal> {
    return await this.animalRepository.save(animal);
  }

  async update(id: number, animal: UpdateAnimalDto): Promise<Animal> {
    await await this.animalRepository.update(id, animal);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await await this.animalRepository.delete(id);
  }
}
