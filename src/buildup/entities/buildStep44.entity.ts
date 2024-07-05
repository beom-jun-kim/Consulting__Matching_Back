import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep44')
export class BuildStep44 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 80 })
  content1: string;

  @Column({ length: 80 })
  content2: string;

  @Column({ length: 80 })
  content3: string;

  @Column({ length: 80 })
  content4: string;

  @Column({ length: 80 })
  content5: string;

  @Column({ length: 80 })
  content6: string;

  @Column({ length: 80 })
  content7: string;

  @Column({ length: 80 })
  content8: string;

  @Column({ length: 60 })
  standard1: string;

  @Column({ length: 60 })
  standard2: string;

  @Column({ length: 60 })
  standard3: string;

  @Column({ length: 60 })
  standard4: string;

  @Column({ length: 60 })
  standard5: string;

  @Column({ length: 60 })
  standard6: string;

  @Column({ length: 60 })
  standard7: string;

  @Column({ length: 60 })
  standard8: string;

  @Column({ length: 90 })
  amount1: string;

  @Column({ length: 90 })
  amount2: string;

  @Column({ length: 90 })
  amount3: string;

  @Column({ length: 90 })
  amount4: string;

  @Column({ length: 90 })
  amount5: string;

  @Column({ length: 90 })
  amount6: string;

  @Column({ length: 90 })
  amount7: string;

  @Column({ length: 90 })
  amount8: string;

  @Column({ length: 150 })
  etc1: string;

  @Column({ length: 150 })
  etc2: string;

  @Column({ length: 150 })
  etc3: string;

  @Column({ length: 150 })
  etc4: string;

  @Column({ length: 150 })
  etc5: string;

  @Column({ length: 150 })
  etc6: string;

  @Column({ length: 150 })
  etc7: string;

  @Column({ length: 150 })
  etc8: string;

  @Column({ length: 255 })
  plan1: string;

  @Column({ length: 255 })
  plan2: string;

  @Column({ length: 255 })
  plan3: string;

  @Column({ length: 255 })
  plan4: string;

  @Column({ length: 90 })
  planAmount1: string;

  @Column({ length: 90 })
  planAmount2: string;

  @Column({ length: 90 })
  planAmount3: string;

  @Column({ length: 90 })
  planAmount4: string;

  @Column({ length: 150 })
  planEtc1: string;

  @Column({ length: 150 })
  planEtc2: string;

  @Column({ length: 150 })
  planEtc3: string;

  @Column({ length: 150 })
  planEtc4: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
