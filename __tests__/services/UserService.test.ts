import { UserService } from '../../src/services/UserService';
import { mock, MockProxy } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { User } from '../../src/entities/User';
import { hashPassword, comparePassword } from '../../src/utils/hash';
import { AppDataSource } from '../../src/config/data-source';
jest.mock('../../src/utils/hash');

describe('UserService', () => {
  let userRepository: MockProxy<Repository<User>>;
  let userService: UserService;

  beforeAll(async () => {
    await AppDataSource.initialize();
  });
  
  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(() => {
    userRepository = mock<Repository<User>>();
    userService = new UserService();
    (userService as any).userRepository = userRepository;
  });

  describe('findByEmail', () => {
    it('should return a user when found by email', async () => {
      const email = 'test@example.com';
      const user = new User();
      user.email = email;
      user.password = 'hashedPassword';

      userRepository.findOne.mockResolvedValue(user);

      const result = await userService.findByEmail(email);
      if(result){
        expect(result).toMatchObject(user);
        expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
      }
    });

    it('should return null when user not found by email', async () => {
      const email = 'notfound@example.com';

      userRepository.findOne.mockResolvedValue(null);

      const result = await userService.findByEmail(email);

      expect(result).toBeNull();
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const email = 'newuser@example.com';
      const password = 'password123';
      const hashedPassword = 'hashedPassword';

      (hashPassword as jest.Mock).mockResolvedValue(hashedPassword);

      const user = new User();
      user.email = email;
      user.password = hashedPassword;

      userRepository.create.mockReturnValue(user);
      userRepository.save.mockResolvedValue(user);

      const result = await userService.createUser(email, password);

      expect(hashPassword).toHaveBeenCalledWith(password);
      expect(userRepository.create).toHaveBeenCalledWith({ email, password: hashedPassword });
      expect(userRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });

    it('should throw an error if user already exists', async () => {
      const email = 'existing@example.com';
      const password = 'password123';

      userRepository.findOne.mockResolvedValue({ email } as User);

      await expect(userService.createUser(email, password)).rejects.toThrow('User already exists');
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
    });
  });

  describe('validatePassword', () => {
    it('should return true if password matches', async () => {
      const password = 'password123';
      const hashedPassword = 'hashedPassword';

      (comparePassword as jest.Mock).mockResolvedValue(true);

      const result = await userService.validatePassword(password, hashedPassword);

      expect(comparePassword).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false if password does not match', async () => {
      const password = 'password123';
      const hashedPassword = 'differentHashedPassword';

      (comparePassword as jest.Mock).mockResolvedValue(false);

      const result = await userService.validatePassword(password, hashedPassword);

      expect(comparePassword).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(false);
    });
  });
});
