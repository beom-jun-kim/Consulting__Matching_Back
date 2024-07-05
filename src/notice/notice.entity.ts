/*eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { NoticeImg } from './noticeImg.entity';

@Entity({ name: 'Notice' }) // Decorator that marks the class as an entity
export class Notice extends BaseEntity {
  @PrimaryGeneratedColumn() // Decorator that specifies the primary key column
  id: number;

  @Column() // Decorator that defines a column in the table
  category: string;

  @Column() // Decorator that defines a column in the table
  title: string;

  @Column() // Decorator that defines a column in the table
  content: string;

  @Column({ default: () => 'now()' }) // Decorator that defines a column in the table with a default value
  created_at: Date;

  @UpdateDateColumn() // Decorator that defines a column in the table with a default value
  updated_at: Date;

  @UpdateDateColumn() // Decorator that defines a column in the table that can be null
  deleted_at: Date;

  @Column({ default: 'N' }) // Decorator that defines a column in the table with a default value
  delete_yn: string;

  @Column()
  nopath: string;
}
