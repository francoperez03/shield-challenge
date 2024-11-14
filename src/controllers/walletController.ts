// src/controllers/walletController.ts
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { WalletService } from '../services/WalletService';

export class WalletController {
  constructor(private walletService: WalletService) {}

  async getWallets(req: AuthRequest, res: Response) {
    try {
      const wallets = await this.walletService.getUserWallets(req.userId!);
      res.json(wallets);
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor' });
    }
  }

  async createWallet(req: AuthRequest, res: Response) {
    const { tag, chain, address } = req.body;

    if (!chain || !address)
      return res.status(400).json({ message: 'Chain y address son requeridos' });

    try {
      const wallet = await this.walletService.createWallet(
        req.userId!,
        tag,
        chain,
        address
      );
      res.status(201).json(wallet);
    } catch (error) {
      const message = (error as Error).message
      res.status(500).json({ message });
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
