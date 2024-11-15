// src/entities/Chain.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Wallet } from './Wallet';

@Entity()
export class Chain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  chainId: string;

  @Column()
  network: string;

  @Column()
  rpcUrl: string;

  @Column()
  explorerUrl: string;

  @OneToMany(() => Wallet, (wallet) => wallet.chain)
  wallets: Wallet[];
}
