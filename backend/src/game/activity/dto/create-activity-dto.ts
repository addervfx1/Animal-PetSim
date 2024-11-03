import { PartialType } from "@nestjs/mapped-types";
import { Activity } from "../entities/activity.entity";


export class CreateActivityDto extends PartialType(Activity) {

}