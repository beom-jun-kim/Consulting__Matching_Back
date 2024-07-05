import { User } from 'src/auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('TagList')
export class TagList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  tagName: string;

  @ManyToOne(() => User, (user) => user.tags)
  user: User;
}
