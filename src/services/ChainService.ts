import { AppDataSource } from '../config/data-source';
import { Chain } from '../entities/Chain';

export class ChainService {
  private chainRepository = AppDataSource.getRepository(Chain);

  async findByChainId(chainId: string): Promise<Chain | null> {
    return this.chainRepository.findOne({ where: { chainId }});
  }

  async findByName(name: string): Promise<Chain | null> {
    return this.chainRepository.findOne({ where: { name }});
  }

  async getAllChains(): Promise<Chain[]> {
    return this.chainRepository.find();
  }

  async createChain(data: Partial<Chain>): Promise<Chain> {
    const chain = this.chainRepository.create(data);
    return this.chainRepository.save(chain);
  }
}
