// src/routes/authRoutes.ts
import { Router } from 'express';
import { UserService } from '../services/UserService';
import { AuthController } from '../controllers/authController';
import { validateDto } from '../middlewares/validateDto';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthSignInDto } from '../dto/AuthSignInDto';

const router = Router();
const userService = new UserService();
const authController = new AuthController(userService);

router.post(
  '/signin',
  validateDto(AuthSignInDto),
  asyncHandler(authController.signIn.bind(authController))
);

export default router;
