import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'GroupCode' })
export class GroupCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codeName: string;

  @Column()
  company: string;
}
