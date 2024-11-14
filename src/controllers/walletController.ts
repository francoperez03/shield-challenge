// src/controllers/walletController.ts
import { AuthRequest } from '../middlewares/auth';
import { WalletService } from '../services/WalletService';
import { UserService } from 'services/UserService';
import { ChainService } from 'services/ChainService';
import { CreateWalletDto } from 'dto/CreateWalletDto';
import { Request, Response } from 'express';

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
      res.status(500).json({ message: 'Error del servidor' });
    }
  }

  async createWallet(req: Request<unknown, unknown, CreateWalletDto>, res: Response) {
    const { userId, tag, chainId, address } = req.body;

    try {
      // Buscar el usuario usando `UserService`
      const user = await this.userService.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const chain = await this.chainService.findById(chainId);
      if (!chain) {
        return res.status(404).json({ message: 'Cadena no encontrada' });
      }

      const wallet = await this.walletService.createWallet(user, chain, tag, address);
      res.status(201).json(wallet);
    } catch (error) {
      const message = (error as Error).message;
      res.status(500).json({ message: 'Error al crear la wallet', error: message });
    }
  }

  async getWalletById(req: AuthRequest, res: Response) {
    const walletId = req.params.id;

    try {
      const wallet = await this.walletService.getWalletById(walletId, req.userId!);

      if (!wallet)
        return res.status(404).json({ message: 'Wallet no encontrada' });

      res.json(wallet);
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor' });
    }
  }

  async updateWallet(req: AuthRequest, res: Response) {
    const walletId = req.params.id;
    const { tag, chain, address } = req.body;

    try {
      const wallet = await this.walletService.updateWallet(
        walletId,
        req.userId!,
        tag,
        chain,
        address
      );

      if (!wallet)
        return res.status(404).json({ message: 'Wallet no encontrada o no autorizada' });

      res.json(wallet);
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor' });
    }
  }

  async deleteWallet(req: AuthRequest, res: Response) {
    const walletId = req.params.id;

    try {
      const success = await this.walletService.deleteWallet(walletId, req.userId!);

      if (!success)
        return res.status(404).json({ message: 'Wallet no encontrada o no autorizada' });

      res.json({ message: 'Wallet eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor' });
    }
  }
}
