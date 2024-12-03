import { PartialType } from "@nestjs/mapped-types";
import { Item } from "../entities/item.entity";


export class UpdateItemDto extends PartialType(Item) {

}