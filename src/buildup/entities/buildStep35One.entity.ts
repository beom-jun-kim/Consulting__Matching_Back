import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep35_one')
export class BuildStep35One {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column('text')
  cause1: string;

  @Column('text')
  cause2: string;

  @Column('text')
  cause3: string;

  @Column({ length: 50 })
  direction1_1: string;

  @Column({ length: 50 })
  direction1_2: string;

  @Column({ length: 50 })
  direction1_3: string;

  @Column({ length: 50 })
  direction2_1: string;

  @Column({ length: 50 })
  direction2_2: string;

  @Column({ length: 50 })
  direction2_3: string;

  @Column({ length: 50 })
  direction3_1: string;

  @Column({ length: 50 })
  direction3_2: string;

  @Column({ length: 50 })
  direction3_3: string;

  @Column('text')
  solution1_1: string;

  @Column('text')
  solution1_2: string;

  @Column('text')
  solution1_3: string;

  @Column('text')
  solution2_1: string;

  @Column('text')
  solution2_2: string;

  @Column('text')
  solution2_3: string;

  @Column('text')
  solution3_1: string;

  @Column('text')
  solution3_2: string;

  @Column('text')
  solution3_3: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
