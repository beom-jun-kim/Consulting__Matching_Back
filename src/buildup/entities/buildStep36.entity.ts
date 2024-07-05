import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep36')
export class BuildStep36 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 50, nullable: true })
  step12_1: string;

  @Column({ length: 50, nullable: true })
  step12_2: string;

  @Column({ length: 50, nullable: true })
  step12_3: string;

  @Column({ length: 50, nullable: true })
  step12_4: string;

  @Column({ length: 50, nullable: true })
  step12_5: string;

  @Column({ length: 50, nullable: true })
  step12_6: string;

  @Column({ length: 50, nullable: true })
  step12_7: string;

  @Column({ length: 50, nullable: true })
  step12_8: string;

  @Column({ length: 50, nullable: true })
  step12_9: string;

  @Column({ length: 50, nullable: true })
  step12_10: string;

  @Column({ length: 50, nullable: true })
  step12_11: string;

  @Column({ length: 50, nullable: true })
  step12_12: string;

  @Column({ nullable: true })
  otherOption: boolean;

  @Column({ length: 100, nullable: true })
  otherOptionText: string;

  @Column({ length: 50, nullable: true })
  coreItem1: string;

  @Column({ length: 50, nullable: true })
  coreItem2: string;

  @Column({ length: 50, nullable: true })
  coreItem3: string;

  @Column({ length: 50, nullable: true })
  coreItem4: string;

  @Column('text', { nullable: true })
  corePoint1: string;

  @Column('text', { nullable: true })
  corePoint2: string;

  @Column('text', { nullable: true })
  corePoint3: string;

  @Column('text', { nullable: true })
  corePoint4: string;

  @Column({ length: 10, nullable: true })
  highLow1: string;

  @Column({ length: 10, nullable: true })
  highLow2: string;

  @Column({ length: 10, nullable: true })
  highLow3: string;

  @Column({ length: 10, nullable: true })
  highLow4: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
