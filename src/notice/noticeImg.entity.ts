import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('NoticeImg')
export class NoticeImg {
  @PrimaryColumn()
  path: string;

  @Column()
  noticeId: number;
}
