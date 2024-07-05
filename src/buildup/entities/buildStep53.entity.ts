import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep53')
export class BuildStep53 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 20 })
  title: string;

  @Column({ length: 255 })
  pathUrl: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
