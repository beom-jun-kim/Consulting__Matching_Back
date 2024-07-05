import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roadMap')
export class Roadmap {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  areas: string;

  @Column({ nullable: true })
  titlle: string;

  @Column({ nullable: true })
  amount: number;

  @Column({ nullable: true })
  scale: number;

  @Column({ nullable: true })
  supply_amount: number;

  @Column({
    nullable: true,
    type: 'text',
  })
  target1: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  content: string;

  @Column({ nullable: true })
  period1: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  how: string;

  @Column({ nullable: true })
  career1: string;

  @Column({ nullable: true })
  career2: string;

  @Column({ nullable: true })
  career_int: number;

  @Column({ nullable: true })
  pre: string;

  @Column({ nullable: true })
  restartup: string;

  @Column({ nullable: true })
  age: string;

  @Column({ nullable: true })
  isBoy: string;

  @Column({ nullable: true })
  isfemale: string;

  @Column({ nullable: true })
  local1: string;

  @Column({ nullable: true })
  localdetail: string;

  @Column({ nullable: true })
  detailarea_category: string;

  @Column({ nullable: true })
  detailarea: string;

  @Column({ nullable: true })
  isShow: number;

  @Column({ nullable: true })
  test: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  link: string;

  @Column({ nullable: true })
  isBoth: number;

  @Column({ nullable: true })
  isSocialed: number;

  @Column({ length: 255 })
  pathUrl: string;
}
