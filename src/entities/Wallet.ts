import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Chain } from './Chain';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  tag: string;

  @Column()
  address: string;

  @ManyToOne(() => User, (user) => user.wallets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Chain, (chain) => chain.wallets)
  @JoinColumn({ name: 'chain_id' })
  chain: Chain;
}
