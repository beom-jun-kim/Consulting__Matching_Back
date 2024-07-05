import { User } from 'src/auth/user.entity';
import { BuildUpBmds } from 'src/buildup/entities/buildUpBmds.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('Match')
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  generalUserId: number;

  @Column()
  consultantUserId: number;

  @Column()
  buildId: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  matchedDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ length: 20 })
  matchedState: string;

  @Column({ length: 100 })
  category: string;

  @Column({ length: 100 })
  categoryDetail: string;

  @Column({ length: 255 })
  resultReport: string;

  @Column({ length: 255 })
  resultReportName: string;

  @ManyToOne(() => User)
  generalUser: User;

  @ManyToOne(() => User)
  consultantUser: User;

  @ManyToOne(() => BuildUpBmds, (buildUpBmds) => buildUpBmds.matches)
  build: BuildUpBmds;
}
