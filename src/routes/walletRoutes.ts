import { Router } from 'express';
import { WalletService } from '../services/WalletService';
import { WalletController } from '../controllers/walletController';
import { authenticateToken } from '../middlewares/auth';
import { UserService } from 'services/UserService';
import { ChainService } from 'services/ChainService';

const router = Router();
const walletService = new WalletService();
const userService = new UserService();
const chainService = new ChainService();
const walletController = new WalletController(walletService, userService, chainService);

router.use(authenticateToken);

router.get('/wallets', walletController.getWallets.bind(walletController));
router.post('/wallets', walletController.createWallet.bind(walletController));
router.get('/wallets/:id', walletController.getWalletById.bind(walletController));
router.put('/wallets/:id', walletController.updateWallet.bind(walletController));
router.delete('/wallets/:id', walletController.deleteWallet.bind(walletController));

export default router;
