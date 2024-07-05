import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep56')
export class BuildStep56 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 50 })
  checkList1: string;

  @Column({ length: 50 })
  checkList2: string;

  @Column({ length: 50 })
  checkList3: string;

  @Column({ length: 50 })
  checkList4: string;

  @Column({ length: 50 })
  checkList5: string;

  @Column({ length: 50 })
  checkList6: string;

  @Column({ length: 50 })
  checkList7: string;

  @Column({ length: 50 })
  checkList8: string;

  @Column({ length: 50 })
  checkList9: string;

  @Column({ length: 50 })
  checkList10: string;

  @Column({ length: 50 })
  checkList11: string;

  @Column({ length: 50 })
  checkList12: string;

  @Column({ length: 50 })
  checkList13: string;

  @Column({ length: 50 })
  checkList14: string;

  @Column({ length: 50 })
  checkList15: string;
  
  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
