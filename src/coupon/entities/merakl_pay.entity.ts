import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('MeraklPay')
export class MeraklPay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  merchant_uid: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  buyer_name: string;

  @Column({ length: 15 })
  buyer_tel: string;

  @Column({ length: 255 })
  buyer_email: string;

  @Column({ length: 50 })
  status: string;

  @Column()
  created_at: string;

  @Column({ length: 255 })
  query: string;

  @Column({ length: 1 })
  agreeOrNot: string;

  @Column({ length: 255 })
  consulting_fields: string;

  @Column({ length: 255 })
  arr2: string;

  @Column({ length: 255 })
  pw: string;

  @Column({ length: 255 })
  bmdsNum: string;

  @Column({ length: 255 })
  con_name: string;

  @Column('text')
  whereIn: string;

  @Column()
  couponBool: boolean;
}
