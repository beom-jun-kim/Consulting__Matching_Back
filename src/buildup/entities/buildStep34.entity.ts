import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep34')
export class BuildStep34 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bmdsId: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  cause: string;

  @Column('text')
  definition: string;

  @Column({ type: 'text' })
  memo: string;

  @ManyToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
