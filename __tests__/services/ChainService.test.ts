import { ChainService } from '../../src/services/ChainService';
import { mock, MockProxy } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Chain } from '../../src/entities/Chain';
import { AppDataSource } from '../../src/config/data-source';

describe('ChainService', () => {
  let chainRepository: MockProxy<Repository<Chain>>;
  let chainService: ChainService;

  beforeAll(async () => {
    await AppDataSource.initialize();
  });
  
  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(() => {
    chainRepository = mock<Repository<Chain>>();
    chainService = new ChainService();
    (chainService as any).chainRepository = chainRepository;
  });

  describe('findById', () => {
    it('should return a chain when found by id', async () => {
      const chainId = 'chain-id';
      const chain = new Chain();
      chain.id = chainId;

      chainRepository.findOneBy.mockResolvedValue(chain);

      const result = await chainService.findById(chainId);

      expect(chainRepository.findOneBy).toHaveBeenCalledWith({ id: chainId });
      expect(result).toEqual(chain);
    });

    it('should return null when chain not found by id', async () => {
      const chainId = 'non-existent-chain-id';

      chainRepository.findOneBy.mockResolvedValue(null);

      const result = await chainService.findById(chainId);

      expect(chainRepository.findOneBy).toHaveBeenCalledWith({ id: chainId });
      expect(result).toBeNull();
    });
  });

  describe('findByName', () => {
    it('should return a chain when found by name', async () => {
      const name = 'Ethereum';
      const chain = new Chain();
      chain.name = name;

      chainRepository.findOneBy.mockResolvedValue(chain);

      const result = await chainService.findByName(name);

      expect(chainRepository.findOneBy).toHaveBeenCalledWith({ name });
      expect(result).toEqual(chain);
    });

    it('should return null when chain not found by name', async () => {
      const name = 'UnknownChain';

      chainRepository.findOneBy.mockResolvedValue(null);

      const result = await chainService.findByName(name);

      expect(chainRepository.findOneBy).toHaveBeenCalledWith({ name });
      expect(result).toBeNull();
    });
  });

  describe('getAllChains', () => {
    it('should return a list of chains', async () => {
      const chains = [new Chain(), new Chain()];

      chainRepository.find.mockResolvedValue(chains);

      const result = await chainService.getAllChains();

      expect(chainRepository.find).toHaveBeenCalled();
      expect(result).toEqual(chains);
    });

    it('should return an empty list when no chains are found', async () => {
      chainRepository.find.mockResolvedValue([]);

      const result = await chainService.getAllChains();

      expect(chainRepository.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
