// src/routes/authRoutes.ts
import { Router } from "express";
import { UserService } from "../services/UserService";
import { AuthController } from "../controllers/authController";
import { validateDto } from "../middlewares/validateDto";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthSignInDto } from "../dto/AuthSignInDto";
import { authenticateToken } from "middlewares/auth";

const router = Router();
const userService = new UserService();
const authController = new AuthController(userService);

router.post(
  "/signin",
  validateDto(AuthSignInDto),
  asyncHandler(authController.signIn.bind(authController))
);
router.post(
  "/refresh",
  asyncHandler(authController.refreshToken.bind(authController))
);
router.post(
  "/signout",
  asyncHandler(authController.signOut.bind(authController))
);


export default router;
