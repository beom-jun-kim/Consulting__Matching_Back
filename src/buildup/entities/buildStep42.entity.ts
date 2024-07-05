import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep42')
export class BuildStep42 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 255 })
  imgUrl: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
