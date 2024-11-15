import { User } from 'src/game/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

export enum AnimalType {
  DOG = 'dog',
  CAT = 'cat',
}

@Entity('animals')
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AnimalType })
  type: AnimalType;

  @Column({ type: 'varchar', length: 255 })
  breed: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 255 })
  health: string;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => User, (user) => user.animals)
  user: User;
}
