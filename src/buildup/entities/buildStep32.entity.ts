import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep32')
export class BuildStep32 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 50 })
  tang1: string;

  @Column({ length: 50 })
  tang2: string;

  @Column({ length: 50 })
  tang3: string;

  @Column({ length: 50 })
  reliabillty1: string;

  @Column({ length: 50 })
  reliabillty2: string;

  @Column({ length: 50 })
  reliabillty3: string;

  @Column({ length: 50 })
  reliabillty4: string;

  @Column({ length: 50 })
  reactivity1: string;

  @Column({ length: 50 })
  reactivity2: string;

  @Column({ length: 50 })
  reactivity3: string;

  @Column({ length: 50 })
  reactivity4: string;

  @Column({ length: 50 })
  reactivity5: string;

  @Column({ length: 50 })
  reactivity6: string;

  @Column({ length: 50 })
  ability1: string;

  @Column({ length: 50 })
  ability2: string;

  @Column({ length: 50 })
  etiquette1: string;

  @Column({ length: 50 })
  etiquette2: string;

  @Column({ length: 50 })
  credibility1: string;

  @Column({ length: 50 })
  stability1: string;

  @Column({ length: 50 })
  stability2: string;

  @Column({ length: 50 })
  understand1: string;

  @Column({ length: 50 })
  understand2: string;

  @Column({ length: 50 })
  understand3: string;

  @Column({ length: 50 })
  communication1: string;

  @Column({ length: 50 })
  communication2: string;

  @Column({ length: 50 })
  availability1: string;

  @Column({ length: 50 })
  availability2: string;

  @Column({ length: 50 })
  availability3: string;

  @Column({ length: 100 })
  ect1: string;

  @Column({ length: 100 })
  ect2: string;

  @Column({ length: 100 })
  ect3: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
