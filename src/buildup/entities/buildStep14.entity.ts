import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep14')
export class BuildStep14 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 40 })
  aPositiveTitle1: string;

  @Column({ length: 40 })
  aPositiveTitle2: string;

  @Column({ length: 40 })
  aPositiveTitle3: string;

  @Column({ length: 80 })
  aPositiveContent1: string;

  @Column({ length: 80 })
  aPositiveContent2: string;

  @Column({ length: 80 })
  aPositiveContent3: string;

  @Column({ length: 40 })
  bPositiveTitle1: string;

  @Column({ length: 40 })
  bPositiveTitle2: string;

  @Column({ length: 40 })
  bPositiveTitle3: string;

  @Column({ length: 80 })
  bPositiveContent1: string;

  @Column({ length: 80 })
  bPositiveContent2: string;

  @Column({ length: 80 })
  bPositiveContent3: string;

  @Column({ length: 40 })
  cPositiveTitle1: string;

  @Column({ length: 40 })
  cPositiveTitle2: string;

  @Column({ length: 40 })
  cPositiveTitle3: string;

  @Column({ length: 80 })
  cPositiveContent1: string;

  @Column({ length: 80 })
  cPositiveContent2: string;

  @Column({ length: 80 })
  cPositiveContent3: string;

  @Column({ length: 40 })
  aNegativeTitle1: string;

  @Column({ length: 40 })
  aNegativeTitle2: string;

  @Column({ length: 40 })
  aNegativeTitle3: string;

  @Column({ length: 80 })
  aNegativeContent1: string;

  @Column({ length: 80 })
  aNegativeContent2: string;

  @Column({ length: 80 })
  aNegativeContent3: string;

  @Column({ length: 40 })
  bNegativeTitle1: string;

  @Column({ length: 40 })
  bNegativeTitle2: string;

  @Column({ length: 40 })
  bNegativeTitle3: string;

  @Column({ length: 80 })
  bNegativeContent1: string;

  @Column({ length: 80 })
  bNegativeContent2: string;

  @Column({ length: 80 })
  bNegativeContent3: string;

  @Column({ length: 40 })
  cNegativeTitle1: string;

  @Column({ length: 40 })
  cNegativeTitle2: string;

  @Column({ length: 40 })
  cNegativeTitle3: string;

  @Column({ length: 80 })
  cNegativeContent1: string;

  @Column({ length: 80 })
  cNegativeContent2: string;

  @Column({ length: 80 })
  cNegativeContent3: string;

  @Column({ length: 255 })
  productA: string;

  @Column({ length: 255 })
  productB: string;

  @Column({ length: 255 })
  productC: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
