import { PartialType } from "@nestjs/mapped-types";
import { Challenge } from "../entities/challenge.entity";


export class CreateChallengeDto extends PartialType(Challenge) {

}