import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep43')
export class BuildStep43 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 100 })
  content1: string;

  @Column({ type: 'tinyint' })
  startMonth1: number;

  @Column({ type: 'tinyint' })
  endMonth1: number;

  @Column({ length: 100 })
  content2: string;

  @Column({ type: 'tinyint' })
  startMonth2: number;

  @Column({ type: 'tinyint' })
  endMonth2: number;

  @Column({ length: 100 })
  content3: string;

  @Column({ type: 'tinyint' })
  startMonth3: number;

  @Column({ type: 'tinyint' })
  endMonth3: number;

  @Column({ length: 100 })
  content4: string;

  @Column({ type: 'tinyint' })
  startMonth4: number;

  @Column({ type: 'tinyint' })
  endMonth4: number;

  @Column({ length: 100 })
  content5: string;

  @Column({ type: 'tinyint' })
  startMonth5: number;

  @Column({ type: 'tinyint' })
  endMonth5: number;

  @Column({ length: 100 })
  content6: string;

  @Column({ type: 'tinyint' })
  startMonth6: number;

  @Column({ type: 'tinyint' })
  endMonth6: number;

  @Column({ length: 100 })
  content7: string;

  @Column({ type: 'tinyint' })
  startMonth7: number;

  @Column({ type: 'tinyint' })
  endMonth7: number;

  @Column({ length: 100 })
  content8: string;

  @Column({ type: 'tinyint' })
  startMonth8: number;

  @Column({ type: 'tinyint' })
  endMonth8: number;

  @Column({ length: 100 })
  content9: string;

  @Column({ type: 'tinyint' })
  startMonth9: number;

  @Column({ type: 'tinyint' })
  endMonth9: number;

  @Column({ length: 100 })
  content10: string;

  @Column({ type: 'tinyint' })
  startMonth10: number;

  @Column({ type: 'tinyint' })
  endMonth10: number;

  @Column({ length: 100 })
  content11: string;

  @Column({ type: 'tinyint' })
  startMonth11: number;

  @Column({ type: 'tinyint' })
  endMonth11: number;

  @Column({ length: 100 })
  content12: string;

  @Column({ type: 'tinyint' })
  startMonth12: number;

  @Column({ type: 'tinyint' })
  endMonth12: number;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
