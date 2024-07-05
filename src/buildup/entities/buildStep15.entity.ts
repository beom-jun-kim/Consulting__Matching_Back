import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep15')
export class BuildStep15 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 200 })
  pain1: string;

  @Column({ length: 200 })
  pain2: string;

  @Column({ length: 200 })
  pain3: string;

  @Column({ length: 200 })
  pain4: string;

  @Column({ length: 200 })
  disadvantage1: string;

  @Column({ length: 200 })
  disadvantage2: string;

  @Column({ length: 200 })
  disadvantage3: string;

  @Column({ length: 200 })
  disadvantage4: string;

  @Column({ length: 30 })
  cPoint: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
