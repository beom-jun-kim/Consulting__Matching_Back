import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep25')
export class BuildStep25 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 200 })
  competitor1: string;

  @Column({ length: 200 })
  competitor2: string;

  @Column({ length: 200 })
  competitor3: string;

  @Column({ length: 200 })
  discrim1: string;

  @Column({ length: 200 })
  discrim2: string;

  @Column({ length: 200 })
  discrim3: string;

  @Column({ length: 200 })
  benefit1: string;

  @Column({ length: 200 })
  benefit2: string;

  @Column({ length: 200 })
  benefit3: string;

  @Column()
  content: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
