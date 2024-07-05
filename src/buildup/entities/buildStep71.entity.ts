import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep71')
export class BuildStep71 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 100 })
  checkList1: string;

  @Column({ length: 100 })
  checkList2: string;

  @Column({ length: 100 })
  checkList3: string;

  @Column({ length: 100 })
  checkList4: string;

  @Column({ length: 100 })
  checkList5: string;

  @Column({ length: 100 })
  checkList6: string;

  @Column({ length: 100 })
  checkList7: string;

  @Column({ length: 100 })
  checkList8: string;

  @Column({ length: 100 })
  checkList9: string;

  @Column({ length: 100 })
  checkList10: string;

  @Column({ length: 100 })
  checkList11: string;

  @Column({ length: 100 })
  checkList12: string;

  @Column({ length: 100 })
  checkList13: string;

  @Column({ length: 100 })
  checkList14: string;

  @Column({ length: 100 })
  checkList15: string;

  @Column({ length: 100 })
  checkList16: string;
  
  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
