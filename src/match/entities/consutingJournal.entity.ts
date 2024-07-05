import { User } from 'src/auth/user.entity';
import { BuildUpBmds } from 'src/buildup/entities/buildUpBmds.entity';
import { MentoringApp } from 'src/mentoringapp/entities/mentoringapp.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('ConsultingJournal')
export class ConsultingJournal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appId: number;

  @Column()
  consultantUserId: number;

  @Column()
  generalUserId: number;

  @Column()
  buildId: number;

  @Column({ length: 50 })
  mentorName: string;

  @Column({ length: 100 })
  mentorArea: string;

  @Column({ length: 100 })
  mentorGroup: string;

  @Column({ length: 100 })
  mentorRank: string;

  @Column({ length: 50 })
  menteeName: string;

  @Column({ length: 20 })
  menteeIsStartUp: string;

  @Column({ length: 100 })
  menteeCompany: string;

  @Column({ length: 200 })
  menteeItem: string;

  @Column({ length: 20 })
  degree: string;

  @Column()
  performanceDate: Date;

  @Column({ length: 20 })
  teachingMethod: string;

  @Column({ length: 100 })
  place: string;

  @Column('text')
  etc: string;

  @Column('text')
  subject: string;

  @Column('text')
  summary: string;

  @Column('text')
  result: string;

  @Column('text')
  benefit: string;

  @Column('text')
  evaluate: string;

  @Column()
  category: string;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @Column()
  deletedYn: string;

  @Column({ length: 255 })
  img1: string;

  @Column({ length: 255 })
  img2: string;

  // @Column({ length: 255 })
  // img3: string;

  @Column({ length: 255 })
  hanFile: string;

  @Column({ length: 255 })
  hanFileName: string;

  @ManyToOne(() => User, (user) => user.consultantMatches)
  consultantUser: User;

  @ManyToOne(() => User, (user) => user.generalMatches)
  generalUser: User;

  @ManyToOne(() => BuildUpBmds, (buildUp) => buildUp.consutJournals)
  build: BuildUpBmds;

  @CreateDateColumn()
  createdAt: Date;
}
