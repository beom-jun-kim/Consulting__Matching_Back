import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BmdsCoupon')
export class BmdsCoupon {
  @PrimaryGeneratedColumn()
  @PrimaryColumn({ type: 'varchar', length: 100 })
  authenticationCode: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  authName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  authEmail: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  authPhone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bmdsCoupon: string;

  @Column({ type: 'bool', default: true })
  bmdsBool: boolean;
}
