// src/services/WalletService.ts
import { AppDataSource } from '../config/data-source';
import { Wallet } from '../entities/Wallet';
import { User } from '../entities/User';

export class WalletService {
  private walletRepository = AppDataSource.getRepository(Wallet);
  private userRepository = AppDataSource.getRepository(User);

  async getUserWallets(userId: string): Promise<Wallet[]> {
    return this.walletRepository.find({ where: { user: { id: userId } } });
  }

  async getWalletById(walletId: string, userId: string): Promise<Wallet | null> {
    return this.walletRepository.findOne({
      where: { id: walletId, user: { id: userId } },
    });
  }

  async createWallet(
    userId: string,
    tag: string | undefined,
    chain: string,
    address: string
  ): Promise<Wallet> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('Usuario no encontrado');

    const wallet = this.walletRepository.create({
      tag,
      chain,
      address,
      user,
    });

    return this.walletRepository.save(wallet);
  }

  async updateWallet(
    walletId: string,
    userId: string,
    tag?: string,
    chain?: string,
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
