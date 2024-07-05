import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep74')
export class BuildStep74 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ type: 'text' })
  goal1: string;

  @Column({ type: 'text' })
  goal2: string;

  @Column({ type: 'text' })
  goal3: string;

  @Column({ type: 'text' })
  activity1: string;

  @Column({ type: 'text' })
  activity2: string;

  @Column({ type: 'text' })
  activity3: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
