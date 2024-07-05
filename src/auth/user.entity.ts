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
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column({ name: 'phone_num' })
  phoneNum: string;

  @Column()
  company: string;

  @Column()
  useYn: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @Column()
  resume: string;

  @Column({ default: 'common' })
  role: string;

  @Column({ default: 'common' })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @UpdateDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

  @UpdateDateColumn({ name: 'twoWeeksStart_at', type: 'datetime' })
  twoWeeksStartAt: Date;

  @Column({ length: 1 })
  isStudent: string;

  @Column({ name: 'delete_yn', type: 'varchar', length: 1 })
  deleteYn: string;

  @Column({ name: 'grade_id' })
  gradeId: number;

  @Column({ name: 'grade_point' })
  gradePoint: number;

  @Column({ default: 'New' })
  gradelv: number;

  @Column({ default: 0 })
  isEmailConfirmed: number;

  @Column()
  confirmationCode: string;

  // @Column()
  // gender: string;

  @Column()
  isMentor: string;

  @Column({ default: 0 })
  resumeConfirm: number;

  @Column({ default: 0 })
  useCoupon: boolean;

  @Column()
  affiliationGroup: string;

  @OneToMany(() => BuildUpBmds, (buildUpBmds) => buildUpBmds.user)
  buildUpBmds: BuildUpBmds[];

  @OneToMany(() => BootPay, (BootPay) => BootPay.user)
  bootPay: BootPay[];

  @OneToMany(() => UserRoadmap, (userRoadmap) => userRoadmap.user)
  userRoadmaps: UserRoadmap[];

  @OneToMany(() => Match, (match) => match.generalUser)
  generalMatches: Match[];

  @OneToMany(() => Match, (match) => match.consultantUser)
  consultantMatches: Match[];

  @OneToMany(() => TagList, (tag) => tag.user)
  tags: TagList[];

  @OneToMany(
    () => ConsultingJournal,
    (consutJournal) => consutJournal.consultantUser,
  )
  consutJournals: ConsultingJournal[];
}
