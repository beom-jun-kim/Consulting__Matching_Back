import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep21')
export class BuildStep21 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 200 })
  q1: string;

  @Column({ length: 200 })
  q2: string;

  @Column({ length: 10 })
  qYear1: string;

  @Column({ length: 10 })
  qYear2: string;

  @Column({ length: 10 })
  qYear3: string;

  @Column({ length: 50 })
  qScale1: string;

  @Column({ length: 50 })
  qScale2: string;

  @Column({ length: 50 })
  qScale3: string;

  @Column({ length: 20 })
  qYear4: string;

  @Column({ type: 'double' })
  qCagr: number;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
