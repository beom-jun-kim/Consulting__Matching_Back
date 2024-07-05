/*eslint-disable */

// import { BetaBmds } from 'src/beta-bmds/entities/betaBmds.entity';
import { BootPay } from 'src/bootpay/bootpay.entity';
import { BuildUpBmds } from 'src/buildup/entities/buildUpBmds.entity';
import { ConsultingJournal } from 'src/match/entities/consutingJournal.entity';
import { Match } from 'src/match/entities/match.entity';
import { TagList } from 'src/match/entities/tagList.entity';
import { ChoiceTags } from 'src/mentoringapp/entities/choicetags.entity';
import { UserRoadmap } from 'src/roadmap/userRoadmap.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'User' })
export class Supervisor extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  sCode: string;

  
  
  @Column()
  company: string;

  @Column()
  businessNum: string;

  @Column()
  representativeName: string;

  @Column()
  companyTel: string;

  @Column()
  faxTel: string;

  @Column()
  companyEmail: string;

  @CreateDateColumn({ name: 'startDate', type: 'datetime' })
  startDate: Date;

  @CreateDateColumn({ name: 'endDate', type: 'datetime' })
  endDate: Date;

  @Column()
  useYn: string;

  @Column()
  deleteYn: string;

  @Column()
  menteeCnt: number;

  @Column()
  mentoCnt: number;

  @Column()
  bmCnt: number;

  @Column()
  mentoringCnt: number;
}
