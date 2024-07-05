import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('betaBmdsReview')
export class BuildUpReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  buildId: number;

  @Column({ nullable: true })
  score: number;

  @Column({ nullable: true, length: 255 })
  content: string;

  @OneToOne(() => BuildUpBmds)
  buildUpBmds: BuildUpBmds;
}
