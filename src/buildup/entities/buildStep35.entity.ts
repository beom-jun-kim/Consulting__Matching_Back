import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep35')
export class BuildStep35 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bmdsId: number;

  @Column('text')
  cause: string;

  @Column({ length: 50 })
  direction: string;

  @Column('text')
  solution: string;

  @Column({ type: 'text' })
  memo: string;

  @ManyToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
