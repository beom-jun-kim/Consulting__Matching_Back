import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BuildUpBmds } from './buildUpBmds.entity';

@Entity('BuildStep37')
export class BuildStep37 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bmdsId: number;

  @Column({ length: 80 })
  productKey: string;

  @Column({ length: 80 })
  priceKey: string;

  @Column({ length: 80 })
  placeKey: string;

  @Column({ length: 80 })
  promotionKey: string;

  @Column({ length: 100 })
  productName: string;

  @Column({ length: 200 })
  productFunc: string;

  @Column({ length: 255 })
  productDesign: string;

  @Column({ length: 20 })
  priceLevel: string;

  @Column({ length: 90 })
  priceStratgy: string;

  @Column({ length: 50 })
  priceSolution: string;

  @Column({ length: 10 })
  placeSolution1: string;

  @Column({ length: 10 })
  placeSolution2: string;

  @Column({ length: 30 })
  placeChannel: string;

  @Column({ length: 30 })
  placeChanne2: string;

  @Column()
  check37_1: boolean;

  @Column()
  check37_2: boolean;

  @Column()
  check37_3: boolean;

  @Column()
  check37_4: boolean;

  @Column()
  check37_5: boolean;

  @Column()
  check37_6: boolean;

  @Column()
  check37_7: boolean;

  @Column()
  check37_8: boolean;

  @Column()
  check37_9: boolean;

  @Column({ type: 'text' })
  memo: string;

  @OneToOne(() => BuildUpBmds)
  @JoinColumn({ name: 'bmdsId' })
  buildUpBmds: BuildUpBmds;
}
