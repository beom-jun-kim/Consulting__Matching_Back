import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep22')
export class BuildStep22 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 50 })
  gender: string;

  @Column({ length: 100 })
  age: string;

  @Column({ length: 200 })
  inComeLevel: string;

  @Column({ length: 100 })
  major: string;

  @Column({ length: 200 })
  socialActivity: string;

  @Column({ length: 200 })
  consumptionActivity: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
