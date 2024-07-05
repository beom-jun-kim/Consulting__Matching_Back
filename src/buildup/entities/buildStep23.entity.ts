import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep23')
export class BuildStep23 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 200 })
  category: string;

  @Column({ length: 200 })
  detailCategory: string;

  @Column({ length: 200 })
  scale: string;

  @Column({ length: 200 })
  logical: string;

  @Column({ length: 200 })
  goal: string;

  @Column({ length: 200 })
  selected: string;

  @Column({ length: 200 })
  cycle: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
