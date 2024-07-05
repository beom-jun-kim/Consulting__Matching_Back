import { User } from 'src/auth/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('Vouchers')
export class Vouchers {
  @PrimaryGeneratedColumn()
  voucher_id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  grade: string;

  @Column()
  status: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
