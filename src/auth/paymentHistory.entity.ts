/* eslint-disable  */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Pay_History')
export class PaymentHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', length: 100 })
  imp_uid: string;
}
