/*eslint-disable*/
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Faq' })
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: string;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: string;

  @Column({ default: 'N' })
  delete_yn: string;
}
