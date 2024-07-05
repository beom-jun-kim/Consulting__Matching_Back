/*eslint-disable */
import { User } from 'src/auth/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { MentoringApp } from './mentoringapp.entity';

@Entity({ name: 'ChoiceTags' }) // Decorator that marks the class as an entity
export class ChoiceTags extends BaseEntity {
  @PrimaryGeneratedColumn() // Decorator that specifies the primary key column
  id: number;

  @Column()
  appId: number;

  @Column()
  userId: number;

  @Column()
  tagName: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => MentoringApp, (ment) => ment.tags)
  app: MentoringApp;
}
