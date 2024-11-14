import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Wallet } from './Wallet';

@Entity()
export class Chain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  symbol: string; // Símbolo de la blockchain, por ejemplo, "ETH", "BTC", etc.

  @OneToMany(() => Wallet, (wallet) => wallet.chain)
  wallets: Wallet[];
}