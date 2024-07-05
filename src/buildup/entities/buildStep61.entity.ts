import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep61')
export class BuildStep61 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 100 })
  channel1: string;

  @Column({ length: 100 })
  channel2: string;

  @Column({ length: 100 })
  channel3: string;

  @Column({ length: 100 })
  channel4: string;

  @Column({ type: 'text' })
  plan1: string;

  @Column({ type: 'text' })
  plan2: string;

  @Column({ type: 'text' })
  plan3: string;

  @Column({ type: 'text' })
  plan4: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
