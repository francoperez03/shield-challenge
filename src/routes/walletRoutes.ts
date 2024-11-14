import { Router } from 'express';
import { WalletService } from '../services/WalletService';
import { WalletController } from '../controllers/walletController';
import { authenticateToken } from '../middlewares/auth';
import { UserService } from '../services/UserService';
import { ChainService } from '../services/ChainService';
import { UpdateWalletDto } from '../dto/UpdateWalletDto';
import { CreateWalletDto } from '../dto/CreateWalletDto';
import { validateDto } from '../middlewares/validateDto';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const walletService = new WalletService();
const userService = new UserService();
const chainService = new ChainService();
const walletController = new WalletController(walletService, userService, chainService);

router.use(authenticateToken);

// Aplicar asyncHandler a cada ruta del controlador
router.get('/wallets', asyncHandler(walletController.getWallets.bind(walletController)));
router.post('/wallets', validateDto(CreateWalletDto), asyncHandler(walletController.createWallet.bind(walletController)));
router.get('/wallets/:id', asyncHandler(walletController.getWalletById.bind(walletController)));
router.put('/wallets/:id', validateDto(UpdateWalletDto), asyncHandler(walletController.updateWallet.bind(walletController)));
router.delete('/wallets/:id', asyncHandler(walletController.deleteWallet.bind(walletController)));

export default router;
