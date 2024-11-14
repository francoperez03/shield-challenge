import { AppDataSource } from '../config/data-source';
import { Chain } from '../entities/Chain';

export class ChainService {
  private chainRepository = AppDataSource.getRepository(Chain);

  async findById(chainId: string): Promise<Chain | null> {
    return this.chainRepository.findOneBy({ id: chainId });
  }

  async findByName(name: string): Promise<Chain | null> {
    return this.chainRepository.findOneBy({ name });
  }

  async getAllChains(): Promise<Chain[]> {
    return this.chainRepository.find();
  }

  async createChain(data: Partial<Chain>): Promise<Chain> {
    const chain = this.chainRepository.create(data);
    return this.chainRepository.save(chain);
  }
}
