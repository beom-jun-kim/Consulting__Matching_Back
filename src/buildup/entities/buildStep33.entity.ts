import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep33')
export class BuildStep33 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 100 })
  selectedItem1: string;

  @Column({ length: 100 })
  selectedItem2: string;

  @Column({ length: 100 })
  selectedItem3: string;

  @Column({ length: 100 })
  selectedItem4: string;

  @Column({ length: 200 })
  description1: string;

  @Column({ length: 200 })
  description2: string;

  @Column({ length: 200 })
  description3: string;

  @Column({ length: 200 })
  description4: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
