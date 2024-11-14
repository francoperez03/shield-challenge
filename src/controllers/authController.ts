import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { generateToken } from '../utils/jwt';

export class AuthController {
  constructor(private userService: UserService) {}

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await this.userService.findByEmail(email);
      console.log()
      if (!user)
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });

      const isMatch = await this.userService.validatePassword(password, user.password);

      if (!isMatch)
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });

      const token = generateToken(user.id);

      res.json({ token });
    } catch (error) {
      const meesage = (error as Error).message
      res.status(500).json({ message: 'Error del servidor',meesage });
    }
  }
}
