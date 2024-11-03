import { PartialType } from "@nestjs/mapped-types";
import { Animal } from "../entities/animal.entity";


export class CreateAnimalDto extends PartialType(Animal) {

}