/*eslint-disable */
import { User } from 'src/auth/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ChoiceTags } from './choicetags.entity';
import { ConsultingJournal } from 'src/match/entities/consutingJournal.entity';

@Entity({ name: 'MentoringApp' }) // Decorator that marks the class as an entity
export class MentoringApp extends BaseEntity {
  @PrimaryGeneratedColumn() // Decorator that specifies the primary key column
  id: number;

  @Column()
  appId: number;

  @Column()
  userId: number;

  @Column()
  menteeId: number;

  @Column()
  mentoId: number;

  @Column()
  menteeName: number;

  @Column()
  mentoName: number;

  @Column()
  title: string;

  @Column()
  appTitle: string;

  @Column()
  bmTitle: string;

  @Column()
  menteeEmail: string;

  @Column()
  menteeMail: string;

  @Column()
  mentoMail: string;

  @Column()
  menteeTel: string;

  @Column()
  bmName: string;

  @Column()
  isSelf: number;

  @Column()
  mentoEmail: string;

  @Column()
  place: number;

  @Column()
  mentoringAt: Date;

  @Column()
  matchState: string;

  @Column({ default: () => 'now()' })
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @Column({ default: 'N' })
  deleteYn: string;

  @Column()
  consultingCnt: number;

  @Column()
  tagNames: string;

  @Column()
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => ChoiceTags, (choiceTags) => choiceTags.app)
  tags: ChoiceTags[];
}
