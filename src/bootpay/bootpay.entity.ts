/*eslint-disable */
import { User } from 'src/auth/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'BootPay' }) // Decorator that marks the class as an entity
export class BootPay extends BaseEntity {
  @PrimaryGeneratedColumn() // Decorator that specifies the primary key column
  id: number;

  @Column()
  userId: number;

  @Column() // Decorator that defines a column in the table
  billing_key: string;

  @Column() // Decorator that defines a column in the table
  order_id: string;

  @Column() // Decorator that defines a column in the table
  order_name: string;

  @Column() // Decorator that defines a column in the table
  email: string;

  @Column() // Decorator that defines a column in the table
  username: string;

  @Column() // Decorator that defines a column in the table
  phone: string;

  @Column() // Decorator that defines a column in the table
  reserve_id: string;

  @Column() // Decorator that defines a column in the table
  status_locale: string;

  @Column() // Decorator that defines a column in the table
  price: number;

  @Column({ default: () => 'now()' }) // Decorator that defines a column in the table with a default value
  created_at: Date;

  @Column() // Decorator that defines a column in the table with a default value
  updated_at: Date;

  @Column() // Decorator that defines a column in the table that can be null
  deleted_at: Date;

  @Column({ default: 'N' }) // Decorator that defines a column in the table with a default value
  delete_yn: string;

  @Column() // Decorator that defines a column in the table with a default value
  nextpay_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
// @Entity()
// export class Bootpay {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   receipt_id: string;

//   @Column()
//   order_id: string;

//   @Column()
//   price: string;

//   @Column()
//   tax_free: string;

//   @Column()
//   cancelled_price: string;

//   @Column()
//   cancelled_tax_free: string;

//   @Column()
//   order_name: string;

//   @Column()
//   company_name: string;

//   @Column()
//   sandbox: string;

//   @Column()
//   pg: string;

//   @Column()
//   method: string;

//   @Column()
//   method_symbol: string;

//   @Column()
//   method_origin: string;

//   @Column()
//   method_origin_symbol: string;

//   @Column()
//   purchased_at: Date;

//   @Column()
//   requested_at: Date;

//   @Column()
//   status_locale: string;

//   @Column()
//   currency: string;

//   @Column()
//   receipt_url: string;

//   @Column()
//   status: string;

//   @Column()
//   card_data: string;

//   @Column()
//   application_id: string;

//   @Column()
//   billing_key: string;
// }
