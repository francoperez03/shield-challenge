// src/services/UserService.ts
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { hashPassword, comparePassword } from '../utils/hash';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async validatePassword(
    inputPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    return comparePassword(inputPassword, storedPassword);
  }

  async createUser(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await hashPassword(password);
    const user = this.userRepository.create({ email, password: hashedPassword });
    return this.userRepository.save(user);
  }
}
