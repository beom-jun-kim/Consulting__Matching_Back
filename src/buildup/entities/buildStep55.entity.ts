import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep55')
export class BuildStep55 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 100 })
  groupName1: string;

  @Column({ length: 100 })
  groupName2: string;

  @Column({ length: 100 })
  groupName3: string;

  @Column({ length: 100 })
  groupName4: string;

  @Column({ length: 40 })
  groupCount1: string;

  @Column({ length: 40 })
  groupCount2: string;

  @Column({ length: 40 })
  groupCount3: string;

  @Column({ length: 40 })
  groupCount4: string;

  @Column({ type: 'text' })
  customerChar1: string;

  @Column({ type: 'text' })
  customerChar2: string;

  @Column({ type: 'text' })
  customerChar3: string;

  @Column({ type: 'text' })
  customerChar4: string;

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
