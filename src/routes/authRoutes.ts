// src/routes/authRoutes.ts
import { Router } from 'express';
import { UserService } from '../services/UserService';
import { AuthController } from '../controllers/authController';

const router = Router();
const userService = new UserService();
const authController = new AuthController(userService);

router.post('/signin', authController.signIn.bind(authController));

export default router;
