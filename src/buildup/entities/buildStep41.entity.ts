import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep41')
export class BuildStep41 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 10 })
  category1: string;

  @Column({ length: 200 })
  content1: string;

  @Column({ length: 10 })
  character1: string;

  @Column({ length: 10 })
  level1: string;

  @Column({ length: 10 })
  category2: string;

  @Column({ length: 200 })
  content2: string;

  @Column({ length: 10 })
  character2: string;

  @Column({ length: 10 })
  level2: string;

  @Column({ length: 10 })
  category3: string;

  @Column({ length: 200 })
  content3: string;

  @Column({ length: 10 })
  character3: string;

  @Column({ length: 10 })
  level3: string;

  @Column({ length: 10 })
  category4: string;

  @Column({ length: 200 })
  content4: string;

  @Column({ length: 10 })
  character4: string;

  @Column({ length: 10 })
  level4: string;

  @Column({ length: 10 })
  category5: string;

  @Column({ length: 200 })
  content5: string;

  @Column({ length: 10 })
  character5: string;

  @Column({ length: 10 })
  level5: string;

  @Column({ length: 10 })
  category6: string;

  @Column({ length: 200 })
  content6: string;

  @Column({ length: 10 })
  character6: string;

  @Column({ length: 10 })
  level6: string;

  @Column({ length: 10 })
  category7: string;

  @Column({ length: 200 })
  content7: string;

  @Column({ length: 10 })
  character7: string;

  @Column({ length: 10 })
  level7: string;

  @Column({ length: 10 })
  category8: string;

  @Column({ length: 200 })
  content8: string;

  @Column({ length: 10 })
  character8: string;

  @Column({ length: 10 })
  level8: string;

  @Column({ length: 10 })
  category9: string;

  @Column({ length: 200 })
  content9: string;

  @Column({ length: 10 })
  character9: string;

  @Column({ length: 10 })
  level9: string;

  @Column({ length: 10 })
  category10: string;

  @Column({ length: 200 })
  content10: string;

  @Column({ length: 10 })
  character10: string;

  @Column({ length: 10 })
  level10: string;

  @Column({ length: 10 })
  category11: string;

  @Column({ length: 200 })
  content11: string;

  @Column({ length: 10 })
  character11: string;

  @Column({ length: 10 })
  level11: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
