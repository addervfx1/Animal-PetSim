import { PartialType } from "@nestjs/mapped-types";
import { Animal } from "../entities/animal.entity";


export class UpdateAnimalDto extends PartialType(Animal) {

}