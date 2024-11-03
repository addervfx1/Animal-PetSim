import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ActivityType {
  FEEDING = 'feeding',
  HYGIENE = 'hygiene',
  PLAY = 'play',
}

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'enum', enum: ActivityType })
  type: ActivityType;

  @Column({ type: 'int', default: 0 })
  pointsEarned: number;

  @Column({ type: 'int', default: 0 })
  pointsLost: number;
}
