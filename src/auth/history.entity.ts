/*eslint-disable*/
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './user.entity';
import { Expose } from 'class-transformer';

@Entity('Login_History') // 테이블 이름
export class LoginHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false })
  userId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  login_date: Date;

  @Column({ type: 'varchar', length: 15 })
  login_device: string;
}
