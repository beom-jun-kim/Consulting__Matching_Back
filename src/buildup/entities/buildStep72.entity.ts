import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep72')
export class BuildStep72 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 60 })
  checkList1_1: string;

  @Column({ length: 60 })
  checkList1_2: string;

  @Column({ length: 60 })
  checkList1_3: string;

  @Column({ length: 60 })
  checkList1_4: string;

  @Column({ length: 60 })
  checkList1_5: string;

  @Column({ length: 60 })
  checkList1_6: string;

  @Column({ length: 60 })
  checkList1_7: string;

  @Column({ length: 60 })
  checkList1_8: string;

  @Column({ length: 60 })
  checkList1_9: string;

  @Column({ length: 100 })
  checkList1_10: string;

  @Column({ length: 60 })
  checkList2_1: string;

  @Column({ length: 60 })
  checkList2_2: string;

  @Column({ length: 60 })
  checkList2_3: string;

  @Column({ length: 60 })
  checkList2_4: string;

  @Column({ length: 60 })
  checkList2_5: string;

  @Column({ length: 60 })
  checkList2_6: string;

  @Column({ length: 60 })
  checkList2_7: string;

  @Column({ length: 60 })
  checkList2_8: string;

  @Column({ length: 60 })
  checkList2_9: string;

  @Column({ length: 60 })
  checkList2_10: string;

  @Column({ length: 60 })
  checkList2_11: string;

  @Column({ length: 60 })
  checkList2_12: string;

  @Column({ length: 100 })
  checkList2_13: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
