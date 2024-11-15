// src/services/WalletService.ts
import { AppDataSource } from '../config/data-source';
import { Wallet } from '../entities/Wallet';
import { User } from '../entities/User';
import { Chain } from 'entities/Chain';

export class WalletService {
  private walletRepository = AppDataSource.getRepository(Wallet);
  private userRepository = AppDataSource.getRepository(User);

  async getUserWallets(userId: string): Promise<Wallet[]> {
    return this.walletRepository.find({ where: { user: { id: userId } }, relations: ['chain'] });
  }

  async getWalletById(walletId: string, userId: string): Promise<Wallet | null> {
    return this.walletRepository.findOne({
      where: { id: walletId, user: { id: userId } },
      relations: ['chain'],
    });
  }

    async createWallet(
      user: User,
      chain: Chain,
      tag: string | undefined,
      address: string
    ): Promise<Wallet> {
      const existingWallet = await this.walletRepository.findOne({ where: { address, chain } });
      if (existingWallet) {
        throw new Error('Wallet already exists');
      }
      const wallet = this.walletRepository.create({
        tag,
        address,
        user,
        chain,
      });

      return this.walletRepository.save(wallet);
    }

  async updateWallet(
    walletId: string,
    userId: string,
    tag?: string,
    chain?: Chain,
    address?: string
  ): Promise<Wallet | undefined> {
    const wallet = await this.getWalletById(walletId, userId);
    if (!wallet) return undefined;

    if (tag !== undefined) wallet.tag = tag;
    if (chain !== undefined) wallet.chain = chain;
    if (address !== undefined) wallet.address = address;

    return this.walletRepository.save(wallet);
  }

  async deleteWallet(walletId: string, userId: string): Promise<boolean> {
    const wallet = await this.getWalletById(walletId, userId);
    if (!wallet) return false;

    await this.walletRepository.remove(wallet);
    return true;
  }
}
