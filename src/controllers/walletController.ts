// src/controllers/walletController.ts
import { AuthRequest } from '../middlewares/auth';
import { WalletService } from '../services/WalletService';
import { UserService } from 'services/UserService';
import { ChainService } from 'services/ChainService';
import { CreateWalletDto } from 'dto/CreateWalletDto';
import { Request, Response } from 'express';
import { UpdateWalletDto } from 'dto/UpdateWalletDto';
import { Chain } from 'entities/Chain';

export class WalletController {
  constructor (
    private walletService: WalletService,
    private userService: UserService,
    private chainService: ChainService
  ) {}

  async getWallets(req: AuthRequest, res: Response) {
    try {
      const wallets = await this.walletService.getUserWallets(req.userId!);
      res.json(wallets);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async createWallet(req:AuthRequest<CreateWalletDto> , res: Response) {
    const { tag, chainId, address } = req.body;

    try {
      console.log(req.userId)
      const user = await this.userService.findById(req.userId!);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const chain = await this.chainService.findByChainId(chainId);
      if (!chain) {
        return res.status(404).json({ message: 'Chain not found' });
      }

      const wallet = await this.walletService.createWallet(user, chain, tag, address);
      res.status(201).json(wallet);
    } catch (error) {
      const message = (error as Error).message;
      if (message === 'Wallet already exists') {
        res.status(409).json({ message });
      } else {
        console.log(message)
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async getWalletById(req: AuthRequest, res: Response) {
    const walletId = req.params.id;

    try {
      const wallet = await this.walletService.getWalletById(walletId, req.userId!);

      if (!wallet)
        return res.status(404).json({ message: 'Wallet not found' });

      res.json(wallet);
    } catch (error) {
      const message = (error as Error).message;

      res.status(500).json({ message });
    }
  }

  async updateWallet(req: AuthRequest<UpdateWalletDto>, res: Response) {
    const walletId = req.params.id;
    const { tag, chainId, address } = req.body;

    try {
      let chain;
      if (chainId !== undefined){
        const foundChain = await this.chainService.findByChainId(chainId);
        chain = foundChain || undefined;
      }
      const wallet = await this.walletService.updateWallet(
        walletId,
        req.userId!,
        tag,
        chain,
        address
      );

      if (!wallet)
        return res.status(404).json({ message: 'Wallet not found' });

      res.json(wallet);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async deleteWallet(req: AuthRequest, res: Response) {
    const walletId = req.params.id;

    try {
      const success = await this.walletService.deleteWallet(walletId, req.userId!);

      if (!success)
        return res.status(404).json({ message: 'Wallet not found' });

      res.json({ message: 'Wallet removed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}
