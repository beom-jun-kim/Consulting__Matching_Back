import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep63')
export class BuildStep63 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 50 })
  title1: string;

  @Column({ length: 50 })
  title2: string;

  @Column({ length: 50 })
  title3: string;

  @Column({ length: 30 })
  price1: string;

  @Column({ length: 30 })
  price2: string;

  @Column({ length: 30 })
  price3: string;

  @Column({ length: 50 })
  player1: string;

  @Column({ length: 50 })
  player2: string;

  @Column({ length: 50 })
  player3: string;

  @Column()
  packageBool1_1: boolean;

  @Column({ length: 80 })
  packageTitle1_1: string;

  @Column({ length: 80 })
  packageContent1_1: string;

  @Column()
  packageBool1_2: boolean;

  @Column({ length: 80 })
  packageTitle1_2: string;

  @Column({ length: 80 })
  packageContent1_2: string;

  @Column()
  packageBool1_3: boolean;

  @Column({ length: 80 })
  packageTitle1_3: string;

  @Column({ length: 80 })
  packageContent1_3: string;

  @Column()
  packageBool1_4: boolean;

  @Column({ length: 80 })
  packageTitle1_4: string;

  @Column({ length: 80 })
  packageContent1_4: string;

  @Column()
  packageBool1_5: boolean;

  @Column({ length: 80 })
  packageTitle1_5: string;

  @Column({ length: 80 })
  packageContent1_5: string;

  @Column()
  packageBool1_6: boolean;

  @Column({ length: 80 })
  packageTitle1_6: string;

  @Column({ length: 80 })
  packageContent1_6: string;

  @Column()
  packageBool2_1: boolean;

  @Column({ length: 80 })
  packageTitle2_1: string;

  @Column({ length: 80 })
  packageContent2_1: string;

  @Column()
  packageBool2_2: boolean;

  @Column({ length: 80 })
  packageTitle2_2: string;

  @Column({ length: 80 })
  packageContent2_2: string;

  @Column()
  packageBool2_3: boolean;

  @Column({ length: 80 })
  packageTitle2_3: string;

  @Column({ length: 80 })
  packageContent2_3: string;

  @Column()
  packageBool2_4: boolean;

  @Column({ length: 80 })
  packageTitle2_4: string;

  @Column({ length: 80 })
  packageContent2_4: string;

  @Column()
  packageBool2_5: boolean;

  @Column({ length: 80 })
  packageTitle2_5: string;

  @Column({ length: 80 })
  packageContent2_5: string;

  @Column()
  packageBool2_6: boolean;

  @Column({ length: 80 })
  packageTitle2_6: string;

  @Column({ length: 80 })
  packageContent2_6: string;

  @Column()
  packageBool3_1: boolean;

  @Column({ length: 80 })
  packageTitle3_1: string;

  @Column({ length: 80 })
  packageContent3_1: string;

  @Column()
  packageBool3_2: boolean;

  @Column({ length: 80 })
  packageTitle3_2: string;

  @Column({ length: 80 })
  packageContent3_2: string;

  @Column()
  packageBool3_3: boolean;

  @Column({ length: 80 })
  packageTitle3_3: string;

  @Column({ length: 80 })
  packageContent3_3: string;

  @Column()
  packageBool3_4: boolean;

  @Column({ length: 80 })
  packageTitle3_4: string;

  @Column({ length: 80 })
  packageContent3_4: string;

  @Column()
  packageBool3_5: boolean;

  @Column({ length: 80 })
  packageTitle3_5: string;

  @Column({ length: 80 })
  packageContent3_5: string;

  @Column()
  packageBool3_6: boolean;

  @Column({ length: 80 })
  packageTitle3_6: string;

  @Column({ length: 80 })
  packageContent3_6: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
