import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep73')
export class BuildStep73 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 60 })
  checkList1: string;

  @Column({ length: 60 })
  checkList2: string;

  @Column({ length: 60 })
  checkList3: string;

  @Column({ length: 60 })
  checkList4: string;

  @Column({ length: 60 })
  checkList5: string;

  @Column({ length: 60 })
  checkList6: string;

  @Column({ length: 60 })
  checkList7: string;

  @Column({ length: 60 })
  checkList8: string;

  @Column({ length: 60 })
  checkList9: string;

  @Column({ length: 60 })
  checkList10: string;

  @Column({ length: 60 })
  checkList11: string;

  @Column({ length: 60 })
  checkList12: string;

  @Column({ length: 60 })
  checkList13: string;

  @Column({ length: 60 })
  checkList14: string;

  @Column({ length: 60 })
  checkList15: string;

  @Column({ length: 60 })
  checkList16: string;

  @Column({ length: 60 })
  checkList17: string;

  @Column({ length: 60 })
  checkList18: string;

  @Column({ length: 60 })
  checkList19: string;

  @Column({ length: 60 })
  checkList20: string;

  @Column({ length: 60 })
  checkList21: string;

  @Column({ length: 60 })
  checkList22: string;

  @Column({ length: 60 })
  checkList23: string;

  @Column({ length: 60 })
  checkList24: string;

  @Column({ length: 60 })
  checkList25: string;

  @Column({ length: 60 })
  checkList26: string;

  @Column({ length: 60 })
  checkList27: string;

  @Column({ length: 60 })
  checkList28: string;

  @Column({ length: 60 })
  checkList29: string;
  @Column({ length: 60 })
  checkList30: string;
  @Column({ length: 60 })
  checkList31: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
