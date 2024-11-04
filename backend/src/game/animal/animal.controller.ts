import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Animal } from './entities/animal.entity';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal-dto';
import { UpdateAnimalDto } from './dto/update-animal-dto';



@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  async findAll(): Promise<Animal[]> {
    return await this.animalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Animal> {
    return await this.animalService.findOne(id);
  }

  @Post()
  async create(@Body() createAnimalDto: CreateAnimalDto): Promise<Animal> {
    return await this.animalService.create(createAnimalDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    return await this.animalService.update(id, updateAnimalDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.animalService.remove(id);
  }
}
