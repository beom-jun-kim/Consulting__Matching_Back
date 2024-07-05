import { User } from 'src/auth/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BuildStep34 } from './buildStep34.entity';
import { BuildStep35 } from './buildStep35.entity';
import { BuildStep34_2 } from './buildStep34_2.entity';
import { ConsultingJournal } from 'src/match/entities/consutingJournal.entity';
import { Match } from 'src/match/entities/match.entity';
import { Portone } from 'src/portone/portone.entity';

@Entity('BuildUpBmds')
export class BuildUpBmds {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 100 })
  bmVersion: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => BuildStep34, (buildStep34) => buildStep34.buildUpBmds)
  buildStep34: BuildStep34[];

  @OneToMany(() => BuildStep34_2, (buildStep34_2) => buildStep34_2.buildUpBmds)
  buildStep34_2: BuildStep34_2[];

  @OneToMany(() => BuildStep35, (buildStep35) => buildStep35.buildUpBmds)
  buildStep35: BuildStep35[];

  @OneToMany(() => ConsultingJournal, (consutJournal) => consutJournal.build)
  consutJournals: ConsultingJournal[];

  @OneToMany(() => Match, (match) => match.build)
  matches: Match[];
}
