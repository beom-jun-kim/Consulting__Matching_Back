import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep59')
export class BuildStep59 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ type: 'text' })
  feedback1: string;

  @Column({ type: 'text' })
  feedback2: string;

  @Column({ type: 'text' })
  feedback3: string;

  @Column({ type: 'text' })
  feedback4: string;

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
