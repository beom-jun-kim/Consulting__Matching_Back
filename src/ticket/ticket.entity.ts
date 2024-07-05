/*eslint-disable */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'Ticket' })
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  type: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  available_count: number;

  @Column({ default: 'N' })
  delete_yn: string; // 삭제 여부
}
