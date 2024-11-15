import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import jwt from 'jsonwebtoken';

export class AuthController {
  constructor(private userService: UserService) {}

  async signIn(req: Request, res: Response) {
    console.log(req.body)
    const { email, password } = req.body;
    try {
      const user = await this.userService.findByEmail(email);

      if (!user) {
        return res.status(400).json({ message: 'Invalid parameters' });
      }

      const isMatch = await this.userService.validatePassword(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid parameters' });
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
  }

  async refreshToken(req: Request, res: Response) {
    console.log(req.cookies)
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not supplied' });
    }
  
    try {
      const decoded: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
  
      const newAccessToken = generateAccessToken(decoded.userId);
  
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(403).json({ message: 'Invalid refresh token or expired' });
    }
  }
  
  async signOut(req: Request, res: Response) {
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Session closed successfully' });
  }

}
