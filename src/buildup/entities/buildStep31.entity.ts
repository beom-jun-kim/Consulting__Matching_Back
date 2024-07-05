import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep31')
export class BuildStep31 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 50 })
  func1: string;

  @Column({ length: 50 })
  func2: string;

  @Column({ length: 50 })
  per1: string;

  @Column({ length: 50 })
  per2: string;

  @Column({ length: 50 })
  design1: string;

  @Column({ length: 50 })
  design2: string;

  @Column({ length: 50 })
  design3: string;

  @Column({ length: 50 })
  quality1: string;

  @Column({ length: 50 })
  quality2: string;

  @Column({ length: 50 })
  service1: string;

  @Column({ length: 50 })
  service2: string;

  @Column({ length: 50 })
  service3: string;

  @Column({ length: 50 })
  service4: string;

  @Column({ length: 50 })
  service5: string;

  @Column({ length: 50 })
  service6: string;

  @Column({ length: 50 })
  service7: string;

  @Column({ length: 50 })
  price1: string;

  @Column({ length: 50 })
  price2: string;

  @Column({ length: 50 })
  price3: string;

  @Column({ length: 50 })
  purchase1: string;

  @Column({ length: 50 })
  purchase2: string;

  @Column({ length: 50 })
  purchase3: string;

  @Column({ length: 50 })
  purchase4: string;

  @Column({ length: 50 })
  purchase5: string;

  @Column({ length: 100 })
  ect1: string;

  @Column({ length: 100 })
  ect2: string;

  @Column({ length: 100 })
  ect3: string;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
