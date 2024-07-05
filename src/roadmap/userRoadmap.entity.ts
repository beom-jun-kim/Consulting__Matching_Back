import { User } from 'src/auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class UserRoadmap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  viewQuery: string;

  @ManyToOne(() => User, (user) => user.userRoadmaps)
  user: User;
}
