import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep62')
export class BuildStep62 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 255 })
  pathUrl1: string;

  @Column({ length: 50 })
  check1: string;

  @Column({ length: 50 })
  check2: string;

  @Column({ length: 50 })
  check3: string;

  @Column({ length: 50 })
  check4: string;

  @Column({ length: 50 })
  check5: string;

  @Column({ length: 50 })
  check6: string;

  @Column({ length: 50 })
  check7: string;

  @Column({ length: 255 })
  channel1: string;

  @Column({ length: 255 })
  channel2: string;

  @Column({ length: 255 })
  channel3: string;

  @Column({ length: 255 })
  channel4: string;

  @Column({ type: 'text' })
  plan1: string;

  @Column({ type: 'text' })
  plan2: string;

  @Column({ type: 'text' })
  plan3: string;

  @Column({ type: 'text' })
  plan4: string;

  @Column({ length: 500 })
  fileName62: string;

  @Column({ length: 500 })
  fileKey: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
