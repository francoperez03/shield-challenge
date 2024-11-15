import { WalletService } from '../../src/services/WalletService';
import { mock, MockProxy } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Wallet } from '../../src/entities/Wallet';
import { User } from '../../src/entities/User';
import { Chain } from '../../src/entities/Chain';
import { AppDataSource } from '../../src/config/data-source';

describe('WalletService', () => {
  let walletRepository: MockProxy<Repository<Wallet>>;
  let walletService: WalletService;

  beforeAll(async () => {
    await AppDataSource.initialize();
  });
  
  afterAll(async () => {
    await AppDataSource.destroy();
  });


  beforeEach(() => {
    walletRepository = mock<Repository<Wallet>>();
    walletService = new WalletService();
    (walletService as any).walletRepository = walletRepository;
  });

  describe('createWallet', () => {
    it('should create and return a new wallet', async () => {
      const user = new User();
      user.id = 'user-id';

      const chain = new Chain();
      chain.id = 'chain-id';

      const tag = 'Main Wallet';
      const address = '0x1234...abcd';

      const wallet = new Wallet();
      wallet.tag = tag;
      wallet.address = address;
      wallet.user = user;
      wallet.chain = chain;

      walletRepository.create.mockReturnValue(wallet);
      walletRepository.save.mockResolvedValue(wallet);

      const result = await walletService.createWallet(user, chain, tag, address);

      expect(walletRepository.create).toHaveBeenCalledWith({
        tag,
        address,
        user,
        chain,
      });
      expect(walletRepository.save).toHaveBeenCalledWith(wallet);
      expect(result).toMatchObject(wallet);
    });

    it('should throw an error if wallet address and chainId already exists', async () => {
      const user = new User();
      const chain = new Chain();
      chain.chainId = '1'
      const tag = 'Main Wallet';
      const address = '0x1234...abcd';

      walletRepository.findOne.mockResolvedValue({ address, chain } as Wallet);

      await expect(walletService.createWallet(user, chain, tag, address)).rejects.toThrow(
        'Wallet already exists',
      );
      expect(walletRepository.findOne).toHaveBeenCalledWith({ where: { address, chain: { chainId: chain.chainId } } });
    });
  });

  describe('getUserWallets', () => {
    it('should return a list of wallets for a user', async () => {
      const userId = 'user-id';
      const wallets = [new Wallet(), new Wallet()];

      walletRepository.find.mockResolvedValue(wallets);

      const result = await walletService.getUserWallets(userId);

      expect(walletRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ['chain'],
      });
      expect(result).toEqual(wallets);
    });

    it('should return an empty list if user has no wallets', async () => {
      const userId = 'user-id';

      walletRepository.find.mockResolvedValue([]);

      const result = await walletService.getUserWallets(userId);

      expect(walletRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ['chain'],
      });
      expect(result).toEqual([]);
    });
  });

  describe('getWalletById', () => {
    it('should return a wallet when found', async () => {
      const walletId = 'wallet-id';
      const userId = 'user-id';
      const wallet = new Wallet();

      walletRepository.findOne.mockResolvedValue(wallet);

      const result = await walletService.getWalletById(walletId, userId);

      expect(walletRepository.findOne).toHaveBeenCalledWith({
        where: { id: walletId, user: { id: userId } },
        relations: ['chain'],
      });
      expect(result).toEqual(wallet);
    });

    it('should return null if wallet not found', async () => {
      const walletId = 'wallet-id';
      const userId = 'user-id';

      walletRepository.findOne.mockResolvedValue(null);

      const result = await walletService.getWalletById(walletId, userId);

      expect(walletRepository.findOne).toHaveBeenCalledWith({
        where: { id: walletId, user: { id: userId } },
        relations: ['chain'],
      });
      expect(result).toBeNull();
    });
  });

  describe('updateWallet', () => {
    it('should update and return the wallet if user is authorized', async () => {
      const walletId = 'wallet-id';
      const userId = 'user-id';
      const tag = 'Updated Wallet';
      const chain = new Chain();
      chain.id = 'new-chain-id';
      const address = '0xabcd...1234';

      const existingWallet = new Wallet();
      existingWallet.user = new User();
      existingWallet.user.id = userId;

      walletRepository.findOne.mockResolvedValue(existingWallet);
      walletRepository.save.mockResolvedValue(existingWallet);

      const result = await walletService.updateWallet(
        walletId,
        userId,
        tag,
        chain,
        address,
      );

      expect(walletRepository.save).toHaveBeenCalledWith(existingWallet);
      expect(result).toEqual(existingWallet);
    });

    it('should return null if wallet not found or user not authorized', async () => {
      const walletId = 'wallet-id';
      const userId = 'user-id';
      const tag = 'Updated Wallet';
      const chain = new Chain();
      const address = '0xabcd...1234';

      walletRepository.findOne.mockResolvedValue(null);

      const result = await walletService.updateWallet(
        walletId,
        userId,
        tag,
        chain,
        address,
      );

      expect(result).toBeUndefined();
    });
  });

  describe('deleteWallet', () => {
    it('should delete the wallet if user is authorized', async () => {
      const walletId = 'wallet-id';
      const userId = 'user-id';
    
      const existingWallet = new Wallet();
      existingWallet.user = new User();
      existingWallet.user.id = userId;
    
      jest.spyOn(walletService, 'getWalletById').mockResolvedValue(existingWallet);
    
      walletRepository.remove.mockResolvedValue(existingWallet);
    
      const result = await walletService.deleteWallet(walletId, userId);
    
      expect(result).toBe(true);
      expect(walletRepository.remove).toHaveBeenCalledWith(existingWallet);
    });

    it('should return false if wallet not found or user not authorized', async () => {
      const walletId = 'wallet-id';
      const userId = 'user-id';

      walletRepository.findOne.mockResolvedValue(null);

      const result = await walletService.deleteWallet(walletId, userId);
      expect(result).toBe(false);
    });
  });
});
