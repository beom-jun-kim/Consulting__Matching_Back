import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ database: 'merakl', name: 'contact' })
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  area: string;

  @Column()
  detail: string;

  @Column()
  established: string;

  @Column()
  sales: string;

  @Column()
  interests: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  company_name: string;

  @Column()
  phone: string;

  @Column()
  createdAt: string;

  @Column()
  deleteYn: string;
}
