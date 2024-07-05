/*eslint-disable */
import { User } from 'src/auth/user.entity';
import { BuildUpBmds } from 'src/buildup/entities/buildUpBmds.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'Portone' }) // Decorator that marks the class as an entity
export class Portone extends BaseEntity {
  @PrimaryGeneratedColumn() // Decorator that specifies the primary key column
  id: number;

  @Column()
  userId: number;

  @Column()
  merchantUid: string;

  @Column()
  productName: string;

  @Column()
  productPrice: number;

  @Column()
  subscribeMonthNum: number;

  @Column()
  bmCreationNum: number;

  @Column()
  buyerName: string;

  @Column()
  buyerTel: string;

  @Column()
  buyerEmail: string;

  @Column()
  status: string;

  @Column() // Decorator that defines a column in the table with a default value
  expireAt: Date;

  @Column({ default: () => 'now()' }) // Decorator that defines a column in the table with a default value
  createdAt: Date;

  @Column() // Decorator that defines a column in the table with a default value
  updatedAt: Date;

  @Column() // Decorator that defines a column in the table that can be null
  deletedAt: Date;

  @Column({ default: 'N' }) // Decorator that defines a column in the table with a default value
  deleteYn: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
