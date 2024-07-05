import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep11')
export class BuildStep11 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 100 })
  q1: string;

  @Column({ length: 30 })
  q2: string;

  @Column({ type: 'tinyint' })
  q3a: number;

  @Column({ type: 'tinyint' })
  q3b: number;

  @Column({ type: 'tinyint' })
  q3c: number;

  @Column({ type: 'tinyint' })
  q3d: number;

  @Column({ type: 'tinyint' })
  q3e: number;

  @Column({ type: 'tinyint' })
  q3f: number;

  @Column({ type: 'tinyint' })
  q3g: number;

  @Column({ type: 'tinyint' })
  q3h: number;

  @Column({ type: 'tinyint' })
  q3i: number;

  @Column({ type: 'tinyint' })
  q3j: number;

  @Column({ type: 'text' })
  memo: string;

  

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
