import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep13')
export class BuildStep13 {
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
  pain5: string;

  @Column({ length: 200 })
  pain6: string;

  @Column({ length: 200 })
  pain7: string;

  @Column({ length: 200 })
  pain8: string;

  @Column({ length: 200 })
  req1: string;

  @Column({ length: 200 })
  req2: string;

  @Column({ length: 200 })
  req3: string;

  @Column({ length: 200 })
  req4: string;

  @Column({ length: 200 })
  req5: string;

  @Column({ length: 200 })
  req6: string;

  @Column({ length: 200 })
  req7: string;

  @Column({ length: 200 })
  req8: string;

  @Column({ length: 200 })
  um1: string;

  @Column({ length: 200 })
  um2: string;

  @Column({ length: 200 })
  um3: string;

  @Column({ length: 200 })
  um4: string;

  @Column({ length: 200 })
  um5: string;

  @Column({ length: 200 })
  um6: string;

  @Column({ length: 200 })
  um7: string;

  @Column({ length: 200 })
  um8: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
