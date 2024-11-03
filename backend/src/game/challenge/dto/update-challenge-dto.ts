import { PartialType } from "@nestjs/mapped-types";
import { Challenge } from "../entities/challenge.entity";


export class UpdateChallengeDto extends PartialType(Challenge) {

}