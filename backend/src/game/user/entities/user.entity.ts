import { Animal } from 'src/game/animal/entities/animal.entity';
import { Challenge } from 'src/game/challenge/entities/challenge.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int', default: 0 })
  score: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Animal, (animal) => animal.user)
  animals: Animal[];

  @OneToMany(() => Challenge, (challenge) => challenge.user)
  challenges: Challenge[];
}
