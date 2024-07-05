import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity('Qna')
export class Qna {
  @Column({ primary: true, generated: true })
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @Column({ type: 'varchar', length: 100 })
  writer: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text', nullable: true })
  answer: string;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  deleted_at: Date;

  @Column({ type: 'datetime', nullable: true })
  answer_at: Date;

  @Column({ type: 'varchar', length: 1, default: 'N' })
  delete_yn: string;

  @Column()
  filePath: string;
}
